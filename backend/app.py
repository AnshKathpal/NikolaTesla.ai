import os
import sys
from flask import Flask, request, jsonify
from dotenv import load_dotenv, find_dotenv
import openai
from langchain.document_loaders import PyPDFLoader
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
import subprocess

# Load environment variables from .env file
_ = load_dotenv(find_dotenv())

# Initialize OpenAI API with your API key
openai.api_key = os.environ["OPENAI_API_KEY"]

app = Flask(__name__)

subprocess.run(["rm", "-rf", "./docs/chroma"])

# Load PDF document
loader = PyPDFLoader("./docs/tesla.pdf")
pages = loader.load()

# Initialize text splitter
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)
splits = text_splitter.split_documents(pages)

# Initialize OpenAI embeddings
embedding = OpenAIEmbeddings()
persist_directory = "docs/chroma/"

# Create the vector store
vectordb = Chroma.from_documents(
    documents=splits,
    embedding=embedding,
    persist_directory=persist_directory
)

# Initialize ChatOpenAI
llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=1)

# Create QA chain
qa_chain = RetrievalQA.from_chain_type(
    llm,
    retriever=vectordb.as_retriever()
)

# Initialize conversation memory
memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True
)

# Create ConversationalRetrievalChain
retriever = vectordb.as_retriever()

qa = ConversationalRetrievalChain.from_llm(
    llm,
    retriever=retriever,
    memory=memory
)

@app.route("/chat", methods=["POST"])
def chat():
    try:
        # Parse incoming JSON data
        data = request.json
        question = data.get("question")

        # Perform the question-answering process
        result = qa({"question": question})
        answer_from_chat = result["answer"]

        # Perform similarity search
        docs = vectordb.similarity_search(question, k=3)

        # Extract page content from the top 3 results
        page_contents = [doc.page_content for doc in docs]

        # Combine the responses
        response_data = {
            "answer_from_chat": answer_from_chat,
            "top_3_similarity_results": page_contents
        }
        return jsonify(response_data)

    except Exception as e:
        # Handle exceptions
        error_message = str(e)
        return jsonify({"error": error_message}), 500

if __name__ == "__main__":
    app.run(debug=True)

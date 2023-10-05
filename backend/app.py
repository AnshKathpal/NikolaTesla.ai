from dotenv import load_dotenv, find_dotenv
from langchain.chains import RetrievalQA, ConversationalRetrievalChain
from langchain.chat_models import ChatOpenAI
from langchain.vectorstores import Chroma
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.memory import ConversationBufferMemory
from langchain.document_loaders import PyPDFLoader
import os
import openai
import sys
# from PyPDF2 import PdfReader
from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid


sys.path.append("../..")


_ = load_dotenv(find_dotenv())

openai.api_key = os.environ["OPENAI_API_KEY"]

app = Flask(__name__)
CORS(app)

loader = PyPDFLoader("./docs/story.pdf")
pages = loader.load()
countPage = len(pages)
print("pageCount", countPage)


text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)

splits = text_splitter.split_documents(pages)
countSplitted = len(splits)
print("splitCount", countSplitted)


embedding = OpenAIEmbeddings()

persist_directory = "docs/chroma/"

vectordb = Chroma.from_documents(
    documents=splits,
    embedding=embedding,
    persist_directory=persist_directory
)

print("collection", vectordb._collection.count())

question = "What is this pdf about?"
docs = vectordb.similarity_search(question, k=3)
docsCount = len(docs)
print("docsCount", docsCount)

print("1")
print(docs[0].page_content)
print("2")
print(docs[1].page_content)
print("3")
print(docs[2].page_content)


llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0)
qa_chain = RetrievalQA.from_chain_type(
    llm,
    retriever=vectordb.as_retriever()
)
question = "What is it all about?"
result = qa_chain({"query": question})
print("result")
print(result["result"])

if __name__ == '__main__':
    app.run(debug=True)

# NikolaTesla.ai Chatbot Readme

## Description
NikolaTesla.ai is an advanced chatbot application that provides in-depth knowledge and information about the life and work of Nikola Tesla. Users can engage in a chat conversation with the chatbot and ask any questions about Nikola Tesla, receiving informative and well-structured responses. This readme provides an overview of the NikolaTesla.ai Chatbot, its features, and the technology stack used.

## Features
- **AI Chatbot**: Engage in a chat conversation with the AI chatbot to ask questions and seek information about Nikola Tesla's life and work.

- **Document Analysis**: The chatbot creates chunks, embeddings, and conducts similarity searches to provide detailed and accurate responses.

- **Similarity Search**: Utilizes Langchain for similarity searches to find related content about Nikola Tesla.

- **ChromaDB Integration**: Store vector searches in ChromaDB for efficient retrieval of relevant information.

## Tech Stack
### Frontend
- **React**: The user interface of NikolaTesla.ai is built using React, providing a modern and responsive design.

- **Tailwind CSS**: Tailwind CSS is used for styling and creating a visually appealing user interface.

### Backend
- **Python Flask**: The server-side logic of the chatbot is implemented using Flask, a micro web framework for Python.

### Packages and Technologies
- **Langchain**: Langchain is used for creating embeddings and conducting similarity searches for content about Nikola Tesla.

- **OpenAI**: OpenAI's ChatGPT model 3.5 powers the chatbot, offering natural language understanding and generation capabilities.

- **Embeddings**: Embeddings are generated for document analysis and content representation.

- **Tiktoken**: Tiktoken is used for tokenization and word counting in the text.

- **PyPDF**: PyPDF is used for parsing and extracting text from documents.

### Database
- **ChromaDB**: ChromaDB is integrated to store vector searches for efficient retrieval of related content.

## Installation and Setup
1. Clone the repository from GitHub.

2. Navigate to the project directory and install the required dependencies for both the frontend and backend using `npm install` for React and `pip install -r requirements.txt` for Python.

3. Set up a database connection to ChromaDB and configure the database settings in the backend.

4. Create environment variables for sensitive information, such as API keys and database connections.

5. Start the frontend and backend servers using `npm start` for React and `python app.py` for Python Flask.

6. Access NikolaTesla.ai via a web browser by navigating to the specified URL (usually `http://localhost:3000`).

## Usage
1. Open NikolaTesla.ai in your web browser.

2. Engage in a chat conversation with the AI chatbot to ask any questions and seek information about Nikola Tesla.

3. The chatbot will provide detailed and informative responses, utilizing document analysis, embeddings, and similarity searches.

4. Store vector searches in ChromaDB for efficient retrieval of related content about Nikola Tesla in the future.

5. Use NikolaTesla.ai to gain insights and knowledge about the life and work of Nikola Tesla.

## Contributing
Contributions to the NikolaTesla.ai Chatbot are welcome. Please follow the guidelines outlined in the CONTRIBUTING.md file.

## License
This project is open-source and available under the [MIT License](LICENSE).

## Author
- Ansh Kathpal

## Acknowledgments
Special thanks to the React, Flask, and OpenAI communities for providing resources and libraries that made this advanced chatbot application possible.

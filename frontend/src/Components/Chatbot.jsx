import React from "react";
import { useState } from "react";
import axios from "axios";
import gif from "../images/200w.gif";
import { Link } from "react-router-dom";
import imgTesla from "../images/teslaVector.png";
import loadingGif from "../images/loading.gif";
import logo from "../images/tesla-img.webp";
import pdfFile from "../images/tesla.pdf";

export const Chatbot = () => {
  const [userMessage, setUserMessage] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfVisible, setPdfVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setData([]);
    try {
      let res = await axios.post("http://127.0.0.1:5000/chat", {
        question: userMessage,
      });
      console.log("response", res);
      const chatReply = await res.data;
      setUserMessage("");
      setData(chatReply);
      console.log(chatReply);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const togglePdfViewer = () => {
    setPdfVisible(!pdfVisible);
  };

  console.log("setData", data);

  return (
    <div>
      <div
        style={{
          fontFamily: "'Racing Sans One', cursive",
          height: "7vh",
          padding: "5px",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
        className=" w-full flex justify-between align-middle "
      >
        <div className="flex justify-evenly align-middle">
          <div style={{ width: "70px" }}>
            <img
              style={{ height: "100%", marginLeft: "30px" }}
              src={logo}
              alt=""
            />
          </div>
          <p className="text-6xl ml-2">NikolaTesla.ai</p>
        </div>
        <div
          className="flex w-60"
          style={{ justifyContent: "space-evenly", alignItems: "center" }}
        >
          <Link to="/">
            <p>Search</p>
          </Link>
          <p>About</p>
        </div>
      </div>

      <div style={{ height: "93vh" }} className=" flex">
        <div
          style={{ width: "30%", height: "93vh" }}
          className="flex justify-center align-middle"
        >
          <img className="object-contain pl-5" src={imgTesla} alt="" />
        </div>

        <div
          style={{ width: "70%", height: "93vh", overflowY: "auto" }}
          className="pb-10 relative"
        >
          {pdfVisible && (
            <div
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
                backgroundColor: "white",
                width: "90%",
                height: "90vh",
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Racing Sans One', cursive",
                    marginLeft: "30px",
                  }}
                >
                  Tesla Story
                </p>
                <button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    width: "30px",
                  }}
                  onClick={togglePdfViewer}
                >
                  x
                </button>
              </div>

              <iframe
                src={pdfFile} // Specify the PDF file URL here
                style={{
                  width: "100%",
                  height: "97%",
                  border: "none",
                  padding: "10px",
                }}
                title="PDF Viewer"
              ></iframe>
            </div>
          )}

          <form className=" pt-10 " action="" onSubmit={handleSubmit}>
            <input
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              style={{ width: "70%", fontSize: "18px" }}
              className="border border-1 border-black p-5 rounded-2xl "
              type="text"
              name=""
              id=""
              placeholder="Ask any question about Sir Nikola Tesla here..."
            />
            <br />
            <button
              className="mt-5 p-1 text-white border border-1 border-black font-bold text-xl  w-60 rounded-md "
              style={{ backgroundColor: "rgb(130,149,196)" }}
              type="submit"
            >
              Electrify your Search
            </button>
          </form>

          <div>
            {isLoading && (
              <div>
                <img
                  style={{
                    width: "10%",
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                  src={loadingGif}
                  alt=""
                />
              </div>
            )}
          </div>

          {data.answer_from_chat ? (
            <div
              style={{
                width: "90%",
                boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
              }}
              className=" m-auto mt-7 p-4 text-lg text-justify rounded-xl"
            >
              <p className=" text-xl font-bold pb-2">Answer</p>
              {data.answer_from_chat}
            </div>
          ) : null}

          <div>
            {data.top_3_similarity_results ? (
              <div
                style={{
                  width: "90%",
                  boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
                }}
                className=" m-auto mt-7 p-4 text-lg text-justify rounded-xl"
              >
                <div className="flex justify-between align-middle">
                  <p className="text-xl font-bold pb-2">Passage 1</p>

                  <div className="flex gap-10 ">
                    <p className="font-bold">
                      Page No.: {data.meta_data[0].page}
                    </p>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={togglePdfViewer}
                      className="font-bold"
                    >
                      Source: tesla.pdf
                    </p>
                  </div>
                </div>
                {data &&
                data.top_3_similarity_results &&
                data.top_3_similarity_results.length > 0
                  ? data.top_3_similarity_results[0]
                  : null}
              </div>
            ) : null}

            {data.top_3_similarity_results ? (
              <div
                style={{
                  width: "90%",
                  boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
                }}
                className=" m-auto mt-7 p-4 text-lg text-justify rounded-xl"
              >
                <div className="flex justify-between align-middle">
                  <p className="text-xl font-bold pb-2">Passage 2</p>

                  <div className="flex gap-10 ">
                    <p className="font-bold">
                      Page No.: {data.meta_data[1].page}
                    </p>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={togglePdfViewer}
                      className="font-bold"
                    >
                      Source: tesla.pdf
                    </p>
                  </div>
                </div>
                {data &&
                data.top_3_similarity_results &&
                data.top_3_similarity_results.length > 0
                  ? data.top_3_similarity_results[1]
                  : null}
              </div>
            ) : null}
            {data.top_3_similarity_results ? (
              <div
                style={{
                  width: "90%",
                  boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
                }}
                className=" m-auto mt-7 p-4 text-lg text-justify rounded-xl"
              >
                <div className="flex justify-between align-middle">
                  <p className="text-xl font-bold pb-2">Passage 3</p>
                  <div className="flex gap-10 ">
                    <p className="font-bold">
                      Page No.: {data.meta_data[2].page}
                    </p>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={togglePdfViewer}
                      className="font-bold"
                    >
                      Source: tesla.pdf
                    </p>
                  </div>
                </div>
                {data &&
                data.top_3_similarity_results &&
                data.top_3_similarity_results.length > 0
                  ? data.top_3_similarity_results[2]
                  : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

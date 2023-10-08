import React from "react";
import { useState } from "react";
import axios from "axios";
import gif from "../images/200w.gif";
import { Link } from "react-router-dom";
import imgTesla from "../images/teslaVector.png";

export const Chatbot = () => {
  const [userMessage, setUserMessage] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let res = await axios.post("http://127.0.0.1:5000/chat", {
        question: userMessage,
      });
      console.log("response", res);
      const chatReply = await res.data;
      setData(chatReply);
      console.log(chatReply);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log("setData", data);

  return (
    <div>
      <div
        style={{ height: "7vh" }}
        className="border border-solid border-black w-full flex justify-between align-middle "
      >
        <p className="border border-solid  border-red-600 h-min ">
          NikolaTesla.ai
        </p>
        <div className="flex h-min border border-solid border-red-400">
          <Link to="/">
            <p>Search</p>
          </Link>
          <p>About</p>
        </div>
      </div>

      <div
        style={{ height: "93vh" }}
        className=" flex border border-3 border-red-700"
      >
        <div
          style={{ width: "30%", height: "93vh" }}
          className="flex justify-center align-middle"
        >
          <img className="object-contain pl-5" src={imgTesla} alt="" />
        </div>

        <div
          style={{ width: "70%", height : "93vh", overflowY : "auto" }}
          className="pb-10 "
        >
          <form className=" pt-10 " action="" onSubmit={handleSubmit}>
            <input
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              style={{ width: "70%" }}
              className="border border-1 border-black p-5 rounded-2xl "
              type="text"
              name=""
              id=""
              placeholder="Ask any question about Sir Nikola Tesla here..."
            />
            <br />
            <button
              className="mt-5 border border-1 border-black font-semibold text-xl w-36 rounded-md "
              type="submit"
            >
              Submit
            </button>
          </form>

          <div>{isLoading && <div>Loading...</div>}</div>

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
          ):null}

          <div >
           {data.top_3_similarity_results ? (<div
              style={{
                width: "90%",
                boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
              }}
              className=" m-auto mt-7 p-4 text-lg text-justify rounded-xl"
            >
              <div className="flex justify-between align-middle" >
              <p className="text-xl font-bold pb-2">Passage 1</p>

              <p className="font-bold" >Page No. {data.meta_data[0].page}</p>
              </div>
              {data &&
              data.top_3_similarity_results &&
              data.top_3_similarity_results.length > 0
                ? data.top_3_similarity_results[0]
                : null}
            </div>) : null}
            
            {data.top_3_similarity_results ? (<div
              style={{
                width: "90%",
                boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
              }}
              className=" m-auto mt-7 p-4 text-lg text-justify rounded-xl"
            >
              <div className="flex justify-between align-middle" >
              <p className="text-xl font-bold pb-2">Passage 2</p>

              <p className="font-bold" >Page No. {data.meta_data[1].page}</p>
              </div>
              {data &&
              data.top_3_similarity_results &&
              data.top_3_similarity_results.length > 0
                ? data.top_3_similarity_results[1]
                : null}
            </div>) : null}
            {data.top_3_similarity_results ? (<div
              style={{
                width: "90%",
                boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
              }}
              className=" m-auto mt-7 p-4 text-lg text-justify rounded-xl"
            >
              <div className="flex justify-between align-middle" >
              <p className="text-xl font-bold pb-2">Passage 3</p>

              <p className="font-bold" >Page No. {data.meta_data[2].page}</p>
              </div>
              {data &&
              data.top_3_similarity_results &&
              data.top_3_similarity_results.length > 0
                ? data.top_3_similarity_results[2]
                : null}
            </div>) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { useState } from "react";
import axios from "axios";
import gif from "../images/200w.gif";
import { Link } from "react-router-dom";

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
    <div  >
      <div className="border border-solid border-black w-full h-20 flex justify-between align-middle ">
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

      <form action="" onSubmit={handleSubmit}>
        <input
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          className="border border-1 border-black"
          type="text"
          name=""
          id=""
        />
        <button type="submit">Submit</button>
      </form>

      <div>{isLoading && <div>Loading...</div>}</div>

      <div>{data.answer_from_chat}</div>
    </div>
  );
};

import axios from "../../axiosConfig.js";
import React, { useState } from "react";

const Question = () => {
  const token = localStorage.getItem("token");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");

  const onSubmitHndler = async (e) => {
    e.preventDefault();
    setError(null);
    setSucess(null);

    try {
      const response = await axios.post(
        "/api/question",
        {
          title,
          description,
          tag,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTitle("");
      setDescription("");
      setTag("");
      setSucess(response?.data?.msg || response?.data?.message);
    } catch (err) {
      console.log("error while creating the question", err);
      const serverMessage =
        err.response?.data?.msg || err.response?.data?.message;
      if (serverMessage) {
        setError(serverMessage);
      } else {
        setError("Unexpected error occurred");
      }
    }
  };

  return (
    <div className="container w-[90%] md:max-w-[800px]  mx-auto p-5">
      <div className="mb-7.5 flex flex-col items-center">
        <h2 className="text-xl mb-2.5 ">Steps to write a good question</h2>
        <ul className="list-disc text-left px-5">
          <li className="mb-[5px]">
            Summarize your problem in a one-line title.
          </li>
          <li className="mb-[5px]">Describe your problem in more detail.</li>
          <li className="mb-[5px]">
            Describe what you tried and what you expected to happen.
          </li>
          <li className="mb-[5px]">
            Review your question and post it to the site.
          </li>
        </ul>
      </div>

      <div className="text-center p-5 rounded-lg shadow-2xl">
        <h3 className="mb-1.5">Ask Public Question</h3>
        <form onSubmit={onSubmitHndler}>
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2.5 mb-4 border border-[#ccc] rounded-sm text-sm md:text-[16px] bg-gray-200/80 placeholder:text-gray-500 placeholder:font-normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Question Description ..."
            className="w-full p-2.5 mb-4 border border-[#ccc] rounded-sm text-sm md:text-[16px] bg-gray-200/80 placeholder:text-gray-500 placeholder:font-normal h-25"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <input
            type="text"
            className="w-full p-2.5 mb-4 border border-[#ccc] rounded-sm text-sm md:text-[16px] bg-gray-200/80 placeholder:text-gray-500 placeholder:font-normal"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Tags (comma-separated)"
          />
          <div className="flex justify-start">
            <button
              type="submit"
              className="cursor-pointer py-2.5 px-4 bg-[#516cf0] hover:bg-orange-500 border-none text-white hover:text-gray-400 text-sm font-bold rounded-sm transiton duration-300 "
            >
              Post Question
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {sucess && <p className="text-green-500">{sucess}</p>}
        </form>
      </div>
    </div>
  );
};

export default Question;

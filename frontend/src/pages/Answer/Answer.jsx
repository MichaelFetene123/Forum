import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { MdArrowCircleRight } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
import axios from "../../axiosConfig.js";
const Answer = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const { title, askedby, qdesc } = location?.state || {};
  const { questionid } = useParams();
  const [answerText, setAnswerText] = useState("");
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submithandler = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `/api/answer`,
        {
          answer: answerText,
          questionid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        setSuccess(response?.data?.msg || response?.data?.message);
        setAnswerText("");
      }
    } catch (err) {
      console.error("Error while submitting answer:", err);
      const serverMessage =
        err.response?.data?.msg || err.response?.data?.message;
      if (serverMessage) {
        setError(serverMessage);
      } else {
        setError("Unexpected error occurred while submitting the answer.");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/answer/${questionid}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const response = data.answers;
        const sortedAnswers = response.sort(
          (a, b) => b.answer_id - a.answer_id
        );
        // console.log("Sorted Answers:", sortedAnswers);
        setAnswers(sortedAnswers);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className="max-w-[65%] mx-auto my-10"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      {/* question section */}
      <div>
        <h1 className="text-sm font-bold mb-5">Question</h1>
        <div className="flex space-x-1">
          <MdArrowCircleRight size={30} />
          <h2 className=" text-start font-bold text-lg mb-3">{title}</h2>
        </div>
        <p className="font-light pl-10">{qdesc}</p>
      </div>

      <hr />
      {/* answer section */}
      <div className="p-4">
        {answers.length > 0 ? (
          <h3 className="text-lg font-bold pb-3">Answer From The Community </h3>
        ) : (
          <div className="w-[80%] p-2.5 mb-4 rounded-sm md:text-2xl bg-gray-200/80 h-25 flex items-center justify-center mx-auto text-gray-800/80 italic">
            No answer found yet.
          </div>
        )}
        {answers.length > 0 ? <hr /> : <></>}

        {answers &&
          answers.map((answer) => (
            <div>
              <div className="flex items-center mt-2.5 gap-2.5">
                <div className="flex flex-col">
                  <IoPersonCircleOutline size={70} />
                  <p className="text-center text-sm text-[#0ec182]">
                    {answer?.user_name}
                  </p>
                </div>
                <div className="text-[#333]">
                  <p>{answer?.content}</p>
                </div>
              </div>
              <hr />
            </div>
          ))}

        {/* Answer Input Section */}
        <div className="text-center p-5 rounded-lg shadow-lg shadow-black/10">
          <h3 className="mb-3">Your the Top Question</h3>
          <Link
            to={`/ask_question`}
            className="text-[14px] cursor-pointer mb-5 no-underline text-black opacity-50 hover:underline"
          >
            Go to Question page
          </Link>
          <form onSubmit={submithandler}>
            <textarea
              placeholder="Your answer ..."
              className="w-full p-2.5 mb-4 border border-[#ccc] rounded-sm text-sm md:text-[16px] bg-gray-200/80 placeholder:text-gray-500 placeholder:font-normal h-25"
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              required
            ></textarea>
            <div className="flex justify-start">
              <button
                type="submit"
                className="cursor-pointer py-2.5 px-4 bg-[#516cf0] hover:bg-orange-500 border-none text-white hover:text-gray-400 text-sm font-bold rounded-sm transiton duration-300 "
              >
                Submit your Answer
              </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Answer;

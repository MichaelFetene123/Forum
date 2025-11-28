import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { MdArrowCircleRight } from "react-icons/md";
import axios from "../../axiosConfig.js";
const Answer = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const { title, askedby, qdesc } = location?.state || {};
  const { questionid } = useParams();
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submithandler = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `/api/answer${questionid}`,
        {
          answer,
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
        setAnswer("");
      }
    } catch (err) {
      const serverMessage =
        err.response?.data?.msg || err.response?.data?.message;
      if (serverMessage) {
        setError(serverMessage);
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
       const response = data.answers
        const sortedAnswers =  response.sort((a, b) => b.answer_id - a.answer_id);
        console.log("Sorted Answers:", sortedAnswers);
        setAnswer(sortedAnswers);
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
      <div>
          <h1 className="text-sm font-bold mb-5">Question</h1>
        <div className="flex space-x-1">
         < MdArrowCircleRight size={30}/>
          <h2 className=" text-start font-bold text-lg mb-3">{title}</h2>
        </div>
        <p className="font-light pl-10">{qdesc}</p>
      </div>
      <hr />
    </div>
  );
};

export default Answer;

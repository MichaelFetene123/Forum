import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AppState } from "../../App";
import QuestionCard from "./QuestionCard";
import axios from "../../axiosConfig.js";
import Fuse from "fuse.js";

const Home = () => {
  const token = localStorage.getItem("token");
  const { user } = useContext(AppState);
  const [qdata, setQdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 10;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/allQuestions", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const sortedData = Array.isArray(data)
          ? data.sort((a, b) => (b.id ?? b.questionid) - (a.id ?? a.questionid))
          : [];
        setQdata(sortedData);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const offset = currentPage * questionsPerPage;
  const paginatedQuestions = qdata.slice(offset, offset + questionsPerPage);
  const pageCount = Math.ceil(qdata.length / questionsPerPage);

  const handlePageChange = ({ page }) => {
    setCurrentPage(page);
  };

  const filteredQuestions = useMemo(() => {
    const query = searchQuery.trim();
    if (!query) return qdata;

    const options = {
      keys: ["title"],
      threshold: 0.4,
      includeScore: false,
    };

    const fuse = new Fuse(qdata, options);
    return fuse.search(searchQuery).map((result) => result.item);
  }, [qdata, searchQuery]);

  return (
    <div className="container">
      <div className="flex justify-between m-10 mt-0">
        <Link
          to="/ask-question"
          className="border-none bg-blue-500 hover:bg-orange-500 pt-2 px-4 rounded-xl text-white"
        >
          Ask Question
        </Link>
        <div>Welcome: {user?.username}</div>
        <div className="w-full max-w-sm">
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-lg border px-4 py-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <hr className="my-4" />
      {filteredQuestions.length === 0 ? (
        <p className="text-center text-gray-500">No questions found.</p>
      ) : (
        filteredQuestions.map((question) => (
          <QuestionCard
            key={question.questionid ?? question.id}
            questionid={question.questionid ?? question.id}
            title={question.title}
            askedby={question.askedby || question.username}
            qdesc={question.qdesc}
          />
        ))
      )}
    </div>
  );
};

export default Home;

import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AppState } from "../../App";
import QuestionCard from "./QuestionCard";
import axios from "../../axiosConfig.js";
import Fuse from "fuse.js";
import ReactPaginate from "react-paginate";

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

  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery]);

  const offset = currentPage * questionsPerPage;
  const paginatedQuestions = filteredQuestions.slice(
    offset,
    offset + questionsPerPage
  );
  const pageCount = Math.ceil(filteredQuestions.length / questionsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const renderQuestion = (question) => {
    const questionKey = question.questionid ?? question.id;
    return (
      <QuestionCard
        key={questionKey}
        questionid={questionKey}
        title={question.title}
        askedby={question.username}
        qdesc={question.description}
      />
    );
  };

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
      <hr className="my-6 border-gray-200" />
      {filteredQuestions.length === 0 ? (
        <p className="text-center text-gray-500">
          No questions found. Try a different search term.
        </p>
      ) : (
        <>
          <div className="space-y-3">
            {paginatedQuestions.map(renderQuestion)}
          </div>
          {pageCount > 1 && (
            <ReactPaginate
              previousLabel="Prev"
              nextLabel="Next"
              breakLabel="..."
              pageCount={pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={3}
              onPageChange={handlePageChange}
              containerClassName="mt-6 flex items-center justify-center gap-2 text-sm"
              pageClassName="px-3 py-1 rounded-md border border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-200 transition"
              pageLinkClassName="w-full h-full inline-block text-center"
              previousClassName="px-3 py-1 rounded-md border border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-200 transition"
              previousLinkClassName="w-full h-full inline-block text-center"
              nextClassName="px-3 py-1 rounded-md border border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-200 transition"
              nextLinkClassName="w-full h-full inline-block text-center"
              breakClassName="px-3 py-1 text-gray-400"
              activeClassName="!bg-blue-500 !text-white !border-blue-500"
              disabledClassName="opacity-40 cursor-not-allowed"
              renderOnZeroPageCount={null}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Home;

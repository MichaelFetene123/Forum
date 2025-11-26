import React from "react";
import classes from "./Home.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const QuestionCard = ({ title, askedby, qdesc, questionid }) => {
  const [hovered, setHovered] = useState(false);
  const divStyle = {
    backgroundColor: hovered ? "lightgray" : "white",
    padding: "10px",
    cursor: "pointer",
    transtion: "background-color 0.3s ease",
  };

  return (
    <>
      <div
        className="flex  items-center justify-between border-y-1 border-gray-300 "
        style={divStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="left flex">
          <div className=" p-4">
            <Link
              to={`answer/${questionid}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <AccountCircleIcon sx={{ fontSize: 40 }} />
              <p>{askedby}</p>
            </Link>
          </div>
          <Link
            to={`answer/${questionid}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="p-4 flex justify-center items-center mt-4">
              <p>{title}</p>
            </div>
          </Link>
        </div>
        <Link
          to={`/answer/get-answer/${questionid}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className=" pr-10">
            <ArrowForwardIosIcon />
          </div>
        </Link>
      </div>
     
    </>
  );
};

export default QuestionCard;

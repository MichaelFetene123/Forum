import React from "react";
import { Link } from "react-router-dom";
const Four04 = () => {
  return (
    <div className=" flex flex-col items-center justify-center bg-gray-200/80 text-[#252323] w-[80%] mx-auto">
      <h1 className="text-5xl font-bold text-[#dc3545]">404 Page Not Found</h1>
      <p className="text-[1.2rem] my-5 mx-0 ">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        className="no-underline text-[1.2rem] text-blue-800 hover:text-black/80 px-5 rounded-sm   "
        to="/"
      >
        Go back to Home >
      </Link>
    </div>
  );
};

export default Four04;

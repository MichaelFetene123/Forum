import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppState } from "../../App";
import classes from "./Home.module.css";
import QuestionCard from "./QuestionCard";

const Home = () => {
  const { user } = useContext(AppState);
  contt [qdata, setQdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");



  
  const filteredQuestions = useMemo(() => {
    if(!searchQuery.trim()) return qdata;
  })
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
      {searchQuery && <h3>Search Results</h3>}
      <hr />
      {
        searchQuery && (

        )
      }

      <QuestionCard />
    </div>
  );
};

export default Home;

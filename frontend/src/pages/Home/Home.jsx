import React,{useContext} from 'react'
import { AppState } from '../../App'
import classes from './Home.module.css'
import QuestionCard from './QuestionCard';
import { Link } from 'react-router-dom';
const Home = () => {
  const { user, setUser } = useContext(AppState);
  // console.log(user.username);
  return (
    <div className="container  ">
      <div className="flex justify-between m-10 mt-0">
        <Link
          to={"/ask-question"}
          style={{ backgroundColor: "#516cf0" }}
          className=" border-none  hover:bg-orange-500"
        >
          Ask Question
        </Link>
        <div>Welcome: {user?.username}</div>
      </div>
      <QuestionCard />
    </div>
  );
}

export default Home
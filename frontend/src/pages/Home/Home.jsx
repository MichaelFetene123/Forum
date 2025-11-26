import React,{useContext} from 'react'
import { AppState } from '../../App'
import classes from './Home.module.css'
import QuestionCard from './QuestionCard';
const Home = () => {
  const { user, setUser } = useContext(AppState);
  // console.log(user.username);
  return (
    <div className={classes.home}>
      {" "}
      <h2>Home</h2>
      <br />
      <h2>Welcome, {user?.username}</h2>
      <QuestionCard />
    </div>
  );
}

export default Home
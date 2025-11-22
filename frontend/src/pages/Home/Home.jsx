import React,{useContext} from 'react'
import { AppState } from '../../App'
const Home = () => {
  const { user, setUser } = useContext(AppState);
  console.log(user);
  return (
    <div>
      {" "}
      <h2>Home</h2>
      <br />
      <h2>Welcome, {user.username}</h2>
    </div>
  );
}

export default Home
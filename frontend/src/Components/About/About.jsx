import React from "react";
import classes from "./about.module.css";

const about = () => {
  return (
    <div className={classes.container}>
      <span>
        {" "}
        <h3>About</h3>
        <h1>Evangadi Network Q&A</h1>
      </span>

      <section>
        <p>
          No matter what stage of life your are in, wheather you're just
          starting elemntary schol or being promoted to CEO of a Foutunet
          500company you have much to offer to those who are trying to follow in
          your footsteps.
        </p>
        <p className={classes.secondP}>
          Wheather you are willing to share your knowledge or your are just
          looking to meet mentors of your own, please start by joining the
          network here.
        </p>
      </section>
      <button type="submit">How IT Works</button>
    </div>
  );
};

export default about;

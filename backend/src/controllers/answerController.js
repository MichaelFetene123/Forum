import dbConnection from "./../models/db.js";
import { randomUUID } from "crypto";

export const createAnswer = async (req, res) => {
    const { questionid, answer } = req.body;
    
  const userid = req.user.userid;


  let connection;

  try {
    connection = await dbConnection.getConnection();
    // Check if the question exists (optional, but good practice)
    const [questionRows] = await connection.execute(
      "SELECT id FROM questions WHERE questionid = ? ",
      [questionid]
    );

    if (questionRows.length === 0) {
      connection.release();
      return res.status(400).json({ message: "invalid question id" });
    }

    const [insertAnswer] = await connection.execute(
      "INSERT INTO answers (answer, questionid, userid) VALUES (?, ?, ?)",
      [answer, questionid, userid]
    );
    connection.release();

    return res
      .status(201)
      .json({ message: "Answer posted successfully", insertAnswer });
  } catch (error) {
    console.log("Error creating answer:", error);
    return res
      .status(500)
      .json({ message: "internal server problem while creating an answer " });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

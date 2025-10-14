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

export const getAnswers = async (req, res) => {
  const question_id = req.params.question_id;

  if (!question_id) {
    return res.status(400).json({ message: "invalid question id" });
  }

  try {
    const [question] = await dbConnection.query(
      "SELECT questionid FROM questions WHERE questionid = ?",
      [question_id]
    );

    if (question.length === 0) {
      return res
        .status(400)
        .json({ message: "the requested question could not be found" });
    }

    const [answers] = await dbConnection.query(
      "SELECT a.answer AS content, a.answerid AS answer_id, a.userid, u.username AS user_name FROM answers a JOIN users u  ON a.userid = u.userid WHERE a.questionid ",
      [question_id]
    );
    res.status(200).json({
      answers: answers.map((a) => ({
        content: a.content,
        answer_id: a.answer_id,
        user_name: a.user_name,
      })),
    });
  } catch (error) {
    console.log("Error fetching answers:", error.message);
    res.status(500).json({
      message: "An unexpected error occurred.",
    });
  }
};

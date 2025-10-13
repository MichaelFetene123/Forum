import dbConnection from "./../models/db.js";
import { randomUUID } from "crypto";



export const createQuestion = async (req, res) => {
  const { title, description, tag } = req.body;
  const userid = req.user.userid;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Please, Provide all required fields" });
  }

  try {
    const questionid = randomUUID();
    console.log({ "user ID": userid, QID: questionid });
    const qusetion = await dbConnection.query(
      "INSERT INTO questions (title, description, userid, tag, questionid) VALUES (?,?,?,?,?)",
      [title, description, userid, tag, questionid]
    );
    return res
      .status(201)
      .json({ message: "Question created successfully", qusetion });
  } catch (error) {
    console.log("Error during  post question: ", error);
    res.status(500).json({
      message: "Error during  post question",
    });
  }
};

export const getAllQuestions = async (req, res) => {
  
  try {
    const [allQuestions] = await dbConnection.execute('SELECT q.*, u.username FROM questions q JOIN users u ON q.userid = u.userid ')

    res.status(200).json(allQuestions)

  } catch (error) {
     console.error("Error fetching questions:", error);
     res.status(500).json({
       message: "An unexpected error occurred.",
     });
  }
};
import cors from "cors";
import dotenv from "dotenv/config";
import morgan from "morgan";
import express from "express";
import userRouter from "./routes/userRoute.js";
import dbConnection from "./models/db.js";
import questionRouter from "./routes/questionRoute.js";
import answerRouter from "./routes/answerRoute.js";
import { protectRoute } from "./modules/auth.js";

const app = express();
const port = 5500;

app.use(cors()), app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api", protectRoute, questionRouter);
app.use("/api", protectRoute, answerRouter);
app.use("/user", userRouter);

// app.use("/api", protectRoute, questionRouter, answerRouter);

const start = async () => {
  try {
    const result = await dbConnection.execute("select 'test' ");
    console.log("Database connected successfully:😊", result);

    app.listen(port, () => {
      console.log(`server is running on http://localhost:${port}😜`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
};
start();

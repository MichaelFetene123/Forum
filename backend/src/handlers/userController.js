import dbConnection from "./../models/db.js";
import { hashPassword, comparePassword, createJWT } from "./../modules/auth.js";

export const registerUser = async (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;
  if (!email || !password || !username || !firstname || !lastname) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [isUser] = await dbConnection.query(
      "SELECT username, userid from users WHERE username = ? or email = ?",
      [username, email]
    );

    if (isUser.length > 0) {
      return res.status(400).json({ message: "user is already exist " });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "password must be at least 8 characters " });
    }

    const hashedPassword = await hashPassword(password);

    const [user] = await dbConnection.query(
      "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)",
      [username, firstname, lastname, email, hashedPassword]
    );

    // Fetch the new user's info from the database
    const [rows] = await dbConnection.query(
      "SELECT userid, username FROM users WHERE userid = ?",
      [user.insertId]
    );

    const userPayload = { id: rows[0].userid, username: rows[0].username };
    const token = createJWT(userPayload);
    res.status(201).json({ token });
  } catch (e) {
    console.log(e.message);
    return res
      .status(500)
      .json({ message: "something went wrong please try again later!" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please, Enter all required fields " });
  }

  try {
    const [isUser] = await dbConnection.query(
      "SELECT username, userid, password from users WHERE  email = ?",
      [email]
    );

    if (isUser.length === 0) {
      return res.status(400).json({ message: "invalid credential" });
    }

    const validUser = await comparePassword(password, isUser[0].password);

    if (!validUser) {
      return res.status(400).json({ message: "invalid credential" });
    }
    const userid = isUser[0].userid;
    const username = isUser[0].username;
    const token = createJWT({ id: userid, username: username });
    res.status(200).json({ token });

    // return res.status(200).json({ user: isUser });
  } catch (e) {
    console.log(e.message);
    return res
      .status(500)
      .json({ message: "something went wrong please try again later!" });
  }
};

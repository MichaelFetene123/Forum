import dbConnection from "./../models/db.js";
import { hashPassword, comparePassword, createJWT } from "./../modules/auth.js";

export const registerUser = async (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;
  if (!email || !password || !username || !firstname || !lastname) {
    return res.status(400).json({ message: "All fields are required" });
  }

    try {

        const [isUser] = await dbConnection.query('SELECT username, userid from users WHERE username = ? or email = ?', [username, email])

        if (isUser.length > 0) {
            return res.status(400).json({message:"user is already exist "})
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "password must be at least 8 characters " });
        }

      const hashedPassword = await hashPassword(password);
      
    const [user] = await dbConnection.query(
      "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)",
      [username, firstname, lastname, email, hashedPassword]
    );

      //  todo : create a token
      
        
  } catch (e) {
    console.log(e.message);
    return res
      .status(500)
      .json({ message: "something went wrong please try again later!" });
  }
};


export const loginUser = (req, res) => {
  
};

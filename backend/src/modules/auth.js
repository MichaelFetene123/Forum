import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// comparePassword
// password hash
// create JWT
// protect

export const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );

  return token;
};

export function protectRoute(req, res, next) {
  const bearer = req.headers.authorization;

  if (!bearer) {
    return res.status(401).json({ message: "not authorized" });
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    return res.status(401).json({ message: "not valid token" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "invalid token" });
    return;
  }
}

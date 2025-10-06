import jwt from 'jwt' 
import bcrypt from 'bcrypt'
// comparePassword
// password hash
// create JWT
// protect

export const hashPassword = (password) => {
return bcrypt.hash(password, 10)
}

export const comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash)
}

export const createJWT = (user) => {
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET
    );
}

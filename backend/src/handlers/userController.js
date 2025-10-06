export const registerUser = (req, res) => {
  res.send("register user");
}
export const loginUser = (req, res) => { 
res.send("login user");
}

export const protectRoute = (req, res) => {
    res.send("protected route")
}


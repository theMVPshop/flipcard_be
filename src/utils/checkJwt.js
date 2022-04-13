import jwt from "jsonwebtoken"

export default async (req, res, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
  }
  if (!token) {
    return res.status(403).json({ msg: "You are not logged in, please log in and try again." })
  }
  let decoded
  try {
    decoded = await jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    console.log("err: ", err)
    return res.status(500).json({ status: "error", msg: "Problem with JWT token", error: err })
  }
  // GRANT ACCESS TO PROTECTED ROUTE!
  req.user_id = decoded.user_id

  next()
}
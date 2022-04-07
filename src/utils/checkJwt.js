import { promisify } from "util"
import jwt from "jsonwebtoken"

export default async (req, res, next) => {
    console.log(req.header.authorization)
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
  }
  if (!token) {
    return res.status(403).json({ msg: "You are not logged in, please log in and try again.)" })
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  // GRANT ACCESS TO PROTECTED ROUTE!
  req.user_id = decoded.user_id

  next()
}


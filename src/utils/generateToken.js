import jwt from "jsonwebtoken"

export default (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })

//not sure which one is correct
// jwt.sign({ id: user[0].user_id }, "the-super-strong-secret", { expiresIn: "1h" }) //generate token

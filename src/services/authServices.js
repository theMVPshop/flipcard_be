import JWT from "jsonwebtoken"
import User from "../models/User.js"
import Token from "../models/resetToken.js"
import sendEmail from "../utils/email.js"
import crypto from "crypto"
import bcrypt from "bcrypt"

const JWTSecret = process.env.JWT_SECRET
const bcryptSalt = process.env.BCRYPT_SALT
const clientURL = process.env.CLIENT_URL // Need to set this as url lin .env file to route to the frontend- the password reset screen

const requestPasswordReset = async (email) => {
  const user = await User.findOne({ email })
  if (!user) throw new Error("Email does not exist")

  let token = await Token.findOne({ userId: user._id })
  if (token) await token.deleteOne()

  let resetToken = crypto.randomBytes(32).toString("hex")
  const hash = await bcrypt.hash(resetToken, Number(bcryptSalt))

  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save()

  const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`

  sendEmail(
    user.email,
    "Password Reset Request",
    {
      name: user.name,
      link: link,
    },
    "./template/requestResetPassword.handlebars"
  )
  return link
}

const resetPassword = async (userId, token, password) => {
  let passwordResetToken = await Token.findOne({ userId })

  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token")
  }

  const isValid = await bcrypt.compare(token, passwordResetToken.token)

  if (!isValid) {
    throw new Error("Invalid or expired password reset token")
  }

  const hash = await bcrypt.hash(password, Number(bcryptSalt))

  await User.updateOne({ _id: userId }, { $set: { password: hash } }, { new: true })

  const user = await User.findById({ _id: userId })

  sendEmail(
    user.email,
    "Password Reset Successfully",
    {
      name: user.name,
    },
    "./template/resetPassword.handlebars"
  )

  await passwordResetToken.deleteOne()

  return true
}

module.exports = {
  requestPasswordReset,
  resetPassword,
}

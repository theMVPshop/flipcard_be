import nodemailer from "nodemailer"
import handlebars from "handlebars"
import fs from "fs"
import path from "path"
import nodemailer from "nodemailer"

const sendEmail = async (email, subject, payload, template) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "zollegequizlet@gmail.com",
        pass: "He77oWorL6@ATX1987!",
      },
    })

    const source = fs.readFileSync(path.join(__dirname, template), "utf8")
    const compiledTemplate = handlebars.compile(source)
    const options = () => {
      return {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      }
    }

    // Send email
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        return error
      } else {
        return res.status(200).json({
          success: true,
        })
      }
    })
  } catch (error) {
    return error
  }
}

/*
Example:
sendEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Eze" },
  "./templates/layouts/main.handlebars"
);
*/

module.exports = sendEmail

const sendError = (err, res) => {
  let today = new Date()
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
  console.log("error log and time:", err, time)
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    error: err,
    message: err.message,
    stack: err.stack,
  })
}

export default (err, req, res, next) => sendError(err, res)

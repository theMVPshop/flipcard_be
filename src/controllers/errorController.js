const sendError = (err, res) => {
  let logged = res.status(err.statusCode || 500).json({
    status: err.status || "error",
    error: err,
    message: err.message,
    stack: err.stack,
  })
  console.log("hey michael", logged)
}

export default (err, req, res, next) => sendError(err, res)

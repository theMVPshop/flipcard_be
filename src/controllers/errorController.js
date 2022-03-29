const sendError = (err, res) =>
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    error: err,
    message: err.message,
    stack: err.stack,
  })

export default (err, req, res, next) => sendError(err, res)

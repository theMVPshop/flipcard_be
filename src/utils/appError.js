export default class AppError extends Error {
  constructor(statusCode, message) {
    super(message)

    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"
    console.log(this)

    Error.captureStackTrace(this, this.constructor)
  }
}

const sendError = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
      });
}

export default (err, req, res, next) => {
    // console.log(err.stack)
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    sendError(err, res);
}
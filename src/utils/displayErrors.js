export default async function displayErrors(error, req, res, next) {
  res.status(error.status || 500)
}

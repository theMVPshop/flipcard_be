export default function handleErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next)
}

const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('jwt');
  if (!token) return res.status(401).send('Access Denied!');
  try {
    const verified = jwt.verify(token, process.env.JWT);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).send('Invalid Token');
  }
}
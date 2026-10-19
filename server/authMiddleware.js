const jwt = require('jsonwebtoken');
const fail = (status, message) => Object.assign(new Error(message), { status });
exports.auth = (req, res, next) => {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  try { req.user = jwt.verify(token, process.env.JWT_SECRET); next(); }
  catch { throw fail(401, 'Log in to continue'); }
};
exports.admin = (req, res, next) => {
  if (req.user?.role !== 'admin') throw fail(403, 'Admins only');
  next();
};
exports.fail = fail;

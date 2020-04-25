// eslint-disable-next-line no-unused-vars
module.exports = ((err, req, res, next) => {
  if (err) {
    console.error(err);
  }
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ status: 'invalid token' });
  }
  next();
});

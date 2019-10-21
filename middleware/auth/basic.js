module.exports = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith('Basic ')) {
    return res.status(401).json({ message: 'You must be logged in to access this resource.' });
  };

  const [username, password] = Buffer.from(authorization.slice(6), 'base64').toString('ascii').split(':');

  if (!username || !password) {
    return res.status(400).json({ message: 'Malformed credentials.' });
  };

  req.auth = { username, password };
  next();
};
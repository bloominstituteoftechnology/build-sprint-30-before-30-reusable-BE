const database = require('../../database');

module.exports = (req, res, next) => {
  req.headers['Access-Control-Allow-Origin'] = req.headers.referer;

  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: 'You must be logged in to access this resource.' });
  };

  database('users')
    .where({ id: req.session.user.id })
    .first()
    .then(user => {
      req.session.user = user;
      next();
    })
    .catch(error => res.status(500).send(error));
};
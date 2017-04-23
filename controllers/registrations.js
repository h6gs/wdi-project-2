const User = require('../models/user');

function newRoute(req, res) {
  res.render('registrations/new');
}

function createRoute(req, res) {
  User
    .create(req.body)
    .then(() => {
      req.flash('info','Thanks for registering, please login');
      res.redirect('/login');
    })
    .catch((err) => {
      if(err.name === 'ValidationError') {
        res.redirect('/register');
      }
      res.status(500).end();
    });
}

module.exports = {
  new: newRoute,
  create: createRoute
};

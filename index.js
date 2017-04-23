const express           = require('express');
const morgan            = require('morgan');
const expressEjsLayouts = require('express-ejs-layouts');
const mongoose          = require('mongoose');
mongoose.Promise = require('bluebird');
const bodyParser        = require('body-parser');
const methodOverride    = require('method-override');

const app               = express();
const env               = require('./config/env');
const router            = require('./config/routes.js');
const session           = require('express-session');
const User              = require('./models/user');
const flash             = require('express-flash');

// Settings
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

// Middleware
app.use(morgan('dev'));
app.use(expressEjsLayouts);
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride(req => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // Look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(session({
  secret: process.env.SESSION_SECRET || 'baaaaaaaaaaaah',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());
app.use((req, res, next) => {
  if (!req.session.userId) return next();

  User
    .findById(req.session.userId)
    .exec()
    .then(user => {
      if (!user){
        return req.session.regenerate(() => {
          req.flash('danger','You must be logged in to see that...');
          res.redirect('/login');
        });
      }
      res.locals.user = user;
      res.locals.isLoggedIn = true;
      next();
    });
});


app.use(router);
mongoose.connect(env.db);
app.listen(env.port, () => console.log(`Server up and running on port: ${env.port}.`));

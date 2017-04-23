const express = require('express');
const router  = express.Router();
const sessionsController = require('../controllers/sessions');
const registrationsController = require('../controllers/registrations');
const media = require('../controllers/media');

function secureRoute(req, res, next){
  if (!req.session.userId){
    return req.session.regenerate(() => {
      req.flash('danger','Please Log In');
      res.redirect('/login');
    });
  }
  next();
}


router.get('/', (req, res) => res.render('statics/home'));
router.route('/media')
  .get(media.index)
  .post(media.create);
router.route('/media/new')
  .get(secureRoute, media.new);
router.route('/media/:id')
  .get(media.show)
  .put(secureRoute, media.update)
  .delete(secureRoute, media.delete);
router.route('/media/:id/edit')
  .get(secureRoute, media.edit);
router.route('/register')
  .get(registrationsController.new)
  .post(registrationsController.create);
router.route('/login')
  .get(sessionsController.new)
  .post(sessionsController.create);
router.route('/logout')
  .get(sessionsController.delete);

module.exports = router;

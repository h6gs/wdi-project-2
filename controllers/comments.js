const Medium = require('../models/medium');

function commentsCreate(req, res, next) {
  Medium
    .findById(req.params.id)
    .exec()
    .then(medium => {
      if (!medium) {
        const err = new Error('Media not found');
        err.status = 404;
        throw err;
      }

      const comment = {
        user: res.locals.user._id,
        body: req.body.body
      };

      medium.comments.push(comment);

      return medium.save();
    })
    .then((medium) => {
      console.log(medium);
      res.redirect(`/media/${req.params.id}`);
    })
    .catch(next);
}

module.exports = {
  create: commentsCreate
};

const Medium = require('../models/medium');
const Comment = require('../models/comment');

function mediaIndex(req, res) {
  Medium
    .find()
    .then(media => {
      return res.render('media', { media });
    })
    .catch(err => {
      return res.render('error', { error: err });
    });
}

function mediaShow(req, res) {
  Medium
    .findById(req.params.id)
    .populate('comments.user')
    .exec()
    .then(medium => {
      if (!medium) {
        return res.render('error', { error: 'No media found.' });
      }
      return res.render('media/show', { medium });
    })
    .catch(err => {
      return res.render('error', { error: err });
    });
}

function mediaNew(req, res) {
  return res.render('media/new');

}

function mediaCreate(req, res) {
  console.log(req.body);
  Medium
    .create(req.body)
    .then(medium => {
      if (!medium) return res.render('error', { error: 'No medium was created!' });
      return res.redirect('/media');
    })
    .catch(err => {
      return res.render('error', { error: err });
    });
}

function mediaEdit(req, res) {
  Medium
   .findById(req.params.id)
   .exec()
   .then(medium => {
     if (!medium) {
       return res.render('error', { error: 'No medium found.' });
     }
     return res.render('media/edit', { medium });
   })
   .catch(err => {
     return res.render('error', { error: err });
   });
}

function mediaScoreEdit(req, res) {
  // console.log(req.body);
  // console.log(req.params);
  Medium
    .findById(req.params.id)
    .exec()
    .then(medium => {
      if (!medium) {
        return res.render('error', { error: 'No medium found.' });
      }
      medium.score = req.body.score;
      console.log(medium);
      return medium.save();
    })
    .then(medium => {
      if (!medium) {
        return res.render('error', { error: 'Something went wrong during the update.' });
      }
      // return res.render('media/show', { medium });
      return res.status(200).json({medium});
    })
    .catch(err => {
      return res.status(200).json({error: err});
    });
}

function mediaUpdate(req, res) {
  Medium
    .findById(req.params.id)
    .exec()
    .then(medium => {
      if (!medium) {
        return res.render('error', { error: 'No medium found.' });
      }
      for (const field in req.body) {
        medium[field] = req.body[field];
      }
      return medium.save();
    })
    .then(medium => {
      if (!medium) {
        return res.render('error', { error: 'Something went wrong during the update.' });
      }
      return res.render('media/show', { medium });
    })
    .catch(err => {
      return res.render('error', { error: err });
    });
}

function mediaDelete(req, res) {
  Medium
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      return res.redirect('/media');
    })
    .catch(err => {
      return res.render('error', { error: err });
    });
}


module.exports = {
  index: mediaIndex,
  show: mediaShow,
  new: mediaNew,
  create: mediaCreate,
  edit: mediaEdit,
  update: mediaUpdate,
  delete: mediaDelete,
  scoreEdit: mediaScoreEdit
};

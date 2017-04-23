const mongoose = require('mongoose');

const mediumSchema = new mongoose.Schema({
  name: { type: String },
  releaseDate: { type: String},
  synopsis: { type: String},
  genre: {type: String},
  comments: { type: String},
  upVotes: { type: String},
  downVotes: { type: String},
  imdbRating: { type: String},
  images: [{ type: String }]
});

module.exports = mongoose.model('Medium', mediumSchema);

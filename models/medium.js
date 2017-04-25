const mongoose = require('mongoose');

const mediumSchema = new mongoose.Schema({
  name: { type: String },
  releaseDate: { type: String},
  synopsis: { type: String},
  genre: {type: String},
  imdbRating: { type: String},
  images: [{ type: String }],
  comments: [{
    body: { type: String, trim: true, required: true },
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
  }, {
    timestamps: true
  }]
});

module.exports = mongoose.model('Medium', mediumSchema);

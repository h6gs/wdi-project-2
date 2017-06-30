const mongoose = require('mongoose');

const mediumSchema = new mongoose.Schema({
  name: { type: String },
  score: { type: Number},
  releaseDate: { type: String},
  synopsis: { type: String},
  genre: {type: String},
  imdbRating: { type: String},
  images: [{ type: String }],
  language: [{ type: mongoose.Schema.ObjectId, ref: 'Language', required: true
  },{
    timestamps: true
  }]
});

module.exports = mongoose.model('Medium', mediumSchema);

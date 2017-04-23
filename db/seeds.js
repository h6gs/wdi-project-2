
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/wdi-project-2';
mongoose.connect(dbURI);

const User = require('../models/user');
const Medium = require('../models/medium');

User.collection.drop();
Medium.collection.drop();

User
.create([{
  username: 'hs',
  email: 'hs@hs',
  password: 'password',
  passwordConfirmation: 'password'
}])
.then((users) => {
  console.log(`${users.length} user(s) created!`);

  return Medium
  .create([{
    name: 'Billions',
    releaseDate: '01 Jan 2016',
    synopsis: 'U.S. Attorney Chuck Rhoades goes after hedge fund king, Bobby \"Axe\" Axelrod in a battle between two powerful New York figures.',
    genre: 'Drama',
    comments: '',
    upVotes: '',
    downVotes: '',
    imdbRating: '8.4',
    images: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ5MzE3NzkwMV5BMl5BanBnXkFtZTgwMDEzNDA5MDI@._V1_SX300.jpg'
  },{
    name: 'Game of Thrones',
    releaseDate: '17 Apr 2011',
    synopsis: 'Nine noble families fight for control over the mythical lands of Westeros; A forgotten race returns after being dormant for thousands of years.',
    genre: 'Adventure, Drama, Fantasy',
    comments: '',
    upVotes: '',
    downVotes: '',
    imdbRating: '9.5',
    images: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjEwOTcxODc2Ml5BMl5BanBnXkFtZTgwMjMyMDk2MTI@._V1_SX300.jpg'
  },{
    name: 'Broadchurch',
    releaseDate: '07 Aug 2013',
    synopsis: 'The murder of a young boy in a small coastal town brings a media frenzy, which threatens to tear the community apart',
    genre: 'Crime, Drama, Mystery',
    comments: '',
    upVotes: '',
    downVotes: '',
    imdbRating: '8.4',
    images: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTk4MTk3MjIwNF5BMl5BanBnXkFtZTcwOTM2MDU1OQ@@._V1_SX300.jpg'
  }]);
})
.then((media) => {
  console.log(`${media.length} media created!`);
})
.catch((err) => {
  console.log(err);
})
.finally(() => {
  mongoose.connection.close();
});

var mongoose = require('mongoose');

var storySchema = mongoose.Schema({
  title: String,
  text: String,
  img: String,
  authorId: String,
  authorName: String,
  authorPicture: String
}, {timestamps: true});

module.exports = mongoose.model('stories', storySchema);

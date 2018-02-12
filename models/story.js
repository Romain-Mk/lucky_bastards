var mongoose = require('mongoose');

var storySchema = mongoose.Schema({
  title: String,
  text: String,
  img: String,
  tag: Array,
  category: Array,
  lang: String,
  place: String,
  authorId: String,
  publish: Boolean
});

module.exports = mongoose.model('stories', storySchema);

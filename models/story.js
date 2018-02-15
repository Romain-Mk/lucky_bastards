var mongoose = require('mongoose');

var storySchema = mongoose.Schema({
  title: String,
  text: String,
  imgType: {type:String, default: null},
  authorId: String,
  authorName: String,
  authorPicture: {type:String, default: null}
}, {timestamps: true});

module.exports = mongoose.model('stories', storySchema);

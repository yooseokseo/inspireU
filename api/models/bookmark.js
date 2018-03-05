const mongoose = require('mongoose');

const bookmarkSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  inspiration: { type: mongoose.Schema.Types.ObjectId, ref: 'Inspiration', required: true},
  url: { type: String, required: true}
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);

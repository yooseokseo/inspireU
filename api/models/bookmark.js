const mongoose = require('mongoose');

const bookmarkSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  inspirationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inspiration', required: true}
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);

const mongoose = require('mongoose');

const inspirationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title : String,
  caption : String,
  description : String,
  category: String,
  mediaType: String
});

module.exports = mongoose.model('Inspiration', inspirationSchema);

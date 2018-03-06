const mongoose = require('mongoose');

const inspirationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title : { type: String, required: true},
  caption : { type: String, required: true},
  description : { type: String, required: true},
  category: { type: String, required: true},
  mediaType: { type: String, required: true},
  url:  {type: String, required: true},
  inspirationFilePath: {type:String, required:true}
});

module.exports = mongoose.model('Inspiration', inspirationSchema);

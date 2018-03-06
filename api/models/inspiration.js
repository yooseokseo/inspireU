const mongoose = require('mongoose');

const inspirationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title : { type: String, required: true},
  caption : { type: String, required: false},
  description : { type: String, required: false},
  category: { type: String, required: false},
  mediaType: { type: String, required: false},
  url:  {type: String, required: false}
  //inspirationFilePath: {type:String, required:true}
});

module.exports = mongoose.model('Inspiration', inspirationSchema);

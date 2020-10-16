const mongoose = require('mongoose');

var Schema = mongoose.Schema;
const AdSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  uploader: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  image: {
    type: [String],
    reqireed:true
  },
  sellerName: {
    type: String,
    required: true
  },
  itemCity: {
    type: String,
    required: true
  },
  sellerPhoneNumber: {
    type: String,
    required: true
  },
  
},{collection:'ads'}
);

module.exports = mongoose.model('Ad', AdSchema);
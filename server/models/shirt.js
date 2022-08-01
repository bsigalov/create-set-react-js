const mongoose = require('mongoose')

const shirtSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('shirts', shirtSchema)

const mongoose = require('mongoose')

const pantsSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },

  color: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('pants', pantsSchema)

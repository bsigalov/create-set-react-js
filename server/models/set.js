const mongoose = require('mongoose')
const shirtModel = require('../models/shirt')
const shoesModel = require('../models/shoes')
const pantsModel = require('../models/pants')

const setSchema = new mongoose.Schema({
  shirt: shirtModel.schema,
  pants: pantsModel.schema,
  shoes: shoesModel.schema,
})
module.exports = mongoose.model('sets', setSchema)

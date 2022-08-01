const Shirt = require('../models/shirt')

const deleteShirtById = async (req, res) => {
  const shirt = await Shirt.findById(req.params.id)
  if (shirt) {
    await shirt.remove()
    res.status(200).json({ success: true, message: 'Shirt deleted' })
  } else {
    res.status(404).json({ success: false, message: 'Shirt not found, bad ID' })
  }
}

module.exports = { deleteShirtById }

const Shoes = require('../models/shoes')

const deleteShoesById = async (req, res) => {
  const shoes = await Shoes.findById(req.params.id)
  if (shoes) {
    await shoes.remove()
    res.status(200).json({ success: true, message: 'Shoes deleted' })
  } else {
    res.status(404).json({ success: false, message: 'Shoes not found, bad ID' })
  }
}

module.exports = { deleteShoesById }

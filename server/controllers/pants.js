const Pants = require('../models/pants')

const deletePantsById = async (req, res) => {
  const pants = await Pants.findById(req.params.id)
  if (pants) {
    await pants.remove()
    res.status(200).json({ success: true, message: 'Pants deleted' })
  } else {
    res.status(404).json({ success: false, message: 'Pants not found, bad ID' })
  }
}

module.exports = { deletePantsById }

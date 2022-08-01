const axios = require('axios')
const Set = require('../models/set')

const createNewSet = async (req, res) => {
  const newSet = req.body
  try {
    let setToSave = new Set({
      shirt: newSet.shirt,
      pants: newSet.pants,
      shoes: newSet.shoes,
    })
    await setToSave.save()
    // remove the chosen items from the db and create new set to avoid the user choose these items again
    await axios.delete(`http://localhost:8000/${newSet.shirt._id}`)
    await axios.delete(`http://localhost:8000/${newSet.pants._id}`)
    await axios.delete(`http://localhost:8000/${newSet.shoes._id}`)
    res.json({ success: true, set: setToSave })
  } catch (error) {
    console.log(error)
  }
}

module.exports = { createNewSet }

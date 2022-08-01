const axios = require('axios')
const Shirt = require('../models/shirt')
const Shoes = require('../models/shoes')
const Pants = require('../models/pants')

const fetchItemsToDB = async (req, res) => {
  const response = await axios.get(
    'https://run.mocky.io/v3/2d06d2c1-5a77-4ecd-843a-53247bcb0b94',
  )
  const items = response.data
  items.forEach(async (item) => {
    switch (item.type) {
      case 'shoes':
        try {
          let shoesToSave = new Shoes({
            _id: item.id,
            color: item.color,
            size: item.size,
            brand: item.brand,
          })
          await shoesToSave.save()
        } catch (error) {
          console.log(error)
        }
      case 'shirt':
        try {
          let shirtToSave = new Shirt({
            _id: item.id,
            color: item.color,
            size: item.size,
            brand: item.brand,
          })
          await shirtToSave.save()
        } catch (error) {
          console.log(error)
        }
      case 'pants':
        try {
          let pantsToSave = new Pants({
            _id: item.id,
            color: item.color,
            size: item.size,
            brand: item.brand,
          })
          await pantsToSave.save()
        } catch (error) {
          console.log(error)
        }
    }
    res.json({ success: true })
  })
}

module.exports = { fetchItemsToDB }

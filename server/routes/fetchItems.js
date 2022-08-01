const express = require('express')
const { fetchItemsToDB } = require('../controllers/fetchItems')

const router = express.Router()

router.post('/', fetchItemsToDB)

module.exports = router

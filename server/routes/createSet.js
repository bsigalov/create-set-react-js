const express = require('express')
const { createNewSet } = require('../controllers/createSet')

const router = express.Router()

router.post('/', createNewSet)

module.exports = router

const express = require('express')
const { deleteShoesById } = require('../controllers/shoes')

const router = express.Router()

router.route('/:id').delete(deleteShoesById)

module.exports = router

const express = require('express')
const { deleteShirtById } = require('../controllers/shirts')

const router = express.Router()

router.route('/:id').delete(deleteShirtById)

module.exports = router

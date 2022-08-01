const express = require('express')
const { deletePantsById } = require('../controllers/pants')

const router = express.Router()

router.route('/:id').delete(deletePantsById)

module.exports = router

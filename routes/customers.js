const express = require('express')
const customer = require('../controllers/customer')
const router = express.Router()

router.get('/', customer.index)
router.get('/:id', customer.show)
router.put('/:id', customer.update)
router.post('/', customer.store)
router.delete('/:id', customer.destroy)

module.exports = router;


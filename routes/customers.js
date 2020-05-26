const express = require('express')
const customer = require('../controllers/customer')
const router = express.Router()
const auth = require('../middleware/auth')

router.get('/', customer.index)
router.get('/:id', customer.show)
router.put('/:id', auth,  customer.update)
router.post('/', auth,  customer.store)
router.delete('/:id', auth, customer.destroy)

module.exports = router;


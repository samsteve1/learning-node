const express = require('express');
const user = require('../controllers/user');
const router = express.Router();

router.post('/', user.store)

module.exports = router
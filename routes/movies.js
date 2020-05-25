const express = require('express')
const movie = require("../controllers/movie");
const router = express.Router()

router.get('/', movie.index)
router.post('/', movie.store)
router.put('/:id', movie.update)
router.get('/:id', movie.show)
router.delete('/:id', movie.destroy)
module.exports = router
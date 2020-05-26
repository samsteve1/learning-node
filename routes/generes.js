const express = require('express')
const genre = require("../controllers/genre");
const router = express.Router()
const auth = require('../middleware/auth')

router.get("/", genre.index);
router.get("/:id", genre.show);
router.post("/", auth, genre.store);
router.put("/:id", auth,  genre.update);
router.delete("/:id", auth,  genre.destory);

module.exports = router;
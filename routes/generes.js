const express = require('express')
const genre = require("../controllers/genre");
const router = express.Router()

router.get("/", genre.index);
router.get("/:id", genre.show);
router.post("/", genre.store);
router.put("/:id", genre.update);
router.delete("/:id", genre.destory);

module.exports = router;
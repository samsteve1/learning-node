const express = require("express");
const genre = require("../controllers/genre");
const router = express.Router();
const auth = require("../middleware/auth");
const validateObjectId = require('../middleware/validateObjectid');
router.get("/", genre.index);
router.get("/:id",validateObjectId, genre.show);
router.post("/", auth, genre.store);
router.put("/:id", auth,validateObjectId, genre.update);
router.delete("/:id", auth,validateObjectId, genre.destory);

module.exports = router;

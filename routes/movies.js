const express = require("express");
const movie = require("../controllers/movie");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", movie.index);
router.post("/", auth, movie.store);
router.put("/:id", auth,  movie.update);
router.get("/:id", auth,  movie.show);
router.delete("/:id", auth,  movie.destroy);
module.exports = router;

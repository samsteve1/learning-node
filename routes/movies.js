const express = require("express");
const movie = require("../controllers/movie");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");

router.get("/",  movie.index);
router.post("/", [auth, role.admin], movie.store);
router.put("/:id", [auth, role.admin], movie.update);
router.get("/:id",  movie.show);
router.delete("/:id",[auth, role.admin],  movie.destroy);

module.exports = router;

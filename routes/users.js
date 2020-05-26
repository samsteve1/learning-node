const express = require("express");
const user = require("../controllers/user");
const router = express.Router();
const auth = require("../middleware/auth");
router.post("/", auth, user.store);

module.exports = router;

const express = require("express");
const rental = require("../controllers/rental");
const router = express.Router();
const auth = require('../middleware/auth')
router.get("/", rental.index);
router.post("/", auth, rental.store);

module.exports = router;

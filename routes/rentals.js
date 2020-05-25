const express = require("express");
const rental = require("../controllers/rental");
const router = express.Router();

router.get("/", rental.index);
router.post("/", rental.store);

module.exports = router;

const express = require("express");
const router = express.Router();
const emailService = require("../services/emailService");

// Endpoint to validate UID
router.post("/validate", (req, res) => {
  const { uid } = req.body;

  const regex21 = /^21bcs\d{4}$/;
  const regex22_24 = /^(22|23|24)bcs\d{5}$/;

  if (regex21.test(uid) || regex22_24.test(uid)) {
    res.status(200).json({ message: "Valid UID" });
  } else {
    res.status(400).json({ message: "Invalid UID" });
  }
});

module.exports = router;

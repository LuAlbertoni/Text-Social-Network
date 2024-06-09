const express = require("express");

const router = express.Router();

router.get("/", (_, res) => {
  res.send("Página inicial");
});

module.exports = router;

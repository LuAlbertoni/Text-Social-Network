const express = require("express");
const apiRoutes = require("./apiRoutes");
const viewRoutes = require("./viewRoutes");

const router = express.Router();

router.use("/api", apiRoutes);

router.use("/", viewRoutes);

module.exports = router;

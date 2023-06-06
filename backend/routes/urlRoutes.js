const express = require("express");
const urlController = require("../controllers/urlController");
const router = express.Router();

router.route("/").get(urlController.getAllUrls);

module.exports = router;

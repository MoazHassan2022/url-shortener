const express = require("express");
const urlController = require("../controllers/urlController");
const router = express.Router();

router.route("/").get(urlController.getAllUrls).post(urlController.createUrl);

router.route("/:slug").get(urlController.getUrl).put(urlController.updateUrl);

module.exports = router;

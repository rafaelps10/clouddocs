const express = require("express");

const router = express.Router();

const {
    getDocuments
} = require("../controllers/documentController");

router.get("/", getDocuments);

module.exports = router;
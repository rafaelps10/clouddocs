const express = require("express");

const router = express.Router();

const {
    getDocuments,
    createDocument
} = require("../controllers/documentController");

router.get("/", getDocuments);

router.post("/", createDocument);

module.exports = router;
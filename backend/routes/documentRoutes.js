const express = require("express");

const router = express.Router();

const {
    getDocuments,
    createDocument,
    deleteDocument,
    updateDocument
} = require("../controllers/documentController");

router.get("/", getDocuments);

router.post("/", createDocument);

router.put("/:id", updateDocument);

router.delete("/:id", deleteDocument);

module.exports = router;
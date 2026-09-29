const express = require("express");

const router = express.Router();

const {
    getDocuments,
    createDocument,
    deleteDocument,
    updateDocument
} = require("../controllers/documentController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getDocuments);
router.post("/", authMiddleware, createDocument);
router.put("/:id", authMiddleware, updateDocument);
router.delete("/:id", authMiddleware, deleteDocument);

module.exports = router;
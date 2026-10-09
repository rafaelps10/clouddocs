const express = require("express");

const router = express.Router();

const {
    getDocuments,
    createDocument,
    uploadDocument,
    downloadDocument,
    deleteDocument,
    updateDocument
} = require("../controllers/documentController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.get("/", authMiddleware, getDocuments);

router.get(
    "/:id/download",
    authMiddleware,
    downloadDocument
);

router.post("/", authMiddleware, createDocument);

router.post(
    "/upload-test",
    authMiddleware,
    upload.single("file"),
    (req, res) => {
        res.json({
            message: "Arquivo recebido com sucesso",
            filename: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size
        });
    }
);

router.post(
    "/upload",
    authMiddleware,
    upload.single("file"),
    uploadDocument
);

router.put("/:id", authMiddleware, updateDocument);

router.delete("/:id", authMiddleware, deleteDocument);

module.exports = router;
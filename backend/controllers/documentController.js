const pool = require("../db");

const crypto = require("crypto");

const {
    uploadFile
} = require("../services/s3Service");

const getDocuments = async (req, res) => {
    try {
        const userId = req.user.userId;

        const result = await pool.query(`
            SELECT
                id,
                filename,
                file_type,
                file_size,
                s3_key,
                created_at
            FROM documents
            WHERE user_id = $1
            ORDER BY created_at DESC
        `, [userId]);

        res.json(result.rows);

    } catch (error) {
        console.error("Erro ao buscar documentos:", error.message);

        res.status(500).json({
            error: "Erro ao buscar documentos"
        });
    }
};

const createDocument = async (req, res) => {
    try {
        const userId = req.user.userId;

        const {
            filename,
            file_type,
            file_size,
            s3_key
        } = req.body;

        if (!filename) {
            return res.status(400).json({
                error: "filename é obrigatório"
            });
        }

        const result = await pool.query(`
            INSERT INTO documents (
                user_id,
                filename,
                file_type,
                file_size,
                s3_key
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING
                id,
                user_id,
                filename,
                file_type,
                file_size,
                s3_key,
                created_at
        `, [
            userId,
            filename,
            file_type,
            file_size,
            s3_key
        ]);

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error("Erro ao criar documento:", error.message);

        res.status(500).json({
            error: "Erro ao criar documento"
        });
    }
};

const deleteDocument = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;

        const result = await pool.query(`
            DELETE FROM documents
            WHERE id = $1
            AND user_id = $2
            RETURNING id, filename
        `, [
            id,
            userId
        ]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Documento não encontrado"
            });
        }

        res.json({
            message: "Documento excluído com sucesso",
            document: result.rows[0]
        });

    } catch (error) {
        console.error("Erro ao excluir documento:", error.message);

        res.status(500).json({
            error: "Erro ao excluir documento"
        });
    }
};

const updateDocument = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;

        const {
            filename,
            file_type,
            file_size,
            s3_key
        } = req.body;

        if (!filename) {
            return res.status(400).json({
                error: "filename é obrigatório"
            });
        }

        const result = await pool.query(`
            UPDATE documents
            SET
                filename = $1,
                file_type = $2,
                file_size = $3,
                s3_key = $4
            WHERE id = $5
            AND user_id = $6
            RETURNING
                id,
                user_id,
                filename,
                file_type,
                file_size,
                s3_key,
                created_at
        `, [
            filename,
            file_type,
            file_size,
            s3_key,
            id,
            userId
        ]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Documento não encontrado"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error("Erro ao atualizar documento:", error.message);

        res.status(500).json({
            error: "Erro ao atualizar documento"
        });
    }
};

const uploadDocument = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!req.file) {
            return res.status(400).json({
                error: "Arquivo é obrigatório"
            });
        }

        const {
            originalname,
            mimetype,
            size,
            buffer
        } = req.file;

        const fileId = crypto.randomUUID();

        const s3Key = `users/${userId}/documents/${fileId}-${originalname}`;

        await uploadFile({
            key: s3Key,
            body: buffer,
            contentType: mimetype
        });

        const result = await pool.query(`
            INSERT INTO documents (
                user_id,
                filename,
                file_type,
                file_size,
                s3_key
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING
                id,
                user_id,
                filename,
                file_type,
                file_size,
                s3_key,
                created_at
        `, [
            userId,
            originalname,
            mimetype,
            size,
            s3Key
        ]);

        res.status(201).json({
            message: "Documento enviado com sucesso",
            document: result.rows[0]
        });

    } catch (error) {
        console.error("Erro ao enviar documento:", error.message);

        res.status(500).json({
            error: "Erro ao enviar documento"
        });
    }
};

module.exports = {
    getDocuments,
    createDocument,
    uploadDocument,
    deleteDocument,
    updateDocument
};
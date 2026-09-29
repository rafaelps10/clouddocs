const pool = require("../db");

const getDocuments = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                id,
                filename,
                file_type,
                file_size,
                s3_key,
                created_at
            FROM documents
            ORDER BY created_at DESC
        `);

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
        const {
            user_id,
            filename,
            file_type,
            file_size,
            s3_key
        } = req.body;

        if (!user_id || !filename) {
            return res.status(400).json({
                error: "user_id e filename são obrigatórios"
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
            user_id,
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

module.exports = {
    getDocuments,
    createDocument
};
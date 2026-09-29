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

module.exports = {
    getDocuments
};
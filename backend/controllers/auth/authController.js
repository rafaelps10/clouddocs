const pool = require("../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                error: "name, email e password são obrigatórios"
            });
        }

        const existingUser = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                error: "Este email já está cadastrado"
            });
        }

        const hash = await bcrypt.hash("Teste123!CloudDocs", 10);
        console.log(hash);

        const result = await pool.query(`
            INSERT INTO users (
                name,
                email,
                password_hash
            )
            VALUES ($1, $2, $3)
            RETURNING
                id,
                name,
                email,
                created_at
        `, [
            name,
            email,
            hash
        ]);

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error("Erro ao registrar usuário:", error.message);

        res.status(500).json({
            error: "Erro ao registrar usuário"
        });
    }
};


const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "email e password são obrigatórios"
            });
        }

        const result = await pool.query(
            "SELECT id, name, email, password_hash FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                error: "Email ou senha inválidos"
            });
        }

        const user = result.rows[0];

        const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordMatch) {
            return res.status(401).json({
                error: "Email ou senha inválidos"
            });
        }

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            message: "Login realizado com sucesso",
            token
        });

    } catch (error) {
        console.error("Erro ao realizar login:", error.message);

        res.status(500).json({
            error: "Erro ao realizar login"
        });
    }
};


module.exports = {
    register,
    login
};
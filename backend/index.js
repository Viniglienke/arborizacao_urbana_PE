const express = require("express");
const app = express();
const { Pool } = require("pg");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const db = new Pool({
    host: "dpg-ctcddfbtq21c73foih9g-a.oregon-postgres.render.com",
    user: "biourb_yyhn_user",
    password: "sQBzBPz3o2eBJ8KcV0ssoYo4gYpPjlkm",
    database: "biourb_yyhn",
    port: 5432,
});

app.use(express.json());
const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    return await fn(req, res)
}

app.use(allowCors)
db.connect()
    .then(() => console.log("Conexão com o banco de dados bem-sucedida"))
    .catch(err => console.error("Erro ao conectar ao banco de dados:", err.message));

// Rota para registrar usuário
app.post("/register", async (req, res) => {
    const { cpf, name, email, password } = req.body;

    try {
        const userCheck = await db.query("SELECT * FROM usuario WHERE email = $1", [email]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ msg: "Email já cadastrado" });
        }

        const hash = await bcrypt.hash(password, saltRounds);

        await db.query(
            "INSERT INTO usuario (cpf, nome, email, senha) VALUES ($1, $2, $3, $4)",
            [cpf, name, email, hash]
        );

        res.status(201).json({ msg: "Usuário cadastrado com sucesso" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para login de usuário
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const userCheck = await db.query("SELECT * FROM usuario WHERE email = $1", [email]);

        if (userCheck.rows.length === 0) {
            return res.status(404).json({ msg: "Usuário não registrado!" });
        }

        const user = userCheck.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.senha);

        if (isPasswordValid) {
            res.json({ msg: "Usuário logado" });
        } else {
            res.status(401).json({ msg: "Senha incorreta" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para registrar árvore
app.post("/trees", async (req, res) => {
    const { usuName, treeName, lifecondition, location, plantingDate } = req.body;

    if (!usuName || !treeName || !lifecondition || !location || !plantingDate) {
        return res.status(400).json({ msg: "Por favor, forneça todos os campos necessários." });
    }

    try {
        const result = await db.query(
            `
            INSERT INTO arvore (nome_registrante, nome_cientifico, data_plantio, estado_saude, localizacao)
            VALUES ($1, $2, $3, $4, $5) RETURNING id
            `,
            [usuName, treeName, plantingDate, lifecondition, location]
        );

        res.status(201).json({ msg: "Árvore registrada com sucesso!", insertedId: result.rows[0].id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para listar todas as árvores
app.get("/trees", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM arvore");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para atualizar árvore
app.put("/trees/:id", async (req, res) => {
    const { id } = req.params;
    const { usuName, treeName, lifecondition, location, plantingDate } = req.body;

    if (!usuName || !treeName || !lifecondition || !location || !plantingDate) {
        return res.status(400).json({ msg: "Por favor, forneça todos os campos necessários." });
    }

    try {
        await db.query(
            `
            UPDATE arvore
            SET nome_registrante = $1, nome_cientifico = $2, data_plantio = $3, estado_saude = $4, localizacao = $5
            WHERE id = $6
            `,
            [usuName, treeName, plantingDate, lifecondition, location, id]
        );

        res.json({ msg: "Árvore atualizada com sucesso!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para excluir uma árvore
app.delete("/trees/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await db.query("DELETE FROM arvore WHERE id = $1", [id]);
        res.json({ msg: "Árvore excluída com sucesso!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Iniciar o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
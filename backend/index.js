const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "vini123",
    database: "biourb",
});

app.use(express.json());
app.use(cors());

// Rota para registrar usuário
app.post("/register", (req, res) => {
    const { cpf, name, email, password } = req.body;

    db.query("SELECT * FROM usuario WHERE email = ?", [email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length > 0) {
            return res.status(400).json({ msg: "Email já cadastrado" });
        }

        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            db.query(
                "INSERT INTO usuario (cpf, nome, email, senha) VALUES (?,?,?,?)",
                [cpf, name, email, hash],
                (error) => {
                    if (error) {
                        return res.status(500).json({ error: error.message });
                    }

                    res.status(201).json({ msg: "Usuário cadastrado com sucesso" });
                }
            );
        });
    });
});

// Rota para login de usuário
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM usuario WHERE email = ?", [email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ msg: "Usuário não registrado!" });
        }

        const user = result[0];
        bcrypt.compare(password, user.senha, (error, response) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            if (response) {
                res.json({ msg: "Usuário logado" });
            } else {
                res.status(401).json({ msg: "Senha incorreta" });
            }
        });
    });
});

// Rota para registrar árvore
app.post("/trees", (req, res) => {
    const { usuName, treeName, lifecondition, location, plantingDate } = req.body;

    if (!usuName || !treeName || !lifecondition || !location || !plantingDate) {
        return res.status(400).json({ msg: "Por favor, forneça todos os campos necessários." });
    }

    const query = `
        INSERT INTO arvore (nome_registrante, nome_cientifico, data_plantio, estado_saude, localizacao)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(query, [usuName, treeName, plantingDate, lifecondition, location], (error, result) => {
        if (error) {
            console.error("Erro ao inserir árvore:", error);
            return res.status(500).json({ error: error.message });
        }

        const lastID = result.insertId;
        res.status(201).json({ msg: "Árvore registrada com sucesso!", insertedId: lastID });
    });
});

// Rota para listar todas as árvores
app.get("/trees", (req, res) => {
    const query = "SELECT * FROM arvore";

    db.query(query, (error, trees) => {
        if (error) {
            console.error("Erro ao listar árvores:", error);
            return res.status(500).json({ error: error.message });
        }

        res.json(trees);
    });
});

// Rota para atualizar árvore
app.put("/trees/:id", (req, res) => {
    const { id } = req.params;
    const { usuName, treeName, lifecondition, location, plantingDate } = req.body;

    if (!usuName || !treeName || !lifecondition || !location || !plantingDate) {
        return res.status(400).json({ msg: "Por favor, forneça todos os campos necessários." });
    }

    const query = `
        UPDATE arvore
        SET nome_registrante = ?, nome_cientifico = ?, data_plantio = ?, estado_saude = ?, localizacao = ?
        WHERE id = ?
    `;

    db.query(
        query,
        [usuName, treeName, plantingDate, lifecondition, location, id],
        (error) => {
            if (error) {
                console.error("Erro ao atualizar árvore:", error);
                return res.status(500).json({ error: error.message });
            }

            res.json({ msg: "Árvore atualizada com sucesso!" });
        }
    );
});


// Rota para excluir uma árvore
app.delete('/trees/:id', (req, res) => {
    const { id } = req.params;

    const query = "DELETE FROM arvore WHERE id = ?";

    db.query(query, [id], (error) => {
        if (error) {
            console.error("Erro ao excluir árvore:", error);
            return res.status(500).json({ error: error.message });
        }

        res.json({ msg: "Árvore excluída com sucesso!" });
    });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

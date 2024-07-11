const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Conectando ao banco de dados SQLite3
const db = new sqlite3.Database('./biourb.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite3.');
    }
});

app.use(express.json());
app.use(cors());

// Rota para registrar usuário
app.post("/register", (req, res) => {
    const cpf = req.body.cpf;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    db.get("SELECT * FROM usuario WHERE email = ?", [email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result) {
            return res.status(400).json({ msg: "Email já cadastrado" });
        }

        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            db.run(
                "INSERT INTO usuario (cpf, nome, email, senha) VALUES (?,?,?,?)",
                [cpf, name, email, hash],
                function (error) {
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
    const email = req.body.email;
    const password = req.body.password;

    db.get("SELECT * FROM usuario WHERE email = ?", [email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!result) {
            return res.status(404).json({ msg: "Usuário não registrado!" });
        }

        bcrypt.compare(password, result.senha, (error, response) => {
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
    const { treeName, plantingDate, location, lifecondition } = req.body;

    const query = `
        INSERT INTO arvore (tipo_arvore_id, area_id, data_plantio, estado_saude)
        VALUES (?, ?, ?, ?)
    `;
    
    db.run(
        query,
        [treeName, location, plantingDate, lifecondition],
        function (error) {
            if (error) {
                return res.status(500).json({ error: error.message });
            }

            res.status(201).json({ msg: "Árvore registrada com sucesso!" });
        }
    );
});

app.get("/trees", (req, res) => {
    const query = `
        SELECT * FROM arvore
    `;

    db.all(query, (error, trees) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.json(trees);
    });
});




app.listen(3001, () => {
    console.log("Rodando na porta 3001");
});

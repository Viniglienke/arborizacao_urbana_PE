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

app.post("/register", (req, res) => {
    const cpf = req.body.cpf;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

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
                (error, response) => {
                    if (error) {
                        return res.status(500).json({ error: error.message });
                    }

                    res.status(201).json({ msg: "Usuário cadastrado com sucesso" });
                }
            );
        });
    });
});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM usuario WHERE email = ?", [email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ msg: "Usuário não registrado!" });
        }

        bcrypt.compare(password, result[0].senha, (error, response) => {
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

app.listen(3001, () => {
    console.log("Rodando na porta 3001");
});

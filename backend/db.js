const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho para o arquivo do banco de dados
const dbPath = path.resolve(__dirname, 'biourb.db');

// Cria uma nova instância do banco de dados SQLite
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados SQLite:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');

        // Criar tabelas
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS usuario (
                cpf TEXT PRIMARY KEY,
                nome TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                senha TEXT NOT NULL
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS area (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                localizacao TEXT NOT NULL,
                tamanho REAL,
                data_criacao TEXT,
                usuario_cpf TEXT,
                FOREIGN KEY (usuario_cpf) REFERENCES usuario(cpf)
            )`);
            
            db.run(`CREATE TABLE IF NOT EXISTS arvore (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                tipo_arvore_id INTEGER,
                area_id INTEGER,
                data_plantio TEXT,
                estado_saude TEXT NOT NULL,
                FOREIGN KEY (tipo_arvore_id) REFERENCES tipo_de_arvore(id),
                FOREIGN KEY (area_id) REFERENCES area(id)
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS acompanhamento (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                arvore_id INTEGER,
                data_acompanhamento TEXT NOT NULL,
                altura REAL,
                circunferencia REAL,
                observacoes TEXT,
                FOREIGN KEY (arvore_id) REFERENCES arvore(id)
            )`);
        });
    }
});

module.exports = db;

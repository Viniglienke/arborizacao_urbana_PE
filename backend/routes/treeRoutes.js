// const express = require("express");
// const router = express.Router();

// module.exports = (db) => {
// // Rota para registrar árvore
// router.post("/", (req, res) => {
//     const { usuName, treeName, plantingDate, lifecondition, location } = req.body;

//     // Verificando se todos os campos necessários estão presentes
//     if (!usuName || !treeName || !plantingDate || !lifecondition || !location) {
//         return res.status(400).json({ msg: "Por favor, forneça todos os campos necessários." });
//     }

//     const query = `
//         INSERT INTO arvore (nome_registrante, tipo_arvore_id, area_id, data_plantio, estado_saude)
//         VALUES (?, ?, ?, ?, ?)
//     `;
    
//     db.run(
//         query,
//         [usuName, treeName, location, plantingDate, lifecondition],
//         function (error) {
//             if (error) {
//                 return res.status(500).json({ error: error.message });
//             }

//             // Ao inserir com sucesso, podemos obter o ID inserido
//             const lastID = this.lastID;
//             res.status(201).json({ msg: "Árvore registrada com sucesso!", insertedId: lastID });
//         }
//     );
// });

// // Rota para listar todas as árvores
// router.get("/", (req, res) => {
//     const query = `
//         // SELECT a.id, u.nome AS nome_registrante, t.nome_cientifico AS tipo_arvore_id, a.data_plantio, a.estado_saude, ar.nome AS area_id
//         FROM arvore a
//         JOIN usuario u ON a.nome_registrante = u.cpf
//         JOIN tipo_de_arvore t ON a.tipo_arvore_id = t.id
//         JOIN area ar ON a.area_id = ar.id
//     `;

//     db.all(query, (error, trees) => {
//         if (error) {
//             return res.status(500).json({ error: error.message });
//         }

//         res.json(trees);
//     });
// });

// // Rota para buscar árvores por termo de pesquisa
// router.get('/search', async (req, res) => {
// const term = req.query.term;

// if (!term) {
//     return res.status(400).json({ error: 'Termo de pesquisa não fornecido.' });
// }

// const query = `
//     SELECT a.id, u.nome AS nome_registrante, t.nome_cientifico AS tipo_arvore_id, a.data_plantio, a.estado_saude, ar.nome AS area_id
//     FROM arvore a
//     JOIN usuario u ON a.nome_registrante = u.cpf
//     JOIN tipo_de_arvore t ON a.tipo_arvore_id = t.id
//     JOIN area ar ON a.area_id = ar.id
//     WHERE u.nome LIKE ? OR t.nome_cientifico LIKE ?
// `;

// try {
//     const dbResponse = await db.all(query, [`%${term}%`, `%${term}%`]);
//     res.json(dbResponse);
// } catch (error) {
//     res.status(500).json({ error: error.message });
// }
// });


// return router;
// };

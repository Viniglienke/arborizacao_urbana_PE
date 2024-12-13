import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import './Monitoring.css';

const Monitoring = () => {
    const [trees, setTrees] = useState([]);
    const [editing, setEditing] = useState(false);
    const [currentTree, setCurrentTree] = useState({
        id: null,
        nome_registrante: '',
        nome_cientifico: '',
        data_plantio: '',
        estado_saude: '',
        localizacao: ''
    });

    useEffect(() => {
        fetchTrees();
    }, []);

    const fetchTrees = async () => {
        try {
            const response = await axios.get('https://arborizacao-urbana-pe.vercel.app/trees');
            setTrees(response.data);
        } catch (error) {
            console.error("Erro ao buscar árvores:", error);
        }
    };

    const handleEditClick = (tree) => {
        setEditing(true);
        setCurrentTree({
            id: tree.id,
            nome_registrante: tree.nome_registrante,
            nome_cientifico: tree.nome_cientifico,
            data_plantio: tree.data_plantio,
            estado_saude: tree.estado_saude,
            localizacao: tree.localizacao
        });
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`https://arborizacao-urbana-pe.vercel.app/trees/${id}`);
            fetchTrees();
        } catch (error) {
            console.error("Erro ao excluir árvore:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentTree({ ...currentTree, [name]: value });
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://arborizacao-urbana-pe.vercel.app/trees/${currentTree.id}`, {
                usuName: currentTree.nome_registrante,
                treeName: currentTree.nome_cientifico,
                plantingDate: currentTree.data_plantio,
                lifecondition: currentTree.estado_saude,
                location: currentTree.localizacao
            });
            setEditing(false);
            fetchTrees();
        } catch (error) {
            console.error("Erro ao atualizar árvore:", error);
        }
    };

    const formatDate = (dateString) => {
        const formattedDate = new Date(dateString);
        formattedDate.setHours(0, 0, 0, 0);
        return format(formattedDate, 'dd/MM/yyyy');
    };

    return (
        <div className="monitoring-container">
            <h1 className='monitoring-title'>Monitoramento de Árvores</h1>
            {editing ? (
                <form className="edit-form" onSubmit={handleUpdateSubmit}>
                    <h2>Editar Árvore</h2>
                    <div className="input-field">
                        <input
                            type="text"
                            name="nome_registrante"
                            value={currentTree.nome_registrante}
                            onChange={handleInputChange}
                            placeholder="Nome do Registrante"
                        />
                    </div>
                    <div className="input-field">
                        <input
                            type="text"
                            name="nome_cientifico"
                            value={currentTree.nome_cientifico}
                            onChange={handleInputChange}
                            placeholder="Nome Científico da Árvore"
                        />
                    </div>
                    <div className="input-field">
                        <input
                            type="date"
                            name="data_plantio"
                            value={currentTree.data_plantio}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-field">
                        <select
                            name="estado_saude"
                            value={currentTree.estado_saude}
                            onChange={handleInputChange}
                        >
                            <option value="" disabled>Sáude da Árvore</option>
                            <option value="Saudável">Saudável</option>
                            <option value="Doente">Doente</option>
                            <option value="Morrendo">Morrendo</option>
                        </select>
                    </div>
                    <div className="input-field">
                        <input
                            type="text"
                            name="localizacao"
                            value={currentTree.localizacao}
                            onChange={handleInputChange}
                            placeholder="Localização"
                        />
                    </div>
                    <button className="update" type="submit">Atualizar Árvore</button>
                    <button className="cancel" onClick={() => setEditing(false)}>Cancelar</button>
                </form>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuário</th>
                            <th>Nome Científico</th>
                            <th>Data de Plantio</th>
                            <th>Estado de Saúde</th>
                            <th>Localização</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trees.map(tree => (
                            <tr key={tree.id}>
                                <td>{tree.id}</td>
                                <td>{tree.nome_registrante}</td>
                                <td>{tree.nome_cientifico}</td>
                                <td>{formatDate(tree.data_plantio)}</td>
                                <td>{tree.estado_saude}</td>
                                <td>{tree.localizacao}</td>
                                <td>
                                    <button onClick={() => handleEditClick(tree)}>Editar</button>
                                    <button className="delete-button" onClick={() => handleDeleteClick(tree.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Monitoring;
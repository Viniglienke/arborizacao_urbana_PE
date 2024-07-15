import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import './Monitoring.css';
import Search from './Search';

const Monitoring = () => {
    const [trees, setTrees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchTrees();
    }, []);

    const fetchTrees = async () => {
        try {
            const response = await axios.get('http://localhost:3001/trees');
            setTrees(response.data);
        } catch (error) {
            console.error("Erro ao buscar árvores:", error);
        }
    };

    const handleSearch = async (searchTerm) => {
        try {
            const response = await axios.get(`http://localhost:3001/search?term=${searchTerm}`);
            setTrees(response.data);
        } catch (error) {
            console.error("Erro ao buscar árvores:", error);
        }
    };

    const formatDate = (dateString) => {
        const formattedDate = new Date(dateString);
        return format(formattedDate, 'dd/MM/yyyy');
    };

    return (
        <div className="monitoring-container">
            <h1 className='monitoring-title'>Monitoramento de Árvores</h1>
            <Search onSearch={handleSearch} />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Usuário</th>
                        <th>Nome Científico</th>
                        <th>Data de Plantio</th>
                        <th>Estado de Saúde</th>
                        <th>Localização</th>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Monitoring;

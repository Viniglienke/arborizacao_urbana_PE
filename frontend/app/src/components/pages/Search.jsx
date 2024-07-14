import React, { useState } from 'react';
import './Search.css'

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/trees/search?term=${encodeURIComponent(searchTerm)}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar árvores: ' + response.statusText);
            }
            const data = await response.json();
            onSearch(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <input className='input-field'
                type="text"
                placeholder="Pesquisar por nome científico ou nome do usuário..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className='button' type="submit">Pesquisar</button>
        </form>
    );
};

export default Search;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import './Trees.css';

const Trees = () => {
    const [values, setValues] = useState({
        treeName: "",
        plantingDate: "",
        lifecondition: "",
        location: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formattedDate = formatDate(values.plantingDate);

        Axios.post("http://localhost:3001/trees", {
            treeName: values.treeName,
            plantingDate: formattedDate,
            lifecondition: values.lifecondition,
            location: values.location
        })
        .then((response) => {
            console.log(response.data); 
            alert("Árvore registrada com sucesso! Redirecionando...");
            navigate("/");
        })
        .catch((error) => {
            console.error("Erro ao registrar árvore:", error);
            alert("Erro ao registrar árvore. Verifique o console para mais detalhes.");
        });
    };

    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Registrar Árvore</h1>
                <div className="input-field">
                    <input
                        type="text"
                        placeholder="Nome Científico da Árvore"
                        required
                        id="treeName"
                        name="treeName"
                        value={values.treeName}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-field">
                    <input
                        type="date"
                        placeholder="Data de Plantio"
                        required
                        id="plantingDate"
                        name="plantingDate"
                        value={values.plantingDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-field">
                    <input
                        type="text"
                        placeholder="Saúde da Árvore"
                        required
                        id="lifecondition"
                        name="lifecondition"
                        value={values.lifecondition}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-field">
                    <input
                        type="text"
                        placeholder="Localização"
                        required
                        id="location"
                        name="location"
                        value={values.location}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Registrar Árvore</button>
            </form>
        </div>
    );
};

export default Trees;

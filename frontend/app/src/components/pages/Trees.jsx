import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { AuthContext } from "../../context/AuthContext.jsx"; // Importar o contexto de autenticação
import './Trees.css';

const Trees = () => {
    const { user } = useContext(AuthContext); // Obter o usuário logado do contexto
    const navigate = useNavigate();

    const [values, setValues] = useState({
        usuName: user?.name || "", // Inicializar com o nome do usuário logado
        treeName: "",
        plantingDate: "",
        lifecondition: "",
        location: ""
    });

    const handleChange = (e) => {
        setValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        Axios.post("https://arborizacao-urbana-pe.vercel.app/trees", {
            usuName: values.usuName,
            treeName: values.treeName,
            plantingDate: values.plantingDate,
            lifecondition: values.lifecondition,
            location: values.location
        })
        .then((response) => {
            console.log(response.data); 
            alert("Árvore registrada com sucesso! Redirecionando...");
            navigate("/monitoring");
        })
        .catch((error) => {
            console.error("Erro ao registrar árvore:", error);
            alert("Erro ao registrar árvore. Verifique o console para mais detalhes.");
        });
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Registrar Árvore</h1>
                <div className="input-field">
                    <input
                        type="text"
                        placeholder="Nome do Registrante"
                        required
                        id="usuName"
                        name="usuName"
                        value={values.usuName} // Preenchido automaticamente
                        onChange={handleChange}
                        readOnly // Tornar o campo somente leitura
                    />
                </div>

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
                        type="text"
                        placeholder="Data de Plantio"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = values.plantingDate ? "date" : "text")}
                        required
                        id="plantingDate"
                        name="plantingDate"
                        value={values.plantingDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-field">
                    <select
                        required
                        id="lifecondition"
                        name="lifecondition"
                        value={values.lifecondition}
                        onChange={handleChange}
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
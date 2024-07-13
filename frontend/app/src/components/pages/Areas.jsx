import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import './Areas.css';

const Areas = () => {
    const [values, setValues] = useState({
        areaname: "",
        arealocalization: "",
        areasize: "",
        creationdate: "",
        usercpf: ""
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

        Axios.post("http://localhost:3001/Areas", {
            areaname: values.areaname,
            creationdate: formattedDate,
            arealocalization: values.arealocalization,
            areasize: values.areasize,
            usercpf: values.usercpf
        })
        .then((response) => {
            console.log(response.data); 
            alert("Area regisrtada com sucesso! Redirecionando...");
            navigate("/");
        })
        .catch((error) => {
            console.error("Erro ao registrar Area:", error);
            alert("Erro ao registrar Area. Verifique o console para mais detalhes.");
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
                <h1>Registrar Area</h1>
                <div className="input-field">
                    <input
                        type="text"
                        placeholder="Nome da Area"
                        required
                        id="areaname"
                        name="areaname"
                        value={values.areaname}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-field">
                    <input
                        type="date"
                        placeholder="Data de criacao da area"
                        required
                        id="creationdate"
                        name="creationdate"
                        value={values.creationdate}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-field">
                    <input
                        type="text"
                        placeholder="Tamnho da Area"
                        required
                        id="areasize"
                        name="areasize"
                        value={values.areasize}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-field">
                    <input
                        type="text"
                        placeholder="Localização"
                        required
                        id="arealocalization"
                        name="arealocalization"
                        value={values.arealocalization}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Registrar Area</button>
            </form>
        </div>
    );
};

export default Areas;













/*
function Areas() {
  return (
    <div>
      <h1>Bem-vindo ao Sistema de Controle de Arborização</h1>
      <p>Utilize o menu para navegar pelo sistema.</p>
    </div>
  );
}

export default Areas;*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./Login.css";

const Register = () => {
  // Estados para armazenar as entradas do usuário

  const [values, setValues] = useState({
    name: "",
    email: "",
    cpf: "",
    password: ""
  });

  const navigate = useNavigate();

  // Função para formatar o CPF enquanto o usuário digita
  const handleCPFChange = (e) => {
    let cpf = e.target.value;
    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, "");

    // Aplica a máscara do CPF
    if (cpf.length <= 11) {
      cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    setValues((prevValues) => ({
      ...prevValues,
      cpf: cpf
    }));
  };


  // Função que é chamada quando o formulário é enviado
  const handleClickRegister = (e) => {
    e.preventDefault();
    Axios.post("https://biourb.vercel.app/register", {
      cpf: values.cpf,
      name: values.name,
      email: values.email,
      password: values.password,
    }).then((response) => {
      console.log(response);
      alert("Usuário cadastrado com sucesso! Redirecionando para o login...");
      navigate("/");
    });
  };


  const handleaddValues = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [value.target.name]: value.target.value,
    }));
  };


  return (
    <div className="container">
      <form onSubmit={handleClickRegister}>
        <h1>BioUrb</h1>
        <div className="input-field">
          <input
            type="text"
            placeholder="Nome"
            required
            id="name"
            name="name"
            value={values.name}
            onChange={handleaddValues}
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            placeholder="E-mail"
            required
            id="email"
            name="email"
            value={values.email}
            onChange={handleaddValues}
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            placeholder="CPF"
            required
            id="cpf"
            name="cpf"
            value={values.cpf}
            onChange={handleCPFChange}
            maxLength={14}
          />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            required
            id="password"
            name="password"
            value={values.password}
            onChange={handleaddValues}
          />
        </div>
        <button type="submit">Registrar</button>
        <div className="signup-link">
          <p>
            Já tem uma conta? <a href="/">Entrar</a>{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import Axios from "axios";
import "./Login.css";

const Login = () => {
  // Estados para armazenar as entradas do usuário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Função que é chamada quando o formulário é enviado
  const handleSubmit = (event) => {
    // Impede que a página seja recarregada
    event.preventDefault();

    // Faz o console log das credenciais do usuário
    console.log("Dados de Login:", { email, password });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>BioUrb</h1>
        <div className="input-field">
          <input
            type="text"
            placeholder="E-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>
        <button type="submit">Login</button>
        <div className="signup-link">
          <p>
            Não tem uma conta? <a href="/register">Registar</a>{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
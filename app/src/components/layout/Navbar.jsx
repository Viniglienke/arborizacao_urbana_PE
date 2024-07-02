import { Link } from "react-router-dom";
import Container from "./Container";

import styles from "./Navbar.module.css";
import logo from "../../img/logo.png";

function Navbar() {
  return (
    <div className={styles.navbar}>
        <Link to="/">
          <img src={logo} alt="BioUrb" className={styles.logo} />
        </Link>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/">Início</Link>
          </li>
          <li className={styles.item}>
            <Link to="/login">Login</Link>
          </li>
          <li className={styles.item}>
            <Link to="/areas">Áreas</Link>
          </li>
          <li className={styles.item}>
            <Link to="/trees">Árvores</Link>
          </li>
          <li className={styles.item}>
            <Link to="/monitoring">Monitoramento</Link>
          </li>
          <li className={styles.item}>
            <Link to="/contact">Contato</Link>
          </li>
        </ul>
    </div>
  );
}

export default Navbar;
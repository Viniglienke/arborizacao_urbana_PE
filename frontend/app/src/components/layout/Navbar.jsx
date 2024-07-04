import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Navbar.module.css";
import logo from "../../img/logo.png";

function Navbar() {
  const { signed, signOut } = useContext(AuthContext);

  return (
    <div className={styles.navbar}>
      <Link to="/home">
        <img src={logo} alt="BioUrb" className={styles.logo} />
      </Link>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link to="/home">Início</Link>
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
        {signed ? (
          <li className={styles.item}>
            <button className={styles.button} onClick={signOut}>Logout</button>
          </li>
        ) : (
          <li className={styles.item}>
            <Link to="/">Login</Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;

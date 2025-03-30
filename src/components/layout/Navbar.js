import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Container from "./Container";
import logo from "../../img/logo.ico";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Container>
        <Link to="/">
          <img src={logo} alt="Confin" />
        </Link>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className={styles.item}>
            <Link to="/transactions">Transações</Link>
          </li>
          <li className={styles.item}>
            <Link to="/categories">Categorias</Link>
          </li>
          <li className={styles.item}>
            <Link to="/configurations">Configurações</Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
}

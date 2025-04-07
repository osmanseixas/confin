import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import Container from "./Container";
import logo from "../../img/logo.ico";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Container>
        <div className={styles.logo}>
          <NavLink to="/">
            <img className={styles.item} src={logo} alt="Confin" />
          </NavLink>
          <span className={styles.titulo}>CONFIN</span>
        </div>
        <ul className={styles.list}>
          <li className={styles.item}>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? `${styles.active}` : "")}
            >
              Início
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? `${styles.active}` : "")}
            >
              Dashboard
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink
              to="/transactions"
              className={({ isActive }) => (isActive ? `${styles.active}` : "")}
            >
              Transações
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink
              to="/categories"
              className={({ isActive }) => (isActive ? `${styles.active}` : "")}
            >
              Categorias
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink
              to="/configurations"
              className={({ isActive }) => (isActive ? `${styles.active}` : "")}
            >
              Configurações
            </NavLink>
          </li>
        </ul>
      </Container>
    </nav>
  );
}

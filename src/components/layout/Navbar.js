import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import Container from "./Container";
import { TbPigMoney } from "react-icons/tb";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Container>
        <div className={styles.logo}>
          <NavLink to="/">
          <TbPigMoney />
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
      <ThemeToggle />
    </nav>
  );
}

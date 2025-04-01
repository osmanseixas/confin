import LinkButton from "../layout/LinkButton";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className="mainContainer min-height-75">
      <section className={styles.home_container}>
        <h1>
          Bem-vindo ao <span>CONFIN</span>
        </h1>
        <p>Tenha uma vida financeira previsível e sob controle.</p>
        <div className={styles.container}>
          <LinkButton to="/dashboard" text="Ver saldo das contas" />
          <LinkButton to="/newincome" text="Criar Receita" />
          <LinkButton to="/transactions" text="Criar Despesa" />
        </div>
      </section>
    </div>
  );
}

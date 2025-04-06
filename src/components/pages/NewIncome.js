import NewTransaction from "./transaction/newTransaction";
import styles from "./NewIncome.module.css";

export default function NewIncome() {
    return (
        <div className={styles.newincome_container}>
            <h1>Receita</h1>
            <p>Crie uma nova entrada de receita</p>
            <NewTransaction type="receita" text="Cadastrar"/>
        </div>
    );
}
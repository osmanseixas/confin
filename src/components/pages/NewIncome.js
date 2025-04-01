import TransactionForm from "../transaction/TransactionForm";
import styles from "./NewIncome.module.css";

export default function NewIncome() {
    return (
        <div className={styles.newincome_container}>
            <h1>Receita</h1>
            <p>Crie uma nova entrada de receita</p>
            <TransactionForm type="receita" text="Cadastrar"/>
        </div>
    );
}
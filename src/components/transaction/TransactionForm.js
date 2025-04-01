import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
import styles from "./TransactionForm.module.css";

export default function TransactionForm({ type, text }) {
  return (
    <form className={styles.form}>
      <Input text="Identificação" type="text" name="identificacao" />
      <Input text="Valor" type="number" name="valor" />
      <Select text="Categoria" name="categoria" />
      <SubmitButton text={text} />
    </form>
  );
}

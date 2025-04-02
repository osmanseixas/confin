import { useEffect, useState } from "react";
import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
import styles from "./TransactionForm.module.css";

export default function TransactionForm({ type, text }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, [])

  return (
    <form className={styles.form}>
      <Input text="Identificação" type="text" name="identificacao" />
      <Input text="Valor" type="number" name="valor" />
      <Select text="Categoria" name="categoria" options={categories} />
      <SubmitButton text={text} />
    </form>
  );
}

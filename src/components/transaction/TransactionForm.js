import { useEffect, useState } from "react";
import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
import styles from "./TransactionForm.module.css";
import Calculator from "../calculator/Calculator";

export default function TransactionForm({ type, text }) {
  const [categories, setCategories] = useState([]);
  const [showCalculator, setShowCalculator] = useState(false);

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
  }, []);

  return (
    <>
      <form className={styles.form}>
        <Input text="Identificação" type="text" name="identificacao" />
        <Input
          text="Valor"
          type="text"
          name="valor"
          handleOnFocus={() => setShowCalculator(true)}
          readonly={true}
        />
        <Select text="Categoria" name="categoria" options={categories} />
        <SubmitButton text={text} />
      </form>
      {showCalculator && (
        <Calculator onClose={() => setShowCalculator(false)} />
      )}
    </>
  );
}

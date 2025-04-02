import styles from "./Select.module.css";

export default function Select({ text, name, options, handleOnChange, value }) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <select name={name} id={name}>
        <option></option>
        {options.map((option) => (
          <option value={option.id} key={option.id}>
            {option.descricao}
          </option>
        ))}
      </select>
    </div>
  );
}

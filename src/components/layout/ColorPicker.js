import React from "react";
import styles from "./ColorPicker.module.css";

export default function ColorPicker({ value, onChange, label = "Cor" }) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>{label}:</span>
      <input
        type="color"
        value={value}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  );
}

import styles from "./DisplayCalculator.module.css";

export default function DisplayCalculator({ text }) {
  return (
    <div>
      <input className={styles.display_calculator} value={text} readOnly />
    </div>
  );
}

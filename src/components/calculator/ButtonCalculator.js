import styles from "./ButtonCalculator.module.css";
import { FaDivide } from "react-icons/fa6";


export default function ButtonCalculator({ input, inputFunction }) {
  let inputClass = styles['button_calc'];
  if(input === '+' || input === '-' || input === '*' || input === '/' || input === '=') {
    inputClass += " "+styles['operator_calc'];
  }
  let label = input;
  if(input === '*') {
    label = 'x';
  } else if(input === '/') {
    label = <FaDivide />;
  }
  return <button className={inputClass} onClick={(e) => inputFunction({input})}>{label}</button>;
}

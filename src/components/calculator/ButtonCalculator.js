import styles from "./ButtonCalculator.module.css";
import { FaPlus, FaMinus, FaX, FaDivide, FaEquals } from "react-icons/fa6";


export default function ButtonCalculator({ input, inputFunction }) {
  let inputClass = styles['button_calc'];
  if(input === '+' || input === '-' || input === '*' || input === '/' || input === '=') {
    inputClass += " "+styles['operator_calc'];
  }
  let label = input;
  if(input === '+') {
    label = <FaPlus />;
  } else if(input === '-') {
    label = <FaMinus />;
  } else if(input === '*') {
    label = <FaX />;
  } else if(input === '/') {
    label = <FaDivide />;
  } else if(input === '=') {
    label = <FaEquals />;
  }
  return <button className={inputClass} onClick={(e) => inputFunction({input})}>{label}</button>;
}

import { useState } from "react";
import ButtonCalculator from "./ButtonCalculator";
import { formatarNumero } from "../../utils/Format";
import styles from "./Calculator.module.css";
import DisplayCalculator from "./DisplayCalculator";
import { IoMdClose } from "react-icons/io";


export default function Calculator({ onClose }) {
  const [displayContent, setDisplayContent] = useState("1.234,59");

  function appendToDisplay({ input }) {
    setDisplayContent(displayContent + input);
  }

  function cleanDisplay() {
    setDisplayContent("");
  }

  function calculate() {
    try {
      // eslint-disable-next-line
      let result = eval(displayContent);
      result = formatarNumero(result);
      setDisplayContent(result);
    } catch (error) {
      console.log(error);
      setDisplayContent("Error");
    }
  }

  return (
    <div className={styles.calculator}>
      <div className={styles.topo_calc}>
        <DisplayCalculator
          className={styles.display_calc}
          text={displayContent}
        />
        <button className={styles.botao_fechar_calc} onClick={() => onClose()}><IoMdClose /></button>
      </div>
      <div className={styles.botoes_calc}>
        <p></p>
        <p></p>
        <p></p>
        <ButtonCalculator input="C" inputFunction={cleanDisplay} />
        <ButtonCalculator input="1" inputFunction={appendToDisplay} />
        <ButtonCalculator input="2" inputFunction={appendToDisplay} />
        <ButtonCalculator input="3" inputFunction={appendToDisplay} />
        <ButtonCalculator input="+" inputFunction={appendToDisplay} />
        <ButtonCalculator input="4" inputFunction={appendToDisplay} />
        <ButtonCalculator input="5" inputFunction={appendToDisplay} />
        <ButtonCalculator input="6" inputFunction={appendToDisplay} />
        <ButtonCalculator input="-" inputFunction={appendToDisplay} />
        <ButtonCalculator input="7" inputFunction={appendToDisplay} />
        <ButtonCalculator input="8" inputFunction={appendToDisplay} />
        <ButtonCalculator input="9" inputFunction={appendToDisplay} />
        <ButtonCalculator input="*" inputFunction={appendToDisplay} />
        <ButtonCalculator input="." inputFunction={appendToDisplay} />
        <ButtonCalculator input="0" inputFunction={appendToDisplay} />
        <ButtonCalculator input="=" inputFunction={calculate} />
        <ButtonCalculator input="/" inputFunction={appendToDisplay} />
      </div>
    </div>
  );
}

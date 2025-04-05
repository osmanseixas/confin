import { useState, useEffect, useCallback } from "react";
import ButtonCalculator from "./ButtonCalculator";
import styles from "./Calculator.module.css";
import DisplayCalculator from "./DisplayCalculator";
import { IoMdClose } from "react-icons/io";

export default function Calculator({ onClose }) {
  const [displayContent, setDisplayContent] = useState("");

  const appendToDisplay = useCallback(
    (input) => {
      if (isValidInput(displayContent, input)) {
        setDisplayContent((prev) => prev + input);
      }
    },
    [displayContent]
  );

  const handleBackspace = useCallback(() => {
    setDisplayContent((prev) => prev.slice(0, -1));
  }, []);

  const cleanDisplay = useCallback(() => {
    setDisplayContent("");
  }, []);

  const calculate = useCallback(() => {
    try {
      // eslint-disable-next-line
      setDisplayContent("" + eval(displayContent));
    } catch (error) {
      console.log(error);
      setDisplayContent("Error");
    }
  }, [displayContent]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const allowedKeys = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        ".",
        "+",
        "-",
        "*",
        "/",
        "Enter",
        "Backspace",
      ];
      const key = event.key;

      if (!allowedKeys.includes(key)) return;

      // Efeito visual
      const button = document.querySelector(`[data-key="${key}"]`);
      if (button) {
        button.classList.add(styles.keyActive);
        setTimeout(() => button.classList.remove(styles.keyActive), 100);
      }

      // Ações
      if (key === "Enter") {
        calculate();
      } else if (key === "Backspace") {
        handleBackspace();
      } else {
        appendToDisplay(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [appendToDisplay, calculate, handleBackspace]);

  function isValidInput(currentDisplay, newInput) {
    const operators = ["+", "-", "*", "/"];
    const lastChar = currentDisplay.slice(-1);

    // Evita dois pontos seguidos
    if (newInput === "." && lastChar === ".") return false;

    // Evita dois operadores seguidos (ex: ++, */)
    if (operators.includes(newInput) && operators.includes(lastChar))
      return false;

    // Evita começar com um operador (exceto "-")
    if (
      currentDisplay === "" &&
      operators.includes(newInput) &&
      newInput !== "-"
    )
      return false;

    // Evita mais de um ponto no mesmo número
    if (newInput === ".") {
      const parts = currentDisplay.split(/[+\-*/]/);
      const lastPart = parts[parts.length - 1];
      if (lastPart.includes(".")) return false;
    }

    return true;
  }

  return (
    <div className={styles.calculator}>
      <div className={styles.topo_calc}>
        <DisplayCalculator
          className={styles.display_calc}
          text={displayContent}
        />
        <button className={styles.botao_fechar_calc} onClick={() => onClose()}>
          <IoMdClose />
        </button>
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

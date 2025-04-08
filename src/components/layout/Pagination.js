import React from "react";
import useWindowWidth from "../../hooks/useWindowWidth";
import styles from "./Pagination.module.css";

export default function Pagination({
  paginaAtual,
  totalPaginas,
  onPaginaChange,
  maxPaginasVisiveis: propMaxPaginasVisiveis,
}) {
  const windowWidth = useWindowWidth();

  const maxPaginasVisiveis =
    propMaxPaginasVisiveis ??
    (windowWidth >= 1024 ? 10 : windowWidth >= 640 ? 7 : 4);

  const gerarPaginas = () => {
    const paginas = [];

    let inicio = Math.max(1, paginaAtual - Math.floor(maxPaginasVisiveis / 2));
    let fim = inicio + maxPaginasVisiveis - 1;

    if (fim > totalPaginas) {
      fim = totalPaginas;
      inicio = Math.max(1, fim - maxPaginasVisiveis + 1);
    }

    for (let i = inicio; i <= fim; i++) {
      paginas.push(i);
    }

    return paginas;
  };
  return (
    <div className={styles.container}>
      <button
        onClick={() => onPaginaChange(1)}
        disabled={paginaAtual === 1}
        className={styles.button}
      >
        ⏮️
      </button>

      <button
        onClick={() => onPaginaChange(paginaAtual - 1)}
        disabled={paginaAtual === 1}
        className={styles.button}
      >
        ←
      </button>

      {gerarPaginas().map((numero) => (
        <button
          key={numero}
          onClick={() => onPaginaChange(numero)}
          className={`${styles.button} ${
            paginaAtual === numero ? styles.active : ""
          }`}
        >
          {numero}
        </button>
      ))}

      <button
        onClick={() => onPaginaChange(paginaAtual + 1)}
        disabled={paginaAtual === totalPaginas}
        className={styles.button}
      >
        →
      </button>

      <button
        onClick={() => onPaginaChange(totalPaginas)}
        disabled={paginaAtual === totalPaginas}
        className={styles.button}
      >
        ⏭️
      </button>
    </div>
  );
}

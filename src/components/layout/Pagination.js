import React from "react";
import useWindowWidth from "../../hooks/useWindowWidth";
import styles from "./Pagination.module.css";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";

export default function Pagination({
  paginaAtual,
  totalPaginas,
  onPaginaChange,
  totalItens,
  itensPorPagina,
  maxPaginasVisiveis: propMaxPaginasVisiveis,
}) {
  const windowWidth = useWindowWidth();

  const maxPaginasVisiveis =
    propMaxPaginasVisiveis ??
    (windowWidth >= 1024 ? 10 : windowWidth >= 640 ? 7 : 4);

  let primeiroItem = (paginaAtual - 1) * itensPorPagina + 1;
  let ultimoItem = Math.min(paginaAtual * itensPorPagina, totalItens);

  if (ultimoItem === 0) {
    primeiroItem = 0;
  }

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
    <>
      <div className={styles.statusText}>
        Exibindo itens <strong>{primeiroItem}</strong>–
        <strong>{ultimoItem}</strong> de <strong>{totalItens}</strong>
      </div>
      <div className={styles.container}>
        <button
          onClick={() => onPaginaChange(1)}
          disabled={paginaAtual === 1}
          className={styles.button}
        >
          <TbPlayerTrackPrev />
        </button>

        <button
          onClick={() => onPaginaChange(paginaAtual - 1)}
          disabled={paginaAtual === 1}
          className={styles.button}
        >
          <GrCaretPrevious />
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
          <GrCaretNext />
        </button>

        <button
          onClick={() => onPaginaChange(totalPaginas)}
          disabled={paginaAtual === totalPaginas}
          className={styles.button}
        >
          <TbPlayerTrackNext />
        </button>
      </div>
    </>
  );
}

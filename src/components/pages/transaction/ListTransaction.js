import React, { useState, useEffect, useMemo } from "react";
import { getTransacoes } from "../../../services/TransactionService";
import { formatCurrency } from "../../../utils/Format";
import styles from "./ListTransaction.module.css";
import Pagination from "../../layout/Pagination";
import { TbArrowNarrowDown, TbArrowNarrowUp } from "react-icons/tb";

export default function ListTransaction() {
  const [filtro, setFiltro] = useState({
    data: "",
    descricao: "",
    conta: "",
    categoria: "",
    valor: "",
  });
  const [transactions, setTransactions] = useState([]);
  const [erro, setErro] = useState("");
  const [ordem, setOrdem] = useState("");
  const [ascendente, setAscendente] = useState(true);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 20;

  useEffect(() => {
    async function carregarDados() {
      try {
        const transacoes = await getTransacoes();
        setTransactions(transacoes);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setErro(err.message);
      }
    }

    carregarDados();
  }, []);

  const dadosFiltrados = useMemo(() => {
    let resultado = [...transactions];

    // Filtro
    resultado = resultado.filter((item) =>
      Object.entries(filtro).every(([chave, valor]) =>
        valor === ""
          ? true
          : String(item[chave]).toLowerCase().includes(valor.toLowerCase())
      )
    );

    // Ordenação
    if (ordem) {
      resultado.sort((a, b) => {
        const valorA = a[ordem];
        const valorB = b[ordem];
        if (valorA < valorB) return ascendente ? -1 : 1;
        if (valorA > valorB) return ascendente ? 1 : -1;
        return 0;
      });
    }

    return resultado;
  }, [transactions, filtro, ordem, ascendente]);

  const totalPaginas = Math.ceil(dadosFiltrados.length / itensPorPagina);
  const dadosPaginados = dadosFiltrados.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  const alternarOrdem = (campo) => {
    if (ordem === campo) {
      setAscendente(!ascendente);
    } else {
      setOrdem(campo);
      setAscendente(true);
    }
  };

  return (
    <div className={styles.container}>
      {erro ? (
        <p className="text-red-500">{erro}</p>
      ) : (
        <div className={styles.box}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                {["data", "descricao", "conta", "categoria", "valor"].map(
                  (campo) => (
                    <th
                      key={campo}
                      className={styles.th}
                      onClick={() => alternarOrdem(campo)}
                    >
                      {campo.toUpperCase()}
                      {ordem === campo &&
                        (ascendente ? (
                          <TbArrowNarrowUp />
                        ) : (
                          <TbArrowNarrowDown />
                        ))}
                    </th>
                  )
                )}
              </tr>
              <tr className={styles.filterRow}>
                {["data", "descricao", "conta", "categoria", "valor"].map(
                  (campo) => (
                    <td key={campo} className="px-4 py-2">
                      <input
                        type="text"
                        placeholder={`Filtrar ${campo}`}
                        className={styles.filterInput}
                        value={filtro[campo]}
                        onChange={(e) =>
                          setFiltro({ ...filtro, [campo]: e.target.value })
                        }
                      />
                    </td>
                  )
                )}
              </tr>
            </thead>
            <tbody className={styles.fadeEnter}>
              {dadosPaginados.map((item, index) => (
                <tr key={index} className={styles.row}>
                  <td className={styles.td}>{item.data}</td>
                  <td className={styles.td}>{item.descricao}</td>
                  <td className={styles.td}>{item.conta}</td>
                  <td className={styles.td}>{item.categoria}</td>
                  <td className={`${styles.td} ${styles.valor}`}>
                    {formatCurrency(item.valor)}
                  </td>
                </tr>
              ))}

              {/* Preenche com linhas em branco para manter o espaço fixo */}
              {Array.from({
                length: itensPorPagina - dadosPaginados.length,
              }).map((_, i) => (
                <tr key={`blank-${i}`} className={styles.rowBlank}>
                  <td className={styles.td}>&nbsp;</td>
                  <td className={styles.td}>&nbsp;</td>
                  <td className={styles.td}>&nbsp;</td>
                  <td className={styles.td}>&nbsp;</td>
                  <td className={`${styles.td} ${styles.valor}`}>&nbsp;</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            totalItens={dadosFiltrados.length}
            itensPorPagina={itensPorPagina}
            onPaginaChange={setPaginaAtual}
          />
        </div>
      )}
    </div>
  );
}

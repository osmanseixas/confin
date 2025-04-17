import React, { useState, useMemo } from "react";
import { TbArrowNarrowDown, TbArrowNarrowUp } from "react-icons/tb";
import Pagination from "../layout/Pagination";
import styles from "./DataTable.module.css";
import { compareFilter, getComparableValue } from "../../utils/Format";
import DatePartsFilter from "./DatePartsFilter";

export default function DataTable({
  columns,
  data,
  itemsPerPage = 20,
  getRowId = (_, index) => index,
  showFilters = true,
  enablePagination = true,
}) {
  const [filtro, setFiltro] = useState({});
  const [ordem, setOrdem] = useState("");
  const [ascendente, setAscendente] = useState(true);
  const [paginaAtual, setPaginaAtual] = useState(1);

  const dadosFiltrados = useMemo(() => {
    let resultado = [...data];

    // Filtro
    resultado = resultado.filter((item) =>
      Object.entries(filtro).every(([chave, valor]) => {
        const coluna = columns.find((col) => col.field === chave);
        const tipo = coluna?.filterType || "text";
        return compareFilter(item[chave], valor, tipo);
      })
    );

    // Ordenação
    if (ordem) {
      const col = columns.find((c) => c.field === ordem);
      const tipo = col?.sortType || col?.filterType || "text";

      resultado.sort((a, b) => {
        const valorA = getComparableValue(a[ordem], tipo);
        const valorB = getComparableValue(b[ordem], tipo);

        if (valorA < valorB) return ascendente ? -1 : 1;
        if (valorA > valorB) return ascendente ? 1 : -1;
        return 0;
      });
    }

    return resultado;
  }, [data, columns, filtro, ordem, ascendente]);

  const totalPaginas = Math.ceil(dadosFiltrados.length / itemsPerPage);
  const dadosPaginados = enablePagination
    ? dadosFiltrados.slice(
        (paginaAtual - 1) * itemsPerPage,
        paginaAtual * itemsPerPage
      )
    : dadosFiltrados;

  const alternarOrdem = (campo) => {
    if (ordem === campo) {
      setAscendente(!ascendente);
    } else {
      setOrdem(campo);
      setAscendente(true);
    }
  };

  const renderFiltro = (col) => {
    const { field, label, filterType = "text", options = [] } = col;

    switch (filterType) {
      case "select":
        return (
          <select
            className={styles.filterInput}
            value={filtro[field] || ""}
            onChange={(e) => setFiltro({ ...filtro, [field]: e.target.value })}
          >
            <option value="">Todos</option>
            {options.map((op, idx) => (
              <option key={idx} value={op}>
                {op}
              </option>
            ))}
          </select>
        );
        case "date":
            const anosUnicos = [...new Set(data.map((d) => d[col.field]?.split("/")[2]))].filter(Boolean).sort();
            return (
              <DatePartsFilter
                value={filtro[field] || {}}
                anosDisponiveis={anosUnicos}
                onChange={(val) => setFiltro({ ...filtro, [field]: val })}
              />
            );
      default:
        return (
          <input
            type="text"
            placeholder={`Filtrar ${label}`}
            className={styles.filterInput}
            value={filtro[field] || ""}
            onChange={(e) => setFiltro({ ...filtro, [field]: e.target.value })}
          />
        );
    }
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {columns.map((col) => (
              <th
                key={col.field}
                className={styles.th}
                onClick={() =>
                  col.sortable !== false && alternarOrdem(col.field)
                }
              >
                {col.label}
                {ordem === col.field &&
                  (ascendente ? <TbArrowNarrowUp /> : <TbArrowNarrowDown />)}
              </th>
            ))}
          </tr>
          {showFilters && (
            <tr className={styles.filterRow}>
              {columns.map((col) => (
                <td key={col.field}>
                  {col.filterable !== false && renderFiltro(col)}
                </td>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {dadosPaginados.map((item, index) => (
            <tr key={getRowId(item, index)} className={styles.row}>
              {columns.map((col) => (
                <td key={col.field} className={styles.td}>
                  {col.render
                    ? col.render(item[col.field], item)
                    : item[col.field]}
                </td>
              ))}
            </tr>
          ))}

          {/* Preenche com linhas em branco para manter o espaço fixo */}
          {enablePagination &&
            Array.from({
              length: itemsPerPage - dadosPaginados.length,
            }).map((_, i) => (
              <tr key={`blank-${i}`} className={styles.rowBlank}>
                {columns.map((col) => (
                  <td key={col.field} className={styles.td}>
                    &nbsp;
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>

      {enablePagination && (
        <Pagination
          paginaAtual={paginaAtual}
          totalPaginas={totalPaginas}
          totalItens={dadosFiltrados.length}
          itensPorPagina={itemsPerPage}
          onPaginaChange={setPaginaAtual}
        />
      )}
    </div>
  );
}

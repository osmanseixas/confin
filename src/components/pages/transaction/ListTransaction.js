import React, { useState, useEffect, useMemo } from "react";
import { getTransacoes } from "../../../services/TransactionService";
import { formatCurrency } from "../../../utils/Format";

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
    <div className="max-w-6xl mx-auto mt-10 px-4">
      {erro ? (
        <p className="text-red-500">{erro}</p>
      ) : (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 rounded-t-xl">
              <tr>
                {["data", "descricao", "conta", "categoria", "valor"].map(
                  (campo) => (
                    <th
                      key={campo}
                      className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase cursor-pointer hover:text-blue-600 transition"
                      onClick={() => alternarOrdem(campo)}
                    >
                      {campo.toUpperCase()}
                      {ordem === campo && (ascendente ? " ▲" : " ▼")}
                    </th>
                  )
                )}
              </tr>
              <tr className="bg-white border-t border-gray-200">
                {["data", "descricao", "conta", "categoria", "valor"].map(
                  (campo) => (
                    <td key={campo} className="px-4 py-2">
                      <input
                        type="text"
                        placeholder={`Filtrar ${campo}`}
                        className="w-full px-2 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
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
            <tbody>
              {dadosPaginados.map((item, index) => (
                <tr
                  key={index}
                  className="text-sm text-gray-700 border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2">{item.data}</td>
                  <td className="px-4 py-2">{item.descricao}</td>
                  <td className="px-4 py-2">{item.conta}</td>
                  <td className="px-4 py-2">{item.categoria}</td>
                  <td className="px-4 py-2 font-medium text-right">
                    {formatCurrency(item.valor)}
                  </td>
                </tr>
              ))}
              {dadosPaginados.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    Nenhum resultado encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Paginação */}
          <div className="mt-6 flex justify-between items-center">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-xl disabled:opacity-40 hover:bg-blue-600 transition"
              disabled={paginaAtual === 1}
              onClick={() => setPaginaAtual((p) => p - 1)}
            >
              ← Anterior
            </button>
            <span className="text-sm text-gray-600">
              Página <strong>{paginaAtual}</strong> de{" "}
              <strong>{totalPaginas}</strong>
            </span>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-xl disabled:opacity-40 hover:bg-blue-600 transition"
              disabled={paginaAtual === totalPaginas}
              onClick={() => setPaginaAtual((p) => p + 1)}
            >
              Próxima →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

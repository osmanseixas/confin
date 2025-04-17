import React, { useState, useEffect } from "react";
import { getTransacoes } from "../../../services/TransactionService";
import { formatCurrency } from "../../../utils/Format";
import DataTable from "../../layout/DataTable";

export default function ListTransaction() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const transacoes = await getTransacoes();
        setTransactions(transacoes);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    }

    carregarDados();
  }, []);

  return (
    <DataTable
      data={transactions}
      itemsPerPage={25}
      showFilters={true}
      enablePagination={false}
      getRowId={(item) => item.id}
      columns={[
        { field: "data", label: "Data", filterType: "date", sortType: "date" },
        { field: "descricao", label: "Descrição" },
        {
          field: "conta",
          label: "Conta",
          filterType: "select",
          options: ["Bradesco", "Caixa", "Investimento", "Carteira"],
        },
        {
          field: "categoria",
          label: "Categoria",
          filterType: "select",
          options: ["Alimentação", "Saúde", "Transporte"],
        },
        {
          field: "valor",
          label: "Valor",
          sortType: "currency",
          render: (valor) => <span>{formatCurrency(valor)}</span>,
        },
      ]}
    />
  );
}

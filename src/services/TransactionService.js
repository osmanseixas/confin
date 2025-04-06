const API_URL = "http://localhost:3001/transactions";

export const getTransacoes = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Erro ao buscar transações");
  }
  return response.json();
};
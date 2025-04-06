const API_URL = "http://localhost:3001/categories";

export const getCategorias = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Erro ao buscar categorias");
  }
  return response.json();
};
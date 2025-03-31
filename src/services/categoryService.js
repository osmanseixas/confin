import { categoriesMock } from "../data/mockData";

export const getCategories = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(categoriesMock); // Simula um tempo de resposta da API
    }, 1000);
  });
};
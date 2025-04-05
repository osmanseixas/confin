// ✅ Formatar número para moeda
export const formatCurrency = (value, locale = "pt-BR", currency = "BRL") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

// ✅ Formatar string number para número baseado no locale
export function formatarNumero(valorString, locale = "pt-BR") {
  const numero = parseFloat(valorString);

  if (isNaN(numero)) return "Valor inválido";

  return numero.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// ✅ Formatar data para padrão dd/mm/yyyy
export const formatDate = (dateString) => {
  const [, year, month, day] = dateString.match(/(\d{4})(\d{2})(\d{2})/);
  return `${day}/${month}/${year}`;
};

// ✅ Converter string para número (removendo caracteres não numéricos)
export const parseCurrency = (value) => {
  return parseFloat(value.replace(/[^0-9,-]+/g, "").replace(",", "."));
};

// ✅ Calcular total de um array de valores
export const calculateTotal = (items, key) => {
  return items.reduce((acc, item) => acc + item[key], 0);
};

// ✅ Verificar se um valor é positivo ou negativo (para estilos dinâmicos)
export const getAmountColor = (amount) => {
  return amount < 0 ? "red" : "green";
};

// ✅ Gerar um ID único (útil para listas dinâmicas)
export const generateId = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

// ✅ Arredondar valores para duas casas decimais
export const roundValue = (value, decimals = 2) => {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
};

// ✅ Ordenar array de objetos por uma propriedade específica
export const sortByKey = (array, key, order = "asc") => {
  return [...array].sort((a, b) =>
    order === "asc" ? a[key] - b[key] : b[key] - a[key]
  );
};

// ✅ Filtrar transações por categoria
export const filterByCategory = (transactions, category) => {
  return transactions.filter((t) => t.category === category);
};

// ✅ Formatar números grandes (ex: 1000 => "1K", 1000000 => "1M")
export const formatLargeNumber = (num) => {
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
  return num.toString();
};

// ✅ Capitalizar a primeira letra de uma string
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// ✅ Gerar um número aleatório dentro de um intervalo
export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

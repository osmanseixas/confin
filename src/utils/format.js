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

export const getComparableValue = (value, type = "text") => {
  if (value == null) return "";

  switch (type) {
    case "date": {
      // Converte dd/mm/yyyy para yyyy-mm-dd
      const [d, m, y] = value.split("/");
      return new Date(`${y}-${m}-${d}`);
    }
    case "currency": {
      // Remove R$, pontos e vírgulas (BRL)
      const cleaned = value.replace(/[^\d,-]+/g, "").replace(".", "").replace(",", ".");
      return parseFloat(cleaned) || 0;
    }
    case "text":
    default:
      return value
        .toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""); // remove acentos
  }
};

export const compareFilter = (valorItem, filtroValor, tipo = "text") => {
  if (!filtroValor) return true; // sem filtro → passa

  if (valorItem == null) return false;

  switch (tipo) {
    case "select":
      return String(valorItem) === filtroValor;

      case "date": {
        console.log("valorItem:"+valorItem);
        if (!valorItem || typeof valorItem !== "string" || !valorItem.includes("/")) return false;
        const [dia, mes, ano] = valorItem.split("/");
        const { dia: fdia, mes: fmes, ano: fano } = filtroValor;
        console.log("filtroValor:"+filtroValor);
  
        if (fdia && fdia !== dia) return false;
        if (fmes && fmes !== mes) return false;
        if (fano && fano !== ano) return false;
        return true;
      }     

    case "currency":
      const valorNumerico = parseFloat(
        valorItem.replace(/[^\d,-]+/g, "").replace(".", "").replace(",", ".")
      );
      const filtroNumerico = parseFloat(filtroValor.replace(",", "."));
      return valorNumerico === filtroNumerico;

    case "text":
    default:
      const normalizar = (str) =>
        str
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
      return normalizar(String(valorItem)).includes(normalizar(filtroValor));
  }
};

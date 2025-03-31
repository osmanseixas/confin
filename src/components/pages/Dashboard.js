import BarChartComponent from "../layout/BarChartComponent";
import Card from "../layout/Card";
import PieChartComponent from "../layout/PieChartComponent";
import TransactionsTable from "../layout/TransactionsTable";

export default function Dashboard() {
  return (
    <div className="mainContainer">
    <Card titulo="Saldo" valor={2000} corFundo="gold" corLetra="black" />
    <Card titulo="Receitas" valor={3000.5} corFundo="green" corLetra="white" />
    <Card titulo="Despesas" valor={4500.87} corFundo="red" corLetra="white" />
    <PieChartComponent />
    <BarChartComponent />
    <TransactionsTable />
    </div>
  );
}

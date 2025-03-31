import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { month: "Jan", amount: 2000 },
  { month: "Fev", amount: 2500 },
  { month: "Mar", amount: 1800 }
];

export default function BarChartComponent() {
  return (
    <BarChart width={400} height={250} data={data}>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="amount" fill="#8884d8" />
    </BarChart>
  );
}
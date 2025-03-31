import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Habitação", value: 1200 },
  { name: "Alimentação", value: 300 },
  { name: "Transporte", value: 150 }
];

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"];

export default function PieChartComponent() {
  return (
    <PieChart width={300} height={300}>
      <Pie data={data} dataKey="value" outerRadius={100} fill="#8884d8">
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
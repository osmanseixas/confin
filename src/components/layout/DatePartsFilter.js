import React from "react";

export default function DatePartsFilter({ value = {}, onChange, anosDisponiveis = [] }) {
  const dias = Array.from({ length: 31 }, (_, i) => i + 1);
  const meses = [
    { value: "01", label: "Jan" },
    { value: "02", label: "Fev" },
    { value: "03", label: "Mar" },
    { value: "04", label: "Abr" },
    { value: "05", label: "Mai" },
    { value: "06", label: "Jun" },
    { value: "07", label: "Jul" },
    { value: "08", label: "Ago" },
    { value: "09", label: "Set" },
    { value: "10", label: "Out" },
    { value: "11", label: "Nov" },
    { value: "12", label: "Dez" },
  ];

  return (
    <div className="flex gap-1 items-center">
      <select
        className="border rounded px-1 py-0.5 text-sm"
        value={value.dia || ""}
        onChange={(e) => onChange({ ...value, dia: e.target.value })}
      >
        <option value="">Dia</option>
        {dias.map((d) => (
          <option key={d} value={String(d).padStart(2, "0")}>
            {d}
          </option>
        ))}
      </select>

      <select
        className="border rounded px-1 py-0.5 text-sm"
        value={value.mes || ""}
        onChange={(e) => onChange({ ...value, mes: e.target.value })}
      >
        <option value="">Mês</option>
        {meses.map((m) => (
          <option key={m.value} value={m.value}>
            {m.label}
          </option>
        ))}
      </select>

      <select
        className="border rounded px-1 py-0.5 text-sm"
        value={value.ano || ""}
        onChange={(e) => onChange({ ...value, ano: e.target.value })}
      >
        <option value="">Ano</option>
        {anosDisponiveis.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>
    </div>
  );
}

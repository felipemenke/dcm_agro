import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const formatNumber = value =>
  Number.isFinite(value)
    ? value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : "—";

export default function TresTentosChart({ data }) {
  if (!data || data.length === 0) {
    return <p>Sem dados</p>;
  }

  return (
    <div style={{ width: "100%", height: 400, fontFamily: "Montserrat, sans-serif" }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="quarter" />
          <YAxis tickFormatter={formatNumber} />
          <Tooltip
            formatter={(value, name) => [formatNumber(value), name]}
            labelFormatter={label => label}
          />
          <Legend />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#1f3c88"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="ebitda"
            stroke="#4caf50"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="net_debt"
            stroke="#d32f2f"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

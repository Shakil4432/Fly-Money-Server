"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type BarChartData = {
  totalOrders: number;
  year: number;
  month: number;
};

interface Props {
  data: BarChartData[];
}

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function OrdersBarChart({ data }: Props) {
  // transform backend data into chart friendly format
  const chartData = data.map((item) => ({
    name: `${monthNames[item.month - 1]}`,
    orders: item.totalOrders,
  }));

  return (
    <div className="w-full h-[420px]   p-5 border ">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">📊 Monthly Orders</h2>
        <span className="text-sm text-gray-500">Year {data[0]?.year}</span>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 14 }} />
          <YAxis tick={{ fill: "#6b7280", fontSize: 14 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              borderRadius: "12px",

              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          />
          <Bar
            dataKey="orders"
            fill="#7c3f00"
            radius={[12, 12, 0, 0]}
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

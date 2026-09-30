"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";

interface DonutChartProps {
  data: { name: string; value: number; color?: string }[];
  className?: string;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
}

export function DonutChart({
  data,
  className,
  height = 200,
  innerRadius = 60,
  outerRadius = 90,
}: DonutChartProps) {
  const COLORS = ["#55a1ff", "#35d3f2", "#f472b6", "#4ade80", "#fbbf24", "#fb7185", "#a78bfa", "#38bdf8"];

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={data[index].color || COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            // @ts-ignore
            contentStyle={{
              backgroundColor: "#0d1420",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "12px",
              boxShadow: "0 20px 60px -15px rgba(0,0,0,0.55)",
            }}
            // @ts-ignore
            formatter={(value: number) => [value.toLocaleString(), ""]}
          />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ paddingTop: 20 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";
import { cn } from "@/lib/utils";

interface SimpleTrendChartProps {
  data: { month: string; value: number }[];
  color?: string;
  className?: string;
  height?: number;
  showArea?: boolean;
}

export function SimpleTrendChart({
  data,
  color = "#55a1ff",
  className,
  height = 200,
  showArea = true,
}: SimpleTrendChartProps) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a2537" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: "#5d6f86", fontSize: 11, fontFamily: "var(--font-sans)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#5d6f86", fontSize: 11, fontFamily: "var(--font-sans)" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(1)}k` : v}
          />
          <Tooltip
            // @ts-ignore
            contentStyle={{
              backgroundColor: "#0d1420",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "12px",
              boxShadow: "0 20px 60px -15px rgba(0,0,0,0.55)",
            }}
            labelStyle={{ color: "#e9f0fb", fontFamily: "var(--font-sans)" }}
            // @ts-ignore
            formatter={(value: number) => [value.toLocaleString(), ""]}
          />
          {showArea && (
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              fill={color}
              fillOpacity={0.12}
              strokeWidth={2}
              connectNulls
            />
          )}
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: color }}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
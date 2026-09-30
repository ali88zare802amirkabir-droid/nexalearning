// @ts-nocheck
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";

interface StackedBarChartProps {
  data: Record<string, number | string>[];
  keys: string[];
  colors: string[];
  className?: string;
  height?: number;
}

export function StackedBarChart({
  data,
  keys,
  colors,
  className,
  height = 220,
}: StackedBarChartProps) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a2537" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: "#5d6f86", fontSize: 11, fontFamily: "var(--font-sans)" }}
            axisLine={false}
            tickLine={false}
          />
          {/* @ts-ignore */}
          <YAxis
            tick={{ fill: "#5d6f86", fontSize: 11, fontFamily: "var(--font-sans)" }}
            axisLine={false}
            tickLine={false}
            stacked={true}
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
          />
          <Legend
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ paddingBottom: 10 }}
          />
          {keys.map((key, index) => (
            <Bar
              key={key}
              stackId="a"
              dataKey={key}
              fill={colors[index % colors.length]}
              radius={[2, 2, 0, 0]}
              maxBarSize={40}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
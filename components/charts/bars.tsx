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
} from "recharts";
import { cn } from "@/lib/utils";

interface CountBarChartProps {
  data: { label: string; value: number; color?: string }[];
  className?: string;
  height?: number;
  layout?: "vertical" | "horizontal";
}

export function CountBarChart({
  data,
  className,
  height = 220,
  layout = "vertical",
}: CountBarChartProps) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} layout={layout} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a2537" vertical={layout === "horizontal"} horizontal={layout === "vertical"} />
          <XAxis
            dataKey={layout === "vertical" ? "label" : "value"}
            tick={{ fill: "#5d6f86", fontSize: 11, fontFamily: "var(--font-sans)" }}
            axisLine={false}
            tickLine={false}
            type={layout === "vertical" ? "category" : "number"}
            tickFormatter={(v) => layout === "horizontal" && typeof v === "number" ? v.toLocaleString() : v}
          />
          <YAxis
            dataKey={layout === "vertical" ? "value" : "label"}
            tick={{ fill: "#5d6f86", fontSize: 11, fontFamily: "var(--font-sans)" }}
            axisLine={false}
            tickLine={false}
            type={layout === "vertical" ? "number" : "category"}
            width={layout === "horizontal" ? 80 : undefined}
            tickFormatter={(v) => layout === "vertical" && typeof v === "number" ? v.toLocaleString() : v}
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
          <Bar
            dataKey={layout === "vertical" ? "value" : "label"}
            layout={layout as any}
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || "#55a1ff"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
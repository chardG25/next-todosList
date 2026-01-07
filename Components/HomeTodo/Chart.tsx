"use client";

import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Button } from "../ui/button";

const chartData = [
  { name: "Pending", value: 186, key: "pending" },
  { name: "Completed", value: 80, key: "completed" },
];

const chartConfig = {
  pending: {
    label: "Pending",
    color: "#f59e0b",
  },
  completed: {
    label: "Completed",
    color: "#22c55e",
  },
} satisfies ChartConfig;

export const Chart = () => {
  return (
    <div className="flex gap-2 h-full">
      <ChartContainer
        config={chartConfig}
        className="w-[170px] h-full rounded-xl bg-muted p-2"
      >
        <div className="flex flex-col h-full items-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="100%"
                innerRadius="50%"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`var(--color-${entry.key})`}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <Button className="mx-2 w-full h-[5px] text-xs text-white bg-neutral-800 font-mono border hover:bg-neutral-600/50">
            View Details
          </Button>
        </div>
      </ChartContainer>
    </div>
  );
};

"use client";

import {
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  TooltipProps,
} from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { usePageRouter } from "@/SERVER/router";
import { ChartPreview } from "./ChartPreview";

type ChartApiResponse = {
  total: number;
  pending: number;
  completed: number;
};

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
  const [apiData, setApiData] = useState<ChartApiResponse | null>(null);

  const [chartData, setChartData] = useState<
    { name: string; value: number; key: keyof typeof chartConfig }[]
  >([]);

  const handlePageRouter = usePageRouter();

  useEffect(() => {
    fetch("http://localhost:3000/api/chart")
      .then((res) => res.json())
      .then((data: ChartApiResponse) => {
        setApiData(data);

        setChartData([
          { name: "Pending", value: data.pending, key: "pending" },
          { name: "Completed", value: data.completed, key: "completed" },
        ]);
      });
  }, []);

  console.log(chartData);
  console.log(apiData);

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-black/50 text-white px-2 py-1 rounded shadow-lg">
          <span className="font-bold">{data.name}: </span>
          <span>{data.value}</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex gap-2 h-full flex-row">
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
                innerRadius="40%"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={chartConfig[entry.key].color}
                  />
                ))}
              </Pie>

              <RechartsTooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          <Button
            onClick={() => handlePageRouter("home/todos")}
            variant="outline"
            size="sm"
            className="text-xs h-8"
          >
            View Details
          </Button>
        </div>
      </ChartContainer>

      {apiData && <ChartPreview chartData={apiData} />}
    </div>
  );
};

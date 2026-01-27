import { Button } from "@/components/ui/button";
import { usePageRouter } from "@/SERVER/router";

type ChartPreviewProps = {
  chartData: {
    total: number;
    pending: number;
    completed: number;
  };
};
export const ChartPreview = ({ chartData }: ChartPreviewProps) => {
  const items = [
    { label: "Pending", value: chartData.pending, key: "pending" },
    { label: "Completed", value: chartData.completed, key: "completed" },
    { label: "Total", value: chartData.total, key: "ALL" },
  ];

  const handlePageRouter = usePageRouter();

  const handleRoute = (value: string) => {
    handlePageRouter(
      value === "ALL" ? "home/todos" : `home/todos?status=${value}`,
    );
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      {items.map((item) => (
        <Button
          key={item.key}
          variant="outline"
          size="sm"
          className="w-35 truncate"
          onClick={() => handleRoute(item.key)}
        >
          {item.label} - {item.value}
        </Button>
      ))}
    </div>
  );
};

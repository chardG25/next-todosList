import { Chart } from "./Chart";
import { TodoCard } from "./TodoCard";

export const HomeTodo = () => {
  return (
    <div className="w-full h-full flex-col flex">
      <div className="bg-neutral-900 h-50 flex p-2 gap-2 flex-row">
        <div className="flex-1 bg-neutral-800 border border-neutral-500 rounded-md">
          <Chart />
        </div>
        <div className="flex-1 bg-neutral-800 border border-neutral-500 rounded-md"></div>
      </div>

      <div className="flex-1 p-2 bg-neutral-900 flex">
        <div className="border border-neutral-500 flex-1 rounded-md bg-neutral-800">
          <TodoCard />
        </div>
      </div>
    </div>
  );
};

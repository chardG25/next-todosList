import { Chart } from "./Chart";

export const HomeTodo = () => {
  return (
    <div className="w-full h-full flex-col flex">
      <div className="bg-neutral-900 w-full h-40 flex p-2">
        <div className="flex-1 bg-neutral-800 border border-neutral-500 rounded-md">
          <Chart />
        </div>
        <div className="flex-1 bg-red-200"></div>
      </div>
      <div className="flex-1">
        <div></div>
      </div>
    </div>
  );
};

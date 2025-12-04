import Todos from "@/components/todos";
import { db } from "@/SERVER/mysql";

const HomePageTodos = async () => {
  return (
    <div className="bg-neutral-800 flex flex-1 items-center justify-center overflow-hidden">
      Home
    </div>
  );
};

export default HomePageTodos;

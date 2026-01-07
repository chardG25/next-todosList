import { HomeTodo } from "@/Components/HomeTodo";
import Todos from "@/Components/Todos/Todos";
import { db } from "@/SERVER/mysql";

const HomePageTodos = async () => {
  return (
    <div className="bg-neutral-800 flex flex-1 items-center justify-center overflow-hidden">
      <HomeTodo />
    </div>
  );
};

export default HomePageTodos;

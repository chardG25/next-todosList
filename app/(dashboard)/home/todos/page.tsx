import Todos from "@/Components/Todos/Todos";

const TodosPage = async () => {
  return (
    <div className="bg-neutral-800 flex flex-1 items-center justify-center overflow-hidden">
      <Todos />
    </div>
  );
};

export default TodosPage;

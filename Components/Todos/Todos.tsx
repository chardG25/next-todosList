"use client";

import { Circle, Pencil, Search, SearchX, Trash } from "lucide-react";
import { RowDataPacket } from "mysql2";
import {  useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { toLocaleCapitalize } from "@/SERVER/capitalize";
import { Input } from "@/Components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { FilterByCreatedAt, FilterByStatus } from "../FilterTypesTodos";
import { AddTodo, DeleteTodo, UpdateTodo } from "../TodoActions";
import { DateRange } from "react-day-picker";
import { useSearchParams } from "next/navigation";
import { usePageRouter } from "@/SERVER/router";

interface Todo extends RowDataPacket {
  id: number;
  todolist: string;
  status: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

const Todos = () => {
  const searchParams = useSearchParams();

  const handlePageRouter = usePageRouter();

  const selectedFilterStatus = searchParams.get("status") ?? "ALL";

  const handleStatusChange = (value: string) => {
    handlePageRouter(
      value === "ALL" ? "home/todos" : `home/todos?status=${value}`,
    );
  };

  const [todoValue, setTodoValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showEditTodos, setShowEditTodos] = useState(false);
  const [showDeletedTodos, setShowDeletedTodos] = useState(false);
  const [showAddTodos, setShowAddTodos] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [deletedTodos, setDeletedTodos] = useState<Todo | null>(null);
  const [selectedFilterCreatedAt, setSelectedFilterCreatedAt] = useState<
    DateRange | undefined
  >();
  const [selectedFilterTodos, setSelectedFilterTodos] = useState<string>("");
  // const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const fetchTodos = () => {
    fetch("http://localhost:3000/api/todo")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data.data);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

 const filteredTodos = useMemo(() => {
  const value = selectedFilterTodos.toLowerCase();

  return todos.filter((todo) => {
    const matchesTodo = todo.todolist.toLowerCase().includes(value);

    const matchesStatus =
      !selectedFilterStatus || selectedFilterStatus === "ALL"
        ? true
        : todo.status.toLowerCase() === selectedFilterStatus.toLowerCase();

    const matchesDate = (() => {
      if (!selectedFilterCreatedAt?.from) return true;

      const todoDate = new Date(todo.created_at.replace(" ", "T"));

      const from = new Date(selectedFilterCreatedAt.from);
      from.setHours(0, 0, 0, 0);

      if (!selectedFilterCreatedAt.to) {
        return todoDate >= from;
      }

      const to = new Date(selectedFilterCreatedAt.to);
      to.setHours(23, 59, 59, 999);

      return todoDate >= from && todoDate <= to;
    })();

    return matchesTodo && matchesStatus && matchesDate;
  });
}, [
  selectedFilterTodos,
  selectedFilterStatus,
  selectedFilterCreatedAt,
  todos,
]);
  return (
    <div className="h-full w-full bg-neutral-900/80 text-white flex flex-col ">
      <div className=" h-24 flex flex-row items-center gap-2">
        <div className="gap-2 flex flex-1 pl-10">
          <Input
            className="w-125 "
            placeholder="Add your todo here"
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
          />
          <button
            title="Add Todo"
            onClick={() => {
              if (!todoValue) {
                toast.error("Enter your Todo", {
                  position: "bottom-right",
                  style: {
                    width: "280px",
                    height: "50px",
                    fontSize: "15px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "red",
                    border: "2px solid white",
                  },
                });
                return;
              }
              setShowAddTodos(true);
            }}
            className="tracking-wider h-9 w-20  rounded-md border-2 font-bold focus:ring-0 focus:bg-blue-800 focus:text-white outline-0 border-blue-800 text-blue-500 hover:text-white hover:bg-blue-800 text-sm hover:shadow-[0px_0px_5px_#808080]"
          >
            Add
          </button>
        </div>

        <div className=" flex-1 flex-row flex gap-2 justify-end pr-10">
          <Input
            className="w-75 "
            placeholder="Search your todo here"
            value={selectedFilterTodos}
            onChange={(e) => setSelectedFilterTodos(e.target.value)}
          />

          <FilterByStatus
            value={selectedFilterStatus}
            onChange={handleStatusChange}
          />
          <FilterByCreatedAt
            value={selectedFilterCreatedAt}
            onChange={setSelectedFilterCreatedAt}
          />
        </div>
      </div>

      <Table>
        <TableCaption>Todo List</TableCaption>
        <TableHeader className="sticky top-0 z-8 bg-neutral-900">
          <TableRow>
            <TableHead className="text-center">#</TableHead>
            <TableHead className="text-center">TODOS</TableHead>
            <TableHead className="text-center">STATUS</TableHead>
            <TableHead className="text-center">CREATED_AT</TableHead>
            <TableHead className="text-center">UPDATED_AT</TableHead>
            <TableHead className="text-center">ACTION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTodos.map((t, index) => (
            <TableRow key={t.id}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell className="min-w-75] max-w-75 text-center">
                {toLocaleCapitalize(t.todolist)}
              </TableCell>
              <TableCell className="text-center">
                <span className="flex items-center justify-center gap-2 ">
                  <Circle
                    className={`h-4 w-4 ${
                      t.status === "completed"
                        ? "fill-green-500"
                        : "fill-amber-500 animate-pulse"
                    }`}
                  />
                  {toLocaleCapitalize(t.status)}
                </span>
              </TableCell>
              <TableCell className="text-center">
                {new Date(t.created_at.replace(" ", "T"))
                  .toLocaleString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                    timeZone: "Asia/Manila",
                  })
                  .replace(",", "")}
              </TableCell>
              <TableCell className="text-center">
                {t.updated_at
                  ? new Date(t.updated_at.replace(" ", "T"))
                      .toLocaleString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                        timeZone: "Asia/Manila",
                      })
                      .replace(",", "")
                  : "-"}
              </TableCell>

              <TableCell className="text-center">
                <span className="flex items-center justify-center gap-5">
                  <Pencil
                    className="w-4 h-4 fill-amber-400"
                    onClick={() => {
                      setSelectedTodo(t);
                      setShowEditTodos(true);
                    }}
                  />
                  <Trash
                    className="w-4 h-4 fill-red-400"
                    onClick={() => {
                      setDeletedTodos(t);
                      setShowDeletedTodos(true);
                    }}
                  />
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {showEditTodos && selectedTodo && (
        <UpdateTodo
          forUpdateTodo={selectedTodo}
          onClose={() => setShowEditTodos(false)}
          setTodos={setTodos}
        />
      )}
      {showDeletedTodos && deletedTodos && (
        <DeleteTodo
          deletedTodos={deletedTodos}
          onClose={() => setShowDeletedTodos(false)}
          setTodos={setTodos}
        />
      )}

      {showAddTodos && todoValue && (
        <AddTodo
          setAddTodo={setTodoValue}
          setTodos={setTodos}
          todoValue={todoValue}
          onClose={() => setShowAddTodos(false)}
        />
      )}
    </div>
  );
};

export default Todos;

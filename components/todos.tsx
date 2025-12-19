"use client";

import { Circle, Pencil, Search, SearchX, Trash } from "lucide-react";
import { RowDataPacket } from "mysql2";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { toLocaleCapitalize } from "@/SERVER/capitalize";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FilterByCreatedAt, FilterByStatus } from "./FilterTypesTodos";
import { AddTodo, DeleteTodo, UpdateTodo } from "./TodoActions";

interface Todo extends RowDataPacket {
  id: number;
  todolist: string;
  status: string;
  user_id: number;
  created_at: string;
}

const Todos = () => {
  const [todoValue, setTodoValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showEditTodos, setShowEditTodos] = useState(false);
  const [showDeletedTodos, setShowDeletedTodos] = useState(false);
  const [showAddTodos, setShowAddTodos] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [deletedTodos, setDeletedTodos] = useState<Todo | null>(null);
  const [selectFilterType, setSelectFilterType] = useState("");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [showStatusFilter, setShowStatusFilter] = useState(false);

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

  useEffect(() => {
    if (!selectFilterType) {
      setFilteredTodos(todos);
      return;
    }

    const value = todoValue.toLowerCase();

    const filteredTodo = todos.filter((todo) => {
      if (selectFilterType === "TODOS") {
        setShowStatusFilter(true);
        return todo.todolist.toLowerCase().includes(value);
      }

      if (selectFilterType === "STATUS") {
        setShowStatusFilter(true);
        return todo.status.toLowerCase().includes(value);
      }
    });

    setFilteredTodos(filteredTodo);
  }, [selectFilterType, todoValue, todos]);

  const clearFilter = () => {
    setSelectFilterType("");
    setTodoValue("");
    setShowStatusFilter(false);
  };

  return (
    <div className="h-full w-full bg-neutral-900/80 text-white flex flex-col ">
      <div className=" h-24 flex flex-row items-center  gap-2">
        <div className="gap-2 flex flex-1 px-2">
          <Input
            className="w-[500px] "
            placeholder="Add your todo here"
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
          />
          <button
            title="Add Todo"
            onClick={() => {
              if (!todoValue) {
                toast.error(
                  <div className="text-white flex w-[250px] h-[50px] items-center">
                    Add your next task
                  </div>
                );
                return;
              }
              setShowAddTodos(true);
            }}
            className="tracking-wider h-9 w-20  rounded-md border-2 font-bold focus:ring-0 focus:bg-blue-800 focus:text-white outline-0 border-blue-800 text-blue-500 hover:text-white hover:bg-blue-800 text-sm hover:shadow-[0px_0px_5px_#808080]"
          >
            Add
          </button>
        </div>

        <div className=" flex-1 flex-row flex gap-2">
          <Input className="w-[300px] " placeholder="Search your todo here" />

          <FilterByStatus />
          <FilterByCreatedAt />

          {/* <Select
            value={selectFilterType}
            onValueChange={(e) => setSelectFilterType(e)}
          >
            <SelectTrigger className="w-[150px] ">
              <SelectValue placeholder="Select Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODOS">TODOS</SelectItem>
              <SelectItem value="STATUS">STATUS</SelectItem>
              <SelectItem value="CREATED_AT">CREATED_AT</SelectItem>
            </SelectContent>
          </Select> */}
        </div>

        {selectFilterType && (
          <button
            title="Clear Filter"
            onClick={clearFilter}
            className="h-9 w-12 flex items-center justify-start "
          >
            <SearchX className="text-neutral-400 h-6 w-6 hover:h-8 hover:w-8" />
          </button>
        )}
      </div>

      <Table>
        <TableCaption>Todo List</TableCaption>
        <TableHeader className="sticky top-0 z-8 bg-neutral-900">
          <TableRow>
            <TableHead className="text-center">#</TableHead>
            <TableHead className="text-center">TODOS</TableHead>
            <TableHead className="text-center">STATUS</TableHead>
            <TableHead className="text-center">CREATED_AT</TableHead>
            <TableHead className="text-center">ACTION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTodos.map((t, index) => (
            <TableRow key={t.id}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell className="min-w-[300px] max-w-[300px] text-center">
                {toLocaleCapitalize(t.todolist)}
              </TableCell>
              <TableCell className="text-center">
                <span className="flex items-center justify-center gap-2 ">
                  <Circle
                    className={`h-4 w-4 ${
                      t.status === "completed"
                        ? "fill-green-500"
                        : "fill-amber-500"
                    }`}
                  />
                  {toLocaleCapitalize(t.status)}
                </span>
              </TableCell>
              <TableCell className="text-center">
                {new Date(t.created_at)
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

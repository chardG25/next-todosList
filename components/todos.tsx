"use client";

import { Circle, Pencil, Trash } from "lucide-react";
import { RowDataPacket } from "mysql2";
import { useEffect, useState } from "react";
import EditTodos from "./editTodos";
import DelTodos from "./delTodos";
import { toast } from "react-toastify";
import { toLocaleCapitalize } from "@/SERVER/capitalize";
import AddTodos from "./addTodos";

interface Todo extends RowDataPacket {
  id: number;
  todolist: string;
  status: string;
  user_id: number;
  created_at: string;
}

const Todos = () => {
  const [addTodo, setAddTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showEditTodos, setShowEditTodos] = useState(false);
  const [showDeletedTodos, setShowDeletedTodos] = useState(false);
  const [showAddTodos, setShowAddTodos] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [deletedTodos, setDeletedTodos] = useState<Todo | null>(null);

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

  return (
    <div className="h-full w-full bg-neutral-900/50 text-white flex flex-col ">
      <div className=" h-24 flex flex-row items-center justify-center gap-2">
        <input
          className="w-[600px] h-10 rounded-md border-2 text-sm p-2"
          placeholder="Add Todo"
          value={addTodo}
          onChange={(e) => setAddTodo(e.target.value)}
        />
        <button
          onClick={() => {
            if (!addTodo) {
              toast.error(
                <div className="text-white flex w-[250px] h-[50px] items-center">
                  Please enter Todo
                </div>
              );
              return;
            }
            setShowAddTodos(true);
          }}
          className="tracking-wider h-10 w-20  rounded-md border-2 font-bold focus:ring-0 focus:bg-blue-800 focus:text-white outline-0 border-blue-800 text-blue-500 hover:text-white hover:bg-blue-800 text-sm "
        >
          Add
        </button>
      </div>
      <div className="flex-1 overflow-y-auto tracking-wider">
        <table className="w-full h-full text-sm text-center ">
          <thead className="bg-neutral-900 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 font-medium">#</th>
              <th className="px-6 py-3 font-medium">TODOS</th>
              <th className="px-6 py-3 font-medium">STATUS</th>
              <th className="px-6 py-3 font-medium">CREATED_AT</th>
              <th className="px-6 py-3 font-medium">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((t, index) => (
              <tr
                key={t.id}
                className="hover:bg-neutral-800/50 hover:shadow-[0px_0px_5px_#808080]"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className=" px-4 py-3 max-w-[300px] truncate">
                  {toLocaleCapitalize(t.todolist)}
                </td>
                <td className="px-4 py-3 max-w-2.5">
                  <span className="flex items-center justify-start gap-2 pl-14">
                    <Circle
                      className={`h-4 w-4 ${
                        t.status === "completed"
                          ? "fill-green-500"
                          : "fill-amber-500"
                      }`}
                    />
                    {toLocaleCapitalize(t.status)}
                  </span>
                </td>
                <td className="px-4 py-3">
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
                </td>
                <td className="px-4 py-3">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showEditTodos && selectedTodo && (
          <EditTodos
            forUpdateTodo={selectedTodo}
            onClose={() => setShowEditTodos(false)}
            setTodos={setTodos}
          />
        )}
        {showDeletedTodos && deletedTodos && (
          <DelTodos
            deletedTodos={deletedTodos}
            onClose={() => setShowDeletedTodos(false)}
            setTodos={setTodos}
          />
        )}

        {showAddTodos && addTodo && (
          <AddTodos
            setAddTodo={setAddTodo}
            setTodos={setTodos}
            addTodo={addTodo}
            onClose={() => setShowAddTodos(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Todos;

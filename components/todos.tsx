"use client";

import { Pencil, Trash } from "lucide-react";
import { RowDataPacket } from "mysql2";
import { useEffect, useState } from "react";
import EditTodos from "./editTodos";
import DelTodos from "./delTodos";
import { toast } from "react-toastify";

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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [deletedTodos, setDeletedTodos] = useState<Todo | null>(null);

  const handleAddTodo = () => {
    fetch("http://localhost:3000/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: addTodo }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(
            <div className="text-white flex w-[250px] h-[50px] items-center">
              {data.error}
            </div>
          );
          return;
        }
        setTodos((prev) => [...prev, data.data]);
        setAddTodo("");
        toast.success(
          <div className="text-white flex w-[250px] h-[50px] items-center">
            Todo added successfully!
          </div>
        );
      });
  };

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
          onClick={handleAddTodo}
          className="tracking-wider h-10 w-20  rounded-md border-2 font-bold focus:ring-0 focus:bg-blue-800 focus:text-white outline-0 border-blue-800 text-blue-500 hover:text-white hover:bg-blue-800 text-sm "
        >
          Add
        </button>
      </div>
      <div className="flex-1 overflow-y-auto ">
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
            {todos.map((t) => (
              <tr key={t.id}>
                <td className="px-6 py-4">{t.id}</td>
                <td className=" px-6 py-4 max-w-[300px] truncate">
                  {t.todolist}
                </td>
                <td className="px-6 py-4">{t.status}</td>
                <td className="px-6 py-4">
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
                <td className="px-6 py-4">
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
      </div>
    </div>
  );
};

export default Todos;

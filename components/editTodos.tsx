"use client";

import { X } from "lucide-react";
import { RowDataPacket } from "mysql2";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";

interface Todo extends RowDataPacket {
  id: number;
  todolist: string;
  status: string;
  user_id: number;
  created_at: string;
}

interface ButtonClose {
  forUpdateTodo: Todo;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  onClose: () => void;
}

const EditTodos: React.FC<ButtonClose> = ({
  onClose,
  forUpdateTodo,
  setTodos,
}) => {
  const [updatedTodo, setUpdatedTodo] = useState(forUpdateTodo.todolist);
  const [updatedStatus, setUpdatedStatus] = useState(forUpdateTodo.status);

  const handleSave = () => {
    fetch("http://localhost:3000/api/todo", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: forUpdateTodo.id,
        todolist: updatedTodo,
        status: updatedStatus,
        user_id: forUpdateTodo.user_id,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          console.error("Failed to update todo");
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setTodos((prev) =>
            prev.map((t) =>
              t.id === forUpdateTodo.id ? { ...t, ...data.data } : t
            )
          );
          toast.success(
            <div className="text-white flex w-[250px] h-[50px] items-center">
              Todo updated successfully!
            </div>
          );
          onClose();
        }
      });
  };

  return createPortal(
    <div className="w-full h-full fixed bg-neutral-900/90 inset-0 z-11 flex items-center justify-center">
      <div className="bg-neutral-900 w-[800px] h-30 border-2 border-neutral-100 rounded-2xl flex flex-col p-1 shadow-[0px_0px_8px_#808080]">
        <span className="h-5 w-full flex items-center justify-end">
          <button onClick={onClose}>
            <X className="text-white" />
          </button>
        </span>
        <span className="flex-1 flex items-start justify-center gap-2 pt-4">
          <input
            className="w-[500px] h-10 rounded-md border-2 text-sm p-2 bg-neutral-200 border-neutral-500"
            placeholder="todo"
            value={updatedTodo}
            onChange={(e) => setUpdatedTodo(e.target.value)}
          />
          <select
            value={updatedStatus}
            onChange={(e) => setUpdatedStatus(e.target.value)}
            className="w-24 h-10 rounded-md border-2 text-sm text-center  bg-neutral-200 border-neutral-500"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <button
            onClick={handleSave}
            className="tracking-wider h-10 w-20  rounded-md border-2 font-bold focus:ring-0 focus:bg-blue-800 focus:text-white outline-0 border-blue-800 text-blue-500 hover:text-white hover:bg-blue-800 text-sm"
          >
            Save
          </button>
        </span>
      </div>
    </div>,
    document.body
  );
};

export default EditTodos;

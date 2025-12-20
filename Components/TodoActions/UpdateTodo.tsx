"use client";

import { X } from "lucide-react";
import { RowDataPacket } from "mysql2";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Input } from "@/Components/ui/input";

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

export const UpdateTodo: React.FC<ButtonClose> = ({
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

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return createPortal(
    <div className="w-full h-full fixed bg-neutral-900/90 inset-0 z-11 flex items-center justify-center">
      <div className="bg-neutral-900 w-[800px] h-30 border-2 border-neutral-100 rounded-2xl flex flex-col p-1 shadow-[0px_0px_8px_#808080]">
        <span className="h-5 w-full flex items-center justify-end">
          <button onClick={onClose}>
            <X className="text-white" />
          </button>
        </span>
        <span className="flex-1 flex items-start justify-center gap-1 pt-4">
          <Input
            value={updatedTodo}
            onChange={(e) => setUpdatedTodo(e.target.value)}
            className="w-[500px]"
          />

          <Select value={updatedStatus} onValueChange={setUpdatedStatus}>
            <SelectTrigger className="w-[150px] ">
              <SelectValue placeholder="Select Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <button
            onClick={handleSave}
            className="tracking-wider h-9 w-20  rounded-md border-2 font-bold focus:ring-0 focus:bg-blue-800 focus:text-white outline-0 border-blue-800 text-blue-500 hover:text-white hover:bg-blue-800 text-sm"
          >
            Save
          </button>
        </span>
      </div>
    </div>,
    document.body
  );
};

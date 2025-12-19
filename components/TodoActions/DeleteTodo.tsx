"use client";

import { X } from "lucide-react";
import { RowDataPacket } from "mysql2";
import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";

interface Todo extends RowDataPacket {
  id: number;
  todolist: string;
  status: string;
  user_id: number;
  created_at: string;
}

interface Props {
  deletedTodos: Todo;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  onClose: () => void;
}

export const DeleteTodo: React.FC<Props> = ({
  onClose,
  deletedTodos,
  setTodos,
}) => {
  const handleDelete = () => {
    fetch("http://localhost:3000/api/todo", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: deletedTodos.id,
        user_id: deletedTodos.user_id,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          console.error("Failed to delete todo");
          return;
        }
        return res.json();
      })
      .then(() => {
        setTodos((prev) => prev.filter((t) => t.id !== deletedTodos.id));
        onClose();
        toast.success(
          <div className="text-white flex w-[250px] h-[50px] items-center">
            Todo deleted successfully!
          </div>
        );
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
      <div className="bg-neutral-900 w-[600px] h-20 border-2 border-neutral-100 rounded-2xl flex flex-row p-1 items-center justify-center gap-2 shadow-[0px_0px_8px_#808080]">
        <p className=" flex items-center justify-center w-[350px] h-10 rounded-md text-white">
          Are your sure you want to delete this todo?
        </p>
        <button
          className="tracking-wider h-10 w-20  rounded-md border-2 font-bold focus:ring-0 focus:bg-blue-800 focus:text-white outline-0 border-blue-800 text-blue-500 hover:text-white hover:bg-blue-800 text-sm"
          onClick={handleDelete}
        >
          Yes
        </button>
        <button
          className="tracking-wider h-10 w-20  rounded-md border-2 font-bold focus:ring-0 focus:bg-amber-800 focus:text-white outline-0 border-amber-800 text-amber-500 hover:text-white hover:bg-amber-800 text-sm"
          onClick={onClose}
        >
          No
        </button>
      </div>
    </div>,
    document.body
  );
};

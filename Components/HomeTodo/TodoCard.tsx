"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { RowDataPacket } from "mysql2";
import { useEffect, useState } from "react";

interface Todo extends RowDataPacket {
  id: number;
  todolist: string;
  status: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export const TodoCard = () => {
  const [todo, setTodo] = useState<Todo[]>([]);

  const fetchTodo = () => {
    fetch("http://localhost:3000/api/todo")
      .then((res) => res.json())
      .then((data) => {
        setTodo(data.data);
      });
  };

  useEffect(() => {
    fetchTodo();
  }, []);
  console.log(todo);
  return (
    <Carousel className="w-[85%]">
      <CarouselContent>
        {todo
          .filter((item) => item.status === "pending")
          .slice(0, 20)
          .map((item) => (
            <CarouselItem key={item.id} className="basis-1/5 shrink-0">
              <Card className="h-full bg-neutral-900/50">
                <CardContent className="flex flex-col aspect-[3/2] items-center justify-center bg-red-100 p-2 ">
                  <span className="text-xs font-semibold text-center line-clamp-4">
                    {item.todolist}
                  </span>
                </CardContent>
                <CardContent className="flex flex-col aspect-[3/2] items-center justify-center bg-red-100 p-2">
                  <span className="text-xs font-semibold text-center line-clamp-4">
                    {item.status}
                  </span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
      </CarouselContent>

      <CarouselPrevious className="size-10" />
      <CarouselNext className="size-10" />
    </Carousel>
  );
};

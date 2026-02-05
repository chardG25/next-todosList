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

  return (
    <div className="h-40 w-full flex items-center justify-center">
      <Carousel className="relative w-[80%] h-[90%]  flex items-center justify-center border rounded-2xl">
        <CarouselContent>
          {todo.slice(0, 10).map((item) => (
            <CarouselItem key={item.id} className="basis-[20%] h-full">
              <Card className="h-full bg-neutral-900/50">
                <CardContent className="flex h-full items-center justify-center p-4">
                  <span className="text-md font-semibold text-center">
                    {item.todolist}
                  </span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="size-10" />
        <CarouselNext className="size-10" />
      </Carousel>
    </div>
  );
};

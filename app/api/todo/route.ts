import { db } from "@/SERVER/mysql";
import { usersProps } from "@/SERVER/userProps";
import { error } from "console";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { cookies } from "next/headers";

interface Todo extends RowDataPacket {
  id: number;
  todolist: string;
  status: string;
  user_id: number;
  created_at: string;
}

export async function POST(request: Request) {
  const { todo } = await request.json();
  const cookieStore = await cookies();

  const userCookie = cookieStore.get("userId");

  if (!userCookie || !userCookie.value) {
    return new Response(JSON.stringify({ error: "User not authenticated" }), {
      status: 401,
    });
  }

  if (!todo) {
    return new Response(JSON.stringify({ error: "Please enter Todo" }), {
      status: 400,
    });
  }

  const user_id_num = parseInt(userCookie.value, 10);

  const [insertedTodo] = await db.execute<ResultSetHeader>(
    "INSERT INTO todostable (todolist, user_id) VALUES (?, ?)",
    [todo, user_id_num]
  );

  const [newTodo] = await db.query<Todo[]>(
    "SELECT * FROM todostable WHERE user_id = ? AND  id = ?",
    [user_id_num, insertedTodo.insertId]
  );

  return new Response(JSON.stringify({ data: newTodo[0] }), { status: 200 });
}

export async function GET(request: Request) {
  const cookieStore = await cookies();

  const userCookie = cookieStore.get("userId");

  if (!userCookie || !userCookie.value) {
    return new Response(JSON.stringify({ error: "User not authenticated" }), {
      status: 401,
    });
  }

  const user_id_num = parseInt(userCookie.value, 10);

  const [todos] = await db.query<usersProps[]>(
    "SELECT * FROM todostable WHERE user_id = ?",
    [user_id_num]
  );

  return new Response(JSON.stringify({ data: todos }), { status: 200 });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { id, todolist, status, user_id } = body;

  if (!id || !todolist || !status) {
    return new Response(JSON.stringify({ error: "Complete all fields" }), {
      status: 400,
    });
  }

  const query =
    "UPDATE todostable SET todolist = ?, status = ? WHERE id = ? and user_id = ?";
  await db.execute(query, [todolist, status, id, user_id]);

  const [rows] = await db.query<Todo[]>(
    "SELECT * FROM todostable WHERE id = ? and user_id = ?",
    [id, user_id]
  );

  return new Response(
    JSON.stringify({
      message: "Todo successfully updated",
      data: rows[0],
    }),
    { status: 200 }
  );
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const { id, user_id } = body;
  const query = "DELETE FROM todostable WHERE id = ? and user_id = ?";
  await db.execute(query, [id, user_id]);

  return new Response(
    JSON.stringify({ message: "Todo deleted successfully" }),
    { status: 200 }
  );
}

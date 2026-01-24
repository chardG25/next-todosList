import { db } from "@/SERVER/mysql";
import { RowDataPacket } from "mysql2";
import { cookies } from "next/headers";

interface TodoCount extends RowDataPacket {
  total: number;
  pending: number;
  completed: number;
}

export async function GET() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("userId");

  if (!userCookie?.value) {
    return new Response(JSON.stringify({ error: "User not authenticated" }), {
      status: 401,
    });
  }

  const user_id = Number(userCookie.value);

  const [rows] = await db.query<TodoCount[]>(
    `
    SELECT
      COUNT(*) AS total,
      SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending,
      SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed
    FROM todostable
    WHERE user_id = ?
    `,
    [user_id]
  );

  return new Response(
    JSON.stringify({
      total: Number(rows[0].total),
      pending: Number(rows[0].pending),
      completed: Number(rows[0].completed),
    }),
    { status: 200 }
  );
}

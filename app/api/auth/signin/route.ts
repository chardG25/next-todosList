import { db } from "@/SERVER/mysql";
import bcrypt from "bcryptjs";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { cookies } from "next/headers";

export interface usersProps extends RowDataPacket {
  id: number;
  username: string;
  password_hash: string;
}

export async function POST(request: Request) {
  const { username, password } = await request.json();
  const [row] = await db.query<usersProps[]>(
    "SELECT * FROM users WHERE username=?",
    [username]
  );
  const userdata = row[0];

  if (!userdata) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const match = await bcrypt.compare(password, userdata.password_hash);
  if (!match) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set("userId", String(userdata.id), {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return Response.json({
    success: true,
    user: { id: userdata.id, username: userdata.username },
  });
}

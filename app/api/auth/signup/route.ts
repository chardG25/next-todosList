import { db } from "@/SERVER/mysql";
import { usersProps } from "@/SERVER/userProps";
import bcrypt from "bcryptjs";
import { ResultSetHeader } from "mysql2";

export async function POST(request: Request) {
  const { username, password } = await request.json();
  const password_hash = await bcrypt.hash(password, 10);

  const [checkUser] = await db.execute<usersProps[]>(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );

  if (checkUser.length > 0) {
    return Response.json({ error: "Username already exist" }, { status: 409 });
  }

  const [result] = await db.execute(
    "INSERT INTO users (username, password_hash) VALUES (?,?)",
    [username, password_hash]
  );

  const resultHeader = result as ResultSetHeader;

  const [userSignUp] = await db.query<usersProps[]>(
    "SELECT * FROM users WHERE id = ?",
    [resultHeader.insertId]
  );

  return Response.json({ data: userSignUp[0] });
}

import { db } from "./mysql";
import { usersProps } from "./userProps";
import { cookies } from "next/headers";

export const getUser = async () => {
  const cookieStore = await cookies();

  const userId = cookieStore.get("userId")?.value;

  const [rows] = await db.query<usersProps[]>(
    "SELECT * FROM users WHERE id = ?",
    [userId]
  );

  return rows[0];
};

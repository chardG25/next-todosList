import { RowDataPacket } from "mysql2";

export interface usersProps extends RowDataPacket {
  id: number;
  username: string;
  password_hash: string;
}

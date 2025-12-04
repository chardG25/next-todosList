import { usersProps } from "@/SERVER/userProps";

import { User } from "lucide-react";

interface userInfoProps {
  userInfo?: usersProps;
}

const UserInfo = ({ userInfo }: userInfoProps) => {
  return (
    <div className="absolute flex items-center justify-center flex-col right-10 top-10 bg-neutral-800 h-32 w-45 p-2 border border-neutral-300 rounded-md gap-1 font-mono text-white font-semibold tracking-wider">
      <span className="bg-neutral-500 w-10 h-10 flex items-center justify-center rounded-full  flex-col relative">
        <User />
      </span>

      <span className="text-xs h-4 w-full flex justify-center items-center">
        Welcome!
      </span>
      <span className="text-xs h-4 w-full flex justify-center items-center rounded-md ">
        {userInfo?.username.toLocaleUpperCase()}
      </span>
    </div>
  );
};

export default UserInfo;

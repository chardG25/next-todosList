"use client";

import { usersProps } from "@/SERVER/userProps";
import { Home, ListTodo, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SideBar } from "@/atomComponents/icon";

interface userInfoProps {
  userInfo?: usersProps;
}

const Navbar = ({ userInfo }: userInfoProps) => {
  const [navOpen, setNavOpen] = useState(false);

  const handleNavBar = () => {
    setNavOpen((prev) => !prev);
  };

  const router = useRouter();

  const handleLogOut = () => {
    fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      router.push("/login");
    });
  };

  return (
    <div
      className={`flex  h-full flex-col relative bg-neutral-900 border-r border-r-neutral-800 font-mono text-white ${
        navOpen ? "w-56" : "w-16"
      }`}
    >
      <div
        className="absolute top-0 right-0 h-full w-0.5 cursor-e-resize z-50"
        onClick={handleNavBar}
      />

      <div className="w-full h-24 p-1 flex items-center mb-3">
        <SideBar
          icon={<Menu className="size-6" />}
          label={`Hi There! ${userInfo?.username.toLocaleUpperCase()}`}
          navOpen={navOpen}
          onClick={handleNavBar}
        />
      </div>

      <nav className=" flex-1 w-full p-1 gap-2 flex flex-col ">
        <span className="w-full h-5">
          {navOpen && <p className="text-xs tracking-widest">My Task</p>}
        </span>

        <SideBar
          icon={<Home className="size-6" />}
          label="Home"
          navOpen={navOpen}
          onClick={() => {
            router.push("/home");
          }}
        />
        <SideBar
          icon={<ListTodo className="size-6" />}
          label="Todos"
          navOpen={navOpen}
          onClick={() => {
            router.push("/home/todos");
          }}
        />
      </nav>

      <div className="h-30 w-full items-end flex pb-5 p-1">
        <SideBar
          icon={<LogOut />}
          label="Logout"
          navOpen={navOpen}
          onClick={handleLogOut}
        />
      </div>
    </div>
  );
};

export default Navbar;

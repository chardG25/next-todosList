"use client";

import { usersProps } from "@/SERVER/userProps";
import { Home, ListTodo, LogOut, Menu, User } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface userInfoProps {
  userInfo?: usersProps;
}

const Navbar = ({ userInfo }: userInfoProps) => {
  const [navOpen, setNavOpen] = useState(false);

  const handleNavBar = () => {
    setNavOpen((prev) => !prev);
  };

  const SideBar = ({
    navOpen,
    icon,
    label,
    onClick,
  }: {
    icon: React.ReactNode;
    navOpen: boolean;
    label: string;
    onClick: () => void;
  }) => {
    return (
      <div
        className={` w-full flex flex-row gap-2 text-sm items-center hover:bg-neutral-950 ${
          navOpen ? "justify-start" : "justify-center"
        }`}
        onClick={onClick}
      >
        {icon}
        {navOpen && <span>{label}</span>}
      </div>
    );
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
      className={`flex p-2 h-full flex-col relative bg-neutral-900 border-r border-r-white font-mono text-white ${
        navOpen ? "w-56" : "w-16"
      }`}
    >
      <div
        className="absolute top-0 right-0 h-full w-0.5 cursor-e-resize z-50"
        onClick={handleNavBar}
      />

      <div className="w-full h-24 p-1 flex items-center ">
        <SideBar
          icon={<Menu className="size-6" />}
          label={`Hi There! ${userInfo?.username.toLocaleUpperCase()}`}
          navOpen={navOpen}
          onClick={handleNavBar}
        />
      </div>

      <nav className=" flex-1 w-full p-1 gap-4 flex flex-col ">
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

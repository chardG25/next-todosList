import Navbar from "@/components/navbar";
import { getUser } from "@/SERVER/getUser";
import { Metadata } from "next/types";
import React from "react";

export const metadata: Metadata = {
  title: "Todos",
  description: "Create Todos",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userInfo = await getUser();
  return (
    <div className={"flex flex-row w-screen h-screen"}>
      <Navbar userInfo={userInfo} />
      <div className="flex-1 flex flex-col ">{children}</div>
    </div>
  );
}

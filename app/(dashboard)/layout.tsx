import Navbar from "@/components/navbar";
import { getUser } from "@/SERVER/getUser";
import { Metadata } from "next/types";
import React from "react";
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar";

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
    <div className="flex flex-row w-screen h-screen">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-1 flex flex-row relative">
          <SidebarTrigger className="absolute" />
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
}

{
  /* <Navbar userInfo={userInfo} /> */
}
{
  /* <div className="flex-1 flex flex-col">{children}</div> */
}

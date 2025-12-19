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
import AppSidebar from "@/components/appSideBar";

export const metadata: Metadata = {
  title: "Todos",
  description: "Create Todos",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row w-screen h-screen">
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset className="contain-inline-size" />
        <div className="flex flex-col w-full">{children}</div>
        <SidebarInset />
      </SidebarProvider>
    </div>
  );
}

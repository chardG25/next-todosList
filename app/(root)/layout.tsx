import { Metadata } from "next/types";
import React from "react";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Todos",
  description: "Create Todos",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}

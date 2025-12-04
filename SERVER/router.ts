"use client";

import { useRouter } from "next/navigation";

export const PageRouter = () => {
  const Router = useRouter();

  const handlePageRouter = (page: string) => {
    Router.push(`/${page}`);
  };

  return handlePageRouter
};

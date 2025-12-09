"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  ChevronRight,
  GalleryVerticalEnd,
  HomeIcon,
  ListCheckIcon,
  LogOutIcon,
  NotebookText,
  PersonStandingIcon,
  Settings,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import Link from "next/link";
import { PageRouter } from "@/SERVER/router";

function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const handlePageRouter = PageRouter();
  const handleLogOut = () => {
    fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      handlePageRouter("login");
    });
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size={"lg"}>
              <Link href={"/home"}>
                <div className=" text-sidebar-primary flex aspect-square size-8 items-center justify-center rounded-lg bg-neutral-800">
                  <GalleryVerticalEnd className="size-4 text-white" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Todo List</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <Collapsible key={1} asChild className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={"My Task"}>
                    <NotebookText />
                    <span>My Task</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem key={"sub menu"}>
                      <SidebarMenuSubButton asChild>
                        <a href={"/home"}>
                          <span className="flex flex-row gap-2 items-center justify-center">
                            <HomeIcon className="size-4" />
                            Home
                          </span>
                        </a>
                      </SidebarMenuSubButton>
                      <SidebarMenuSubButton asChild>
                        <a href={"/home/todos"}>
                          <span className="flex flex-row gap-2 items-center justify-center">
                            <ListCheckIcon className="size-4" />
                            Todos
                          </span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarMenu>
            <Collapsible key={1} asChild className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={"Settings"}>
                    <Settings />
                    <span>User Settings</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem key={"sub menu"}>
                      <SidebarMenuSubButton asChild>
                        <a href={"/"}>
                          <span className="flex flex-row gap-2 items-center justify-center">
                            <PersonStandingIcon className="size-4" />
                            Change password
                          </span>
                        </a>
                      </SidebarMenuSubButton>
                      <SidebarMenuSubButton asChild>
                        <span className="cursor-pointer">
                          <span
                            className="flex flex-row gap-2 items-center justify-center "
                            onClick={handleLogOut}
                          >
                            <LogOutIcon className="size-4" />
                            Logout
                          </span>
                        </span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;

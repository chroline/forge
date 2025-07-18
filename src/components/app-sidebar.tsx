"use client";

import {
  Clock,
  Database,
  FlaskConical,
  MessageSquare,
  Search,
  Zap,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { CommandPalette } from "./command-palette";
import { CommandShortcut } from "./ui/command";
import { inputVariants } from "./ui/input";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navSections: [
    {
      label: "Platform",
      items: [
        {
          title: "Experiments",
          url: "/dashboard/experiments",
          icon: FlaskConical,
        },
        {
          title: "Datasets",
          url: "/dashboard/datasets",
          icon: Database,
        },
      ],
    },
    {
      label: "Monitoring",
      items: [
        {
          title: "Activity",
          url: "/dashboard/activity",
          icon: Clock,
        },
      ],
    },
  ],
  navSecondarySections: [
    {
      items: [
        {
          title: "Feedback",
          url: "/feedback",
          icon: MessageSquare,
          external: true,
        },
      ],
    },
  ],
};

function ForgeHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          asChild
        >
          <Link href="/dashboard">
            <div className="bg-primary text-white flex aspect-square size-8 items-center justify-center rounded-lg">
              <Zap className="size-4" />
            </div>
            <p className="grid flex-1 text-left leading-tight truncate font-semibold text-primary text-xl">
              Forge
            </p>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function SearchButton() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className="p-2">
        <button
          onClick={() => setOpen(true)}
          className={cn(
            inputVariants(),
            "bg-background flex items-center gap-2 cursor-pointer"
          )}
        >
          <Search className="size-4 text-muted-foreground" />
          <span className="text-muted-foreground">Search...</span>
          <CommandShortcut>⌘K</CommandShortcut>
        </button>
      </div>

      <CommandPalette open={open} onOpenChange={setOpen} />
    </>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ForgeHeader />
      </SidebarHeader>
      <SidebarContent className="flex flex-col">
        <SearchButton />
        <div className="flex-1">
          <NavMain sections={data.navSections} />
        </div>
        <NavSecondary sections={data.navSecondarySections} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

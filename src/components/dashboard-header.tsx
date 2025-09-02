"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { BookOpen } from "lucide-react";
import Link from "next/link";

interface DashboardHeaderProps {
  title?: string;
  children?: React.ReactNode;
}

export function DashboardHeader({ title, children }: DashboardHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center justify-between w-full px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          {title && <h1 className="text-md font-semibold">{title}</h1>}
        </div>
        <div className="flex items-center gap-2">
          {children}
          <Button variant="outline" size="sm" asChild>
            <Link href="#">
              <BookOpen className="h-4 w-4 mr-1" />
              Docs
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

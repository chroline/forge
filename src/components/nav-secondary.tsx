"use client";

import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ThemeToggleMenu } from "./theme-toggle-menu";

interface NavSecondaryItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  external?: boolean;
}

interface NavSecondarySection {
  label?: string;
  items: NavSecondaryItem[];
}

export function NavSecondary({
  sections,
}: {
  sections: NavSecondarySection[];
}) {
  const pathname = usePathname();

  return (
    <>
      {sections.map((section, sectionIndex) => (
        <SidebarGroup key={sectionIndex}>
          {section.label && (
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
          )}
          <SidebarMenu>
            {section.items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={!item.external && pathname.startsWith(item.url)}
                >
                  {item.external ? (
                    <Link
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  ) : (
                    <Link href={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <ThemeToggleMenu />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}

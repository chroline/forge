"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Status = "active" | "archived" | "pending";

interface DatasetSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: Status | "all";
  onStatusFilterChange: (status: Status | "all") => void;
}

const getStatusText = (status: string) => {
  switch (status) {
    case "active":
      return "Active";
    case "archived":
      return "Archived";
    case "pending":
      return "Pending";
    default:
      return status;
  }
};

export function DatasetSearch({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: DatasetSearchProps) {
  return (
    <div className="space-y-3">
      <Input
        placeholder="Search datasets..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full"
      />

      {/* Status Filter */}
      <div className="flex gap-1">
        {(["all", "active", "archived", "pending"] as const).map((status) => (
          <button
            key={status}
            onClick={() => onStatusFilterChange(status)}
            className={cn(
              "px-2 py-1 text-xs rounded-md transition-colors",
              statusFilter === status
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {status === "all" ? "All" : getStatusText(status)}
          </button>
        ))}
      </div>
    </div>
  );
}

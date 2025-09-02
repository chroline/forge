"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Status = "running" | "completed" | "failed" | "pending";

interface ExperimentSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: Status | "all";
  onStatusFilterChange: (status: Status | "all") => void;
}

export function ExperimentSearch({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: ExperimentSearchProps) {
  const getStatusText = (status: Status) => {
    switch (status) {
      case "running":
        return "Running";
      case "completed":
        return "Completed";
      case "failed":
        return "Failed";
      case "pending":
        return "Pending";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-3">
      <Input
        placeholder="Search experiments..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full"
      />

      {/* Status Filter */}
      <div className="flex gap-1">
        {(["all", "running", "completed", "failed", "pending"] as const).map(
          (status) => (
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
          )
        )}
      </div>
    </div>
  );
}

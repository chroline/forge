"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { type Dataset } from "@/lib/api";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface DatasetCardProps {
  dataset: Dataset;
  isActive: boolean;
  isSelected?: boolean;
  onSelectionChange?: (datasetId: string, selected: boolean) => void;
  showCheckbox?: boolean;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "success";
    case "archived":
      return "secondary";
    case "pending":
      return "warning";
    default:
      return "default";
  }
};

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

export function DatasetCard({
  dataset,
  isActive,
  isSelected = false,
  onSelectionChange,
  showCheckbox = false,
}: DatasetCardProps) {
  const handleCheckboxChange = (checked: boolean) => {
    onSelectionChange?.(dataset.id, checked);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // If checkbox is clicked, don't navigate
    if ((e.target as HTMLElement).closest("[data-checkbox]")) {
      e.preventDefault();
      return;
    }
  };

  return (
    <Link
      href={`/dashboard/datasets/${dataset.id}`}
      className="block"
      onClick={handleCardClick}
    >
      <Card
        className={cn(
          "cursor-pointer transition-all hover:shadow-md py-0 relative",
          isActive && "ring-2 ring-primary"
        )}
      >
        {/* Checkbox in top right */}
        {showCheckbox && (
          <div className="absolute top-2 right-2 z-10" data-checkbox>
            <Checkbox
              checked={isSelected}
              onCheckedChange={handleCheckboxChange}
              className="bg-background border-border"
            />
          </div>
        )}

        <CardHeader className="p-3">
          <div className="flex-1 min-w-0">
            <Badge
              variant={getStatusColor(dataset.status)}
              className="text-xs mb-3"
            >
              {getStatusText(dataset.status)}
            </Badge>
            <CardTitle className="text-sm font-medium truncate mb-1">
              {dataset.name}
            </CardTitle>
            <CardDescription className="text-xs line-clamp-2">
              {dataset.description}
            </CardDescription>
          </div>

          {/* Dataset Stats */}
          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            <span>{dataset.entries.toLocaleString()} entries</span>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}

"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { type Experiment } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ExperimentCardProps {
  experiment: Experiment;
  isActive: boolean;
  isSelected?: boolean;
  onSelectionChange?: (experimentId: string, selected: boolean) => void;
  showCheckbox?: boolean;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "running":
      return "default";
    case "completed":
      return "success";
    case "failed":
      return "destructive";
    case "pending":
      return "secondary";
    default:
      return "default";
  }
};

const getStatusText = (status: string) => {
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

export function ExperimentCard({
  experiment,
  isActive,
  isSelected = false,
  onSelectionChange,
  showCheckbox = false,
}: ExperimentCardProps) {
  const handleCheckboxChange = (checked: boolean) => {
    onSelectionChange?.(experiment.id, checked);
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
      href={`/dashboard/experiments/${experiment.id}`}
      className="block"
      onClick={handleCardClick}
    >
      <Card
        className={cn(
          "cursor-pointer transition-all hover:shadow-md py-0 relative border-1 hover:border-primary hover:shadow-none",
          isActive && "border-primary"
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
              variant={getStatusColor(experiment.status)}
              className="text-xs mb-3"
            >
              {getStatusText(experiment.status)}
            </Badge>
            <CardTitle className="text-sm font-medium truncate mb-1">
              {experiment.name}
            </CardTitle>
            <CardDescription className="text-xs line-clamp-2">
              {experiment.description}
            </CardDescription>
          </div>

          {/* Experiment Stats */}
          {experiment.metrics && (
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span>{(experiment.metrics.accuracy * 100).toFixed(1)}%</span>
              <span>{experiment.metrics.iterations} iterations</span>
            </div>
          )}

          {/* Model */}
          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            <span className="font-medium">{experiment.model}</span>
          </div>

          {/* Dataset */}
          <div className="text-xs text-muted-foreground mt-1">
            Dataset: {experiment.dataset}
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}

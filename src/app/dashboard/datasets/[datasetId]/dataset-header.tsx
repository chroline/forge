"use client";

import { Badge } from "@/components/ui/badge";

interface DatasetHeaderProps {
  name: string;
  status: string;
  description: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "success";
    case "archived":
      return "secondary";
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
    default:
      return status;
  }
};

export function DatasetHeader({
  name,
  status,
  description,
}: DatasetHeaderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{name}</h1>
        <Badge variant={getStatusColor(status)}>{getStatusText(status)}</Badge>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

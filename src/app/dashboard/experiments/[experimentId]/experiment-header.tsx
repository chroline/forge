"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Pause, Play, Trash2 } from "lucide-react";

interface ExperimentHeaderProps {
  name: string;
  description: string;
  status: string;
}

export function ExperimentHeader({
  name,
  description,
  status,
}: ExperimentHeaderProps) {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <Badge variant={getStatusColor(status)}>{getStatusText(status)}</Badge>
      </div>
      <div className="flex items-center gap-2">
        {status === "running" && (
          <Button variant="outline" size="sm" className="flex-1">
            <Pause className="mr-2 h-4 w-4" />
            Pause
          </Button>
        )}
        {status === "pending" && (
          <Button size="sm" className="flex-1">
            <Play className="mr-2 h-4 w-4" />
            Start
          </Button>
        )}
        <Button variant="outline" size="sm" className="flex-1">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>
    </div>
  );
}

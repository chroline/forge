"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download } from "lucide-react";

export function ExperimentActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions</CardTitle>
        <CardDescription>Manage your experiment</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Results
          </Button>
          <Button variant="outline">Clone Experiment</Button>
          <Button variant="outline">View Logs</Button>
          <Button variant="outline">Share</Button>
        </div>
      </CardContent>
    </Card>
  );
}

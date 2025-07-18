"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, FileText } from "lucide-react";

interface DatasetStatsProps {
  entries: number;
  columns: number;
}

export function DatasetStats({ entries, columns }: DatasetStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Entries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{entries.toLocaleString()}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Database className="h-4 w-4" />
            Columns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{columns}</div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Archive, Download, Eye, EyeOff, Trash2 } from "lucide-react";

interface DatasetActionsProps {
  onViewData?: () => void;
  showEntries?: boolean;
}

export function DatasetActions({ onViewData, showEntries }: DatasetActionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Button variant="default" onClick={onViewData}>
            {showEntries ? (
              <>
                <EyeOff className="mr-2 h-4 w-4" />
                Hide Data
              </>
            ) : (
              <>
                <Eye className="mr-2 h-4 w-4" />
                View Data
              </>
            )}
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button variant="outline">
            <Archive className="mr-2 h-4 w-4" />
            Archive
          </Button>
          <Button variant="outline" className="text-destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

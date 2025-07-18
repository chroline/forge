"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function DatasetError() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Dataset Details</h1>
        <p className="text-muted-foreground">
          View detailed information about the dataset.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-destructive">Failed to load dataset</p>
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

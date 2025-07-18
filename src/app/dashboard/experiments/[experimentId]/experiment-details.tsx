"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ExperimentDetailsProps {
  dataset: string;
  model: string;
  framework: string;
  createdAt: string;
  updatedAt: string;
}

export function ExperimentDetails({
  dataset,
  model,
  framework,
  createdAt,
  updatedAt,
}: ExperimentDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Experiment Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Dataset
          </label>
          <p>{dataset}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Model
          </label>
          <p>{model}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Framework
          </label>
          <p>{framework}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Created
          </label>
          <p>{createdAt}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Last Updated
          </label>
          <p>{updatedAt}</p>
        </div>
      </CardContent>
    </Card>
  );
}

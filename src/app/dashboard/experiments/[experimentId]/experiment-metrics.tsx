"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ExperimentMetrics {
  accuracy: number;
  loss: number;
  iterations: number;
}

interface ExperimentMetricsProps {
  metrics?: ExperimentMetrics | null;
}

export function ExperimentMetrics({ metrics }: ExperimentMetricsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Metrics</CardTitle>
        <CardDescription>
          Performance metrics for this experiment
        </CardDescription>
      </CardHeader>
      <CardContent>
        {metrics ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Accuracy
              </label>
              <p className="text-2xl font-bold">
                {(metrics.accuracy * 100).toFixed(1)}%
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Loss
              </label>
              <p className="text-2xl font-bold">{metrics.loss.toFixed(3)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Iterations
              </label>
              <p className="text-2xl font-bold">{metrics.iterations}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No metrics available yet</p>
            <p className="text-sm">
              Metrics will appear once the experiment starts running
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

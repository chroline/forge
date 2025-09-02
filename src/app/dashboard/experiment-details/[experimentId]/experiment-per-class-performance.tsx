"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

interface MultiClassConfusionMatrix {
  [key: string]: { [key: string]: number };
}

interface ExperimentPerClassPerformanceProps {
  confusionMatrix: MultiClassConfusionMatrix;
}

export function ExperimentPerClassPerformance({
  confusionMatrix,
}: ExperimentPerClassPerformanceProps) {
  const classes = Object.keys(confusionMatrix);

  // Calculate per-class metrics
  const classMetrics = classes.map((className) => {
    const tp = confusionMatrix[className][className];
    const fp =
      Object.values(confusionMatrix).reduce(
        (sum, row) => sum + row[className],
        0
      ) - tp;
    const fn =
      Object.values(confusionMatrix[className]).reduce(
        (sum, val) => sum + val,
        0
      ) - tp;

    const precision = tp + fp > 0 ? tp / (tp + fp) : 0;
    const recall = tp + fn > 0 ? tp / (tp + fn) : 0;
    const f1 =
      precision + recall > 0
        ? (2 * precision * recall) / (precision + recall)
        : 0;

    return {
      className,
      tp,
      fp,
      fn,
      precision,
      recall,
      f1,
      total: tp + fn,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-blue-600" />
          <span>Per-Class Performance</span>
        </CardTitle>
        <CardDescription>
          Detailed performance metrics for each classification category
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {classMetrics.map((metrics) => (
            <div
              key={metrics.className}
              className="p-3 bg-gray-50 rounded-lg border"
            >
              <div className="font-medium text-sm mb-2 truncate">
                {metrics.className}
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center">
                  <div className="font-bold text-blue-600">
                    {(metrics.precision * 100).toFixed(1)}%
                  </div>
                  <div className="text-muted-foreground">Precision</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-purple-600">
                    {(metrics.recall * 100).toFixed(1)}%
                  </div>
                  <div className="text-muted-foreground">Recall</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-green-600">
                    {(metrics.f1 * 100).toFixed(1)}%
                  </div>
                  <div className="text-muted-foreground">F1</div>
                </div>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Correct: {metrics.tp}/{metrics.total} (
                {((metrics.tp / metrics.total) * 100).toFixed(1)}%)
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}






"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface MultiClassConfusionMatrix {
  [key: string]: { [key: string]: number };
}

interface ExperimentErrorAnalysisProps {
  confusionMatrix: MultiClassConfusionMatrix;
}

export function ExperimentErrorAnalysis({
  confusionMatrix,
}: ExperimentErrorAnalysisProps) {
  const classes = Object.keys(confusionMatrix);

  // Calculate per-class metrics for error analysis
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

    return {
      className,
      tp,
      fp,
      fn,
      total: tp + fn,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <span>Error Analysis</span>
        </CardTitle>
        <CardDescription>
          Analysis of classification errors and confusion patterns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {classMetrics
            .sort((a, b) => b.fp - a.fp)
            .slice(0, 3)
            .map((metrics) => (
              <div
                key={metrics.className}
                className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <div>
                  <div className="font-medium text-red-700 flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Most Confused: {metrics.className}</span>
                  </div>
                  <div className="text-sm text-red-600">
                    {metrics.fp} false positives, {metrics.fn} false negatives
                  </div>
                </div>
                <Badge variant="destructive" className="text-sm">
                  {(((metrics.fp + metrics.fn) / metrics.total) * 100).toFixed(
                    1
                  )}
                  % error rate
                </Badge>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}






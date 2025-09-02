"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface MultiClassConfusionMatrix {
  [key: string]: { [key: string]: number };
}

interface ExperimentOverallMetricsProps {
  confusionMatrix: MultiClassConfusionMatrix;
}

export function ExperimentOverallMetrics({
  confusionMatrix,
}: ExperimentOverallMetricsProps) {
  const classes = Object.keys(confusionMatrix);

  // Calculate total samples
  const total = Object.values(confusionMatrix).reduce(
    (sum, row) =>
      sum + Object.values(row).reduce((rowSum, val) => rowSum + val, 0),
    0
  );

  // Calculate per-class metrics for overall calculations
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

    return {
      precision,
      recall,
    };
  });

  // Calculate overall accuracy
  const totalCorrect = classes.reduce(
    (sum, className) => sum + confusionMatrix[className][className],
    0
  );
  const overallAccuracy = totalCorrect / total;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-purple-600" />
          <span>Overall Metrics</span>
        </CardTitle>
        <CardDescription>
          High-level performance metrics across all classification categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-blue-50 rounded-lg border">
            <div className="text-lg font-bold text-blue-600">
              {(overallAccuracy * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground">
              Overall Accuracy
            </div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg border">
            <div className="text-lg font-bold text-purple-600">
              {(
                (classMetrics.reduce((sum, m) => sum + m.precision, 0) /
                  classes.length) *
                100
              ).toFixed(1)}
              %
            </div>
            <div className="text-xs text-muted-foreground">Macro Precision</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg border">
            <div className="text-lg font-bold text-orange-600">
              {(
                (classMetrics.reduce((sum, m) => sum + m.recall, 0) /
                  classes.length) *
                100
              ).toFixed(1)}
              %
            </div>
            <div className="text-xs text-muted-foreground">Macro Recall</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}






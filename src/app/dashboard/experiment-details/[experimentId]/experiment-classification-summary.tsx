"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText } from "lucide-react";

interface MultiClassConfusionMatrix {
  [key: string]: { [key: string]: number };
}

interface ExperimentClassificationSummaryProps {
  confusionMatrix: MultiClassConfusionMatrix;
}

export function ExperimentClassificationSummary({
  confusionMatrix,
}: ExperimentClassificationSummaryProps) {
  const classes = Object.keys(confusionMatrix);

  // Calculate total samples
  const total = Object.values(confusionMatrix).reduce(
    (sum, row) =>
      sum + Object.values(row).reduce((rowSum, val) => rowSum + val, 0),
    0
  );

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
          <FileText className="h-5 w-5 text-gray-600" />
          <span>Classification Summary</span>
        </CardTitle>
        <CardDescription>
          Overview of classification performance and dataset statistics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h5 className="font-medium text-gray-900 mb-2">Summary</h5>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              • Total samples: <span className="font-medium">{total}</span>
            </p>
            <p>
              • Correct predictions:{" "}
              <span className="font-medium text-green-600">{totalCorrect}</span>
            </p>
            <p>
              • Incorrect predictions:{" "}
              <span className="font-medium text-red-600">
                {total - totalCorrect}
              </span>
            </p>
            <p>
              • Overall accuracy:{" "}
              <span className="font-medium text-blue-600">
                {(overallAccuracy * 100).toFixed(1)}%
              </span>
            </p>
            <p>
              • Classes: <span className="font-medium">{classes.length}</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}






"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import React from "react";

interface MultiClassConfusionMatrix {
  [key: string]: { [key: string]: number };
}

interface ExperimentMultiClassConfusionMatrixProps {
  confusionMatrix: MultiClassConfusionMatrix;
}

export function ExperimentMultiClassConfusionMatrix({
  confusionMatrix,
}: ExperimentMultiClassConfusionMatrixProps) {
  const classes = Object.keys(confusionMatrix);

  // Calculate total samples
  const total = Object.values(confusionMatrix).reduce(
    (sum, row) =>
      sum + Object.values(row).reduce((rowSum, val) => rowSum + val, 0),
    0
  );

  // Get max value for color scaling
  const maxValue = Math.max(
    ...classes.map((className) =>
      Math.max(...Object.values(confusionMatrix[className]))
    )
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span>Multi-Class Confusion Matrix</span>
        </CardTitle>
        <CardDescription>
          Detailed breakdown of classification predictions across all intent
          categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Multi-Class Confusion Matrix Heatmap */}
        <div>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Main grid container */}
              <div
                className="grid gap-px bg-gray-200 rounded-lg overflow-hidden"
                style={{
                  gridTemplateColumns: `minmax(120px, auto) repeat(${classes.length}, minmax(100px, 1fr))`,
                  gridTemplateRows: `auto repeat(${classes.length}, 1fr)`,
                }}
              >
                {/* Top-left empty cell */}
                <div className="bg-white p-3"></div>

                {/* Header row */}
                {classes.map((className) => (
                  <div key={className} className="bg-gray-50 p-3 text-center">
                    <div className="text-xs text-gray-500 mb-1">Predicted</div>
                    <div className="font-medium text-sm truncate">
                      {className}
                    </div>
                  </div>
                ))}

                {/* Matrix rows */}
                {classes.map((actualClass) => (
                  <React.Fragment key={actualClass}>
                    {/* Row header */}
                    <div className="bg-gray-50 p-3 flex flex-col justify-center">
                      <div className="text-xs text-gray-500 mb-1">Actual</div>
                      <div className="font-medium text-sm truncate">
                        {actualClass}
                      </div>
                    </div>

                    {/* Matrix cells */}
                    {classes.map((predictedClass) => {
                      const value =
                        confusionMatrix[actualClass][predictedClass];
                      const isDiagonal = actualClass === predictedClass;
                      const percentage = ((value / total) * 100).toFixed(1);
                      const intensity = value / maxValue;

                      return (
                        <div
                          key={predictedClass}
                          className="relative bg-white h-20 transition-colors duration-200 hover:opacity-90"
                          style={{
                            backgroundColor: isDiagonal
                              ? `rgba(34, 197, 94, ${Math.max(0.1, intensity)})` // Green
                              : value > 0
                              ? `rgba(239, 68, 68, ${Math.max(0.1, intensity)})` // Red
                              : "white",
                          }}
                        >
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div
                              className="font-bold text-lg"
                              style={{
                                color: intensity > 0.5 ? "white" : "black",
                              }}
                            >
                              {value}
                            </div>
                            <div
                              className="text-xs"
                              style={{
                                color:
                                  intensity > 0.5
                                    ? "rgba(255,255,255,0.8)"
                                    : "rgba(0,0,0,0.6)",
                              }}
                            >
                              {percentage}%
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center mt-3 text-xs text-muted-foreground">
            <div className="flex justify-center items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-400 rounded"></div>
                <span>Correct Predictions</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-400 rounded"></div>
                <span>Incorrect Predictions</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

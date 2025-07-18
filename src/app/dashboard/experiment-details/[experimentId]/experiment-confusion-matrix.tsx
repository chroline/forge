"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface ConfusionMatrix {
  truePositives: number;
  trueNegatives: number;
  falsePositives: number;
  falseNegatives: number;
}

interface ExperimentConfusionMatrixProps {
  confusionMatrix: ConfusionMatrix;
}

export function ExperimentConfusionMatrix({
  confusionMatrix,
}: ExperimentConfusionMatrixProps) {
  const total =
    confusionMatrix.truePositives +
    confusionMatrix.trueNegatives +
    confusionMatrix.falsePositives +
    confusionMatrix.falseNegatives;

  const tpPercentage = ((confusionMatrix.truePositives / total) * 100).toFixed(
    1
  );
  const tnPercentage = ((confusionMatrix.trueNegatives / total) * 100).toFixed(
    1
  );
  const fpPercentage = ((confusionMatrix.falsePositives / total) * 100).toFixed(
    1
  );
  const fnPercentage = ((confusionMatrix.falseNegatives / total) * 100).toFixed(
    1
  );

  const accuracy = (
    ((confusionMatrix.truePositives + confusionMatrix.trueNegatives) / total) *
    100
  ).toFixed(1);
  const precision =
    confusionMatrix.truePositives > 0
      ? (
          (confusionMatrix.truePositives /
            (confusionMatrix.truePositives + confusionMatrix.falsePositives)) *
          100
        ).toFixed(1)
      : "0.0";
  const recall =
    confusionMatrix.truePositives > 0
      ? (
          (confusionMatrix.truePositives /
            (confusionMatrix.truePositives + confusionMatrix.falseNegatives)) *
          100
        ).toFixed(1)
      : "0.0";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span>Confusion Matrix Analysis</span>
        </CardTitle>
        <CardDescription>
          Detailed breakdown of classification predictions vs actual outcomes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Visual Confusion Matrix */}
        <div>
          <h4 className="text-sm font-medium mb-4">Confusion Matrix Heatmap</h4>
          <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto">
            <div className="text-center p-4 bg-green-100 border-2 border-green-200 rounded-lg">
              <div className="text-2xl font-bold text-green-700">
                {confusionMatrix.truePositives}
              </div>
              <div className="text-sm text-green-600 font-medium">
                True Positives
              </div>
              <div className="text-xs text-green-500">{tpPercentage}%</div>
            </div>
            <div className="text-center p-4 bg-red-100 border-2 border-red-200 rounded-lg">
              <div className="text-2xl font-bold text-red-700">
                {confusionMatrix.falsePositives}
              </div>
              <div className="text-sm text-red-600 font-medium">
                False Positives
              </div>
              <div className="text-xs text-red-500">{fpPercentage}%</div>
            </div>
            <div className="text-center p-4 bg-red-100 border-2 border-red-200 rounded-lg">
              <div className="text-2xl font-bold text-red-700">
                {confusionMatrix.falseNegatives}
              </div>
              <div className="text-sm text-red-600 font-medium">
                False Negatives
              </div>
              <div className="text-xs text-red-500">{fnPercentage}%</div>
            </div>
            <div className="text-center p-4 bg-green-100 border-2 border-green-200 rounded-lg">
              <div className="text-2xl font-bold text-green-700">
                {confusionMatrix.trueNegatives}
              </div>
              <div className="text-sm text-green-600 font-medium">
                True Negatives
              </div>
              <div className="text-xs text-green-500">{tnPercentage}%</div>
            </div>
          </div>
          <div className="text-center mt-3 text-xs text-muted-foreground">
            <div className="flex justify-center items-center space-x-8">
              <span>Predicted →</span>
              <span>Actual ↓</span>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div>
          <h4 className="text-sm font-medium mb-3">Key Metrics</h4>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-blue-50 rounded-lg border">
              <div className="text-lg font-bold text-blue-600">{accuracy}%</div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg border">
              <div className="text-lg font-bold text-purple-600">
                {precision}%
              </div>
              <div className="text-xs text-muted-foreground">Precision</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg border">
              <div className="text-lg font-bold text-orange-600">{recall}%</div>
              <div className="text-xs text-muted-foreground">Recall</div>
            </div>
          </div>
        </div>

        {/* Detailed Statistics */}
        <div>
          <h4 className="text-sm font-medium mb-3">Detailed Statistics</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Correct Predictions</span>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">
                  {confusionMatrix.truePositives +
                    confusionMatrix.trueNegatives}
                </div>
                <div className="text-xs text-green-500">
                  {(
                    ((confusionMatrix.truePositives +
                      confusionMatrix.trueNegatives) /
                      total) *
                    100
                  ).toFixed(1)}
                  %
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border">
              <div className="flex items-center space-x-2">
                <XCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium">
                  Incorrect Predictions
                </span>
              </div>
              <div className="text-right">
                <div className="font-bold text-red-600">
                  {confusionMatrix.falsePositives +
                    confusionMatrix.falseNegatives}
                </div>
                <div className="text-xs text-red-500">
                  {(
                    ((confusionMatrix.falsePositives +
                      confusionMatrix.falseNegatives) /
                      total) *
                    100
                  ).toFixed(1)}
                  %
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Analysis */}
        <div>
          <h4 className="text-sm font-medium mb-3">Error Analysis</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
              <div>
                <div className="font-medium text-red-700 flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Type I Errors (False Positives)</span>
                </div>
                <div className="text-sm text-red-600">
                  Model incorrectly predicted positive when actual was negative
                </div>
              </div>
              <Badge variant="destructive" className="text-sm">
                {confusionMatrix.falsePositives} ({fpPercentage}%)
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
              <div>
                <div className="font-medium text-red-700 flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Type II Errors (False Negatives)</span>
                </div>
                <div className="text-sm text-red-600">
                  Model incorrectly predicted negative when actual was positive
                </div>
              </div>
              <Badge variant="destructive" className="text-sm">
                {confusionMatrix.falseNegatives} ({fnPercentage}%)
              </Badge>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h5 className="font-medium text-gray-900 mb-2">Summary</h5>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              • Total samples: <span className="font-medium">{total}</span>
            </p>
            <p>
              • Correct predictions:{" "}
              <span className="font-medium text-green-600">
                {confusionMatrix.truePositives + confusionMatrix.trueNegatives}
              </span>
            </p>
            <p>
              • Incorrect predictions:{" "}
              <span className="font-medium text-red-600">
                {confusionMatrix.falsePositives +
                  confusionMatrix.falseNegatives}
              </span>
            </p>
            <p>
              • Overall accuracy:{" "}
              <span className="font-medium text-blue-600">{accuracy}%</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

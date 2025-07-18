"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Confusion Matrix</CardTitle>
        <CardDescription>
          Detailed breakdown of classification predictions vs actual outcomes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Visual Confusion Matrix */}
          <div>
            <h4 className="text-sm font-medium mb-4">
              Confusion Matrix Heatmap
            </h4>
            <div className="grid grid-cols-2 gap-1 max-w-md mx-auto">
              <div className="text-center p-4 bg-green-100 border rounded-lg">
                <div className="text-2xl font-bold text-green-700">
                  {confusionMatrix.truePositives}
                </div>
                <div className="text-xs text-green-600">True Positives</div>
                <div className="text-xs text-green-500">{tpPercentage}%</div>
              </div>
              <div className="text-center p-4 bg-red-100 border rounded-lg">
                <div className="text-2xl font-bold text-red-700">
                  {confusionMatrix.falsePositives}
                </div>
                <div className="text-xs text-red-600">False Positives</div>
                <div className="text-xs text-red-500">{fpPercentage}%</div>
              </div>
              <div className="text-center p-4 bg-red-100 border rounded-lg">
                <div className="text-2xl font-bold text-red-700">
                  {confusionMatrix.falseNegatives}
                </div>
                <div className="text-xs text-red-600">False Negatives</div>
                <div className="text-xs text-red-500">{fnPercentage}%</div>
              </div>
              <div className="text-center p-4 bg-green-100 border rounded-lg">
                <div className="text-2xl font-bold text-green-700">
                  {confusionMatrix.trueNegatives}
                </div>
                <div className="text-xs text-green-600">True Negatives</div>
                <div className="text-xs text-green-500">{tnPercentage}%</div>
              </div>
            </div>
            <div className="text-center mt-2 text-xs text-muted-foreground">
              Predicted → | Actual ↓
            </div>
          </div>

          {/* Detailed Statistics */}
          <div>
            <h4 className="text-sm font-medium mb-4">Detailed Statistics</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold text-green-600">
                  {confusionMatrix.truePositives}
                </div>
                <div className="text-xs text-muted-foreground">
                  True Positives
                </div>
                <div className="text-xs text-green-500">{tpPercentage}%</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold text-red-600">
                  {confusionMatrix.falsePositives}
                </div>
                <div className="text-xs text-muted-foreground">
                  False Positives
                </div>
                <div className="text-xs text-red-500">{fpPercentage}%</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold text-red-600">
                  {confusionMatrix.falseNegatives}
                </div>
                <div className="text-xs text-muted-foreground">
                  False Negatives
                </div>
                <div className="text-xs text-red-500">{fnPercentage}%</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold text-green-600">
                  {confusionMatrix.trueNegatives}
                </div>
                <div className="text-xs text-muted-foreground">
                  True Negatives
                </div>
                <div className="text-xs text-green-500">{tnPercentage}%</div>
              </div>
            </div>
          </div>

          {/* Summary Metrics */}
          <div>
            <h4 className="text-sm font-medium mb-4">Summary Metrics</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 border rounded-lg">
                <div className="text-lg font-bold">{total}</div>
                <div className="text-xs text-muted-foreground">
                  Total Samples
                </div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-lg font-bold text-blue-600">
                  {(
                    ((confusionMatrix.truePositives +
                      confusionMatrix.trueNegatives) /
                      total) *
                    100
                  ).toFixed(1)}
                  %
                </div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-lg font-bold text-purple-600">
                  {confusionMatrix.truePositives > 0
                    ? (
                        (confusionMatrix.truePositives /
                          (confusionMatrix.truePositives +
                            confusionMatrix.falsePositives)) *
                        100
                      ).toFixed(1)
                    : "0.0"}
                  %
                </div>
                <div className="text-xs text-muted-foreground">Precision</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-lg font-bold text-orange-600">
                  {confusionMatrix.truePositives > 0
                    ? (
                        (confusionMatrix.truePositives /
                          (confusionMatrix.truePositives +
                            confusionMatrix.falseNegatives)) *
                        100
                      ).toFixed(1)
                    : "0.0"}
                  %
                </div>
                <div className="text-xs text-muted-foreground">Recall</div>
              </div>
            </div>
          </div>

          {/* Error Analysis */}
          <div>
            <h4 className="text-sm font-medium mb-4">Error Analysis</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div>
                  <div className="font-medium text-red-700">
                    Type I Errors (False Positives)
                  </div>
                  <div className="text-sm text-red-600">
                    Model incorrectly predicted positive when actual was
                    negative
                  </div>
                </div>
                <Badge variant="destructive">
                  {confusionMatrix.falsePositives}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div>
                  <div className="font-medium text-red-700">
                    Type II Errors (False Negatives)
                  </div>
                  <div className="text-sm text-red-600">
                    Model incorrectly predicted negative when actual was
                    positive
                  </div>
                </div>
                <Badge variant="destructive">
                  {confusionMatrix.falseNegatives}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

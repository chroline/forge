"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExperimentMetrics } from "@/lib/types";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
} from "lucide-react";

interface ExperimentMetricsOverviewProps {
  metrics: ExperimentMetrics | null;
}

export function ExperimentMetricsOverview({
  metrics,
}: ExperimentMetricsOverviewProps) {
  if (!metrics) {
    return (
      <div className="text-center py-12">
        <div className="p-4 bg-gray-100 rounded-full w-fit mx-auto mb-4">
          <Clock className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No Metrics Available
        </h3>
        <p className="text-gray-600">
          Metrics will appear once the experiment starts running
        </p>
      </div>
    );
  }

  const getMetricColor = (value: number, threshold: number = 0.8) => {
    if (value >= threshold) return "text-green-600";
    if (value >= threshold * 0.8) return "text-yellow-600";
    return "text-red-600";
  };

  const getMetricIcon = (value: number, threshold: number = 0.8) => {
    if (value >= threshold)
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (value >= threshold * 0.8)
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    return <AlertTriangle className="h-4 w-4 text-red-500" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Performance Overview
        </h2>
        <p className="text-gray-600">
          Key metrics and performance indicators for this experiment
        </p>
      </div>

      {/* Basic Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Accuracy
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {(metrics.accuracy * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {metrics.accuracy > 0.9
                ? "Excellent"
                : metrics.accuracy > 0.8
                ? "Good"
                : "Needs improvement"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Loss</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {metrics.loss.toFixed(3)}
            </div>
            <p className="text-xs text-muted-foreground">
              {metrics.loss < 0.1
                ? "Low loss"
                : metrics.loss < 0.2
                ? "Moderate loss"
                : "High loss"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Training Epochs
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {metrics.epochs}
            </div>
            <p className="text-xs text-muted-foreground">
              {metrics.epochs > 50
                ? "Well trained"
                : metrics.epochs > 25
                ? "Moderately trained"
                : "Light training"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Classification Metrics */}
      {metrics.classificationMetrics && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Classification Metrics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center space-x-2">
                    <span>Precision</span>
                    {getMetricIcon(metrics.classificationMetrics.precision)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={`text-2xl font-bold ${getMetricColor(
                      metrics.classificationMetrics.precision
                    )}`}
                  >
                    {(metrics.classificationMetrics.precision * 100).toFixed(1)}
                    %
                  </div>
                  <p className="text-xs text-muted-foreground">
                    True positives / (True positives + False positives)
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center space-x-2">
                    <span>Recall</span>
                    {getMetricIcon(metrics.classificationMetrics.recall)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={`text-2xl font-bold ${getMetricColor(
                      metrics.classificationMetrics.recall
                    )}`}
                  >
                    {(metrics.classificationMetrics.recall * 100).toFixed(1)}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    True positives / (True positives + False negatives)
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center space-x-2">
                    <span>F1 Score</span>
                    {getMetricIcon(metrics.classificationMetrics.f1Score)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={`text-2xl font-bold ${getMetricColor(
                      metrics.classificationMetrics.f1Score
                    )}`}
                  >
                    {(metrics.classificationMetrics.f1Score * 100).toFixed(1)}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Harmonic mean of precision and recall
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center space-x-2">
                    <span>AUC</span>
                    {getMetricIcon(metrics.classificationMetrics.auc)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={`text-2xl font-bold ${getMetricColor(
                      metrics.classificationMetrics.auc
                    )}`}
                  >
                    {(metrics.classificationMetrics.auc * 100).toFixed(1)}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Area under the ROC curve
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Specificity & Sensitivity
                </CardTitle>
                <CardDescription>
                  Model's ability to correctly identify negative and positive
                  cases
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Specificity</span>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-lg font-bold ${getMetricColor(
                        metrics.classificationMetrics.specificity
                      )}`}
                    >
                      {(
                        metrics.classificationMetrics.specificity * 100
                      ).toFixed(1)}
                      %
                    </span>
                    {getMetricIcon(metrics.classificationMetrics.specificity)}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Sensitivity</span>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-lg font-bold ${getMetricColor(
                        metrics.classificationMetrics.sensitivity
                      )}`}
                    >
                      {(
                        metrics.classificationMetrics.sensitivity * 100
                      ).toFixed(1)}
                      %
                    </span>
                    {getMetricIcon(metrics.classificationMetrics.sensitivity)}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance Summary</CardTitle>
                <CardDescription>
                  Overall model performance indicators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {metrics.classificationMetrics.accuracy > 0.9 && (
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-800"
                    >
                      High Accuracy
                    </Badge>
                  )}
                  {metrics.classificationMetrics.f1Score > 0.85 && (
                    <Badge
                      variant="default"
                      className="bg-blue-100 text-blue-800"
                    >
                      Strong F1 Score
                    </Badge>
                  )}
                  {metrics.classificationMetrics.auc > 0.9 && (
                    <Badge
                      variant="default"
                      className="bg-purple-100 text-purple-800"
                    >
                      Excellent AUC
                    </Badge>
                  )}
                  {metrics.classificationMetrics.precision > 0.9 && (
                    <Badge
                      variant="default"
                      className="bg-orange-100 text-orange-800"
                    >
                      High Precision
                    </Badge>
                  )}
                  {metrics.classificationMetrics.recall > 0.9 && (
                    <Badge
                      variant="default"
                      className="bg-cyan-100 text-cyan-800"
                    >
                      High Recall
                    </Badge>
                  )}
                  {metrics.loss < 0.1 && (
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-800"
                    >
                      Low Loss
                    </Badge>
                  )}
                  {metrics.epochs > 50 && (
                    <Badge
                      variant="default"
                      className="bg-yellow-100 text-yellow-800"
                    >
                      Well Trained
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

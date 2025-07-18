"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ClassificationMetrics } from "@/lib/types";
import {
  AlertTriangle,
  BarChart3,
  CheckCircle,
  Info,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

interface ExperimentPerformanceAnalysisProps {
  metrics: ClassificationMetrics;
}

export function ExperimentPerformanceAnalysis({
  metrics,
}: ExperimentPerformanceAnalysisProps) {
  const getPerformanceLevel = (value: number) => {
    if (value >= 0.9)
      return {
        level: "Excellent",
        color: "text-green-600",
        bg: "bg-green-50",
        border: "border-green-200",
      };
    if (value >= 0.8)
      return {
        level: "Good",
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-200",
      };
    if (value >= 0.7)
      return {
        level: "Fair",
        color: "text-yellow-600",
        bg: "bg-yellow-50",
        border: "border-yellow-200",
      };
    return {
      level: "Poor",
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
    };
  };

  const getRecommendations = () => {
    const recommendations = [];

    if (metrics.precision < 0.8) {
      recommendations.push(
        "Consider reducing false positives by improving prompt specificity"
      );
    }
    if (metrics.recall < 0.8) {
      recommendations.push(
        "Focus on reducing false negatives by enhancing prompt sensitivity"
      );
    }
    if (metrics.f1Score < 0.8) {
      recommendations.push(
        "Balance precision and recall by optimizing prompt engineering"
      );
    }
    if (metrics.auc < 0.8) {
      recommendations.push("Improve overall model discrimination ability");
    }

    if (recommendations.length === 0) {
      recommendations.push(
        "Model performance is excellent! Consider fine-tuning for edge cases"
      );
    }

    return recommendations;
  };

  const accuracyLevel = getPerformanceLevel(metrics.accuracy);
  const precisionLevel = getPerformanceLevel(metrics.precision);
  const recallLevel = getPerformanceLevel(metrics.recall);
  const f1Level = getPerformanceLevel(metrics.f1Score);
  const aucLevel = getPerformanceLevel(metrics.auc);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-blue-600" />
          <span>Performance Analysis</span>
        </CardTitle>
        <CardDescription>
          Detailed analysis and insights for model performance optimization
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Performance Levels */}
        <div>
          <h4 className="text-sm font-medium mb-3">Performance Assessment</h4>
          <div className="space-y-3">
            <div
              className={`p-3 rounded-lg border ${accuracyLevel.bg} ${accuracyLevel.border}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium">Accuracy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`font-bold ${accuracyLevel.color}`}>
                    {(metrics.accuracy * 100).toFixed(1)}%
                  </span>
                  <Badge variant="outline" className={accuracyLevel.color}>
                    {accuracyLevel.level}
                  </Badge>
                </div>
              </div>
            </div>

            <div
              className={`p-3 rounded-lg border ${precisionLevel.bg} ${precisionLevel.border}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium">Precision</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`font-bold ${precisionLevel.color}`}>
                    {(metrics.precision * 100).toFixed(1)}%
                  </span>
                  <Badge variant="outline" className={precisionLevel.color}>
                    {precisionLevel.level}
                  </Badge>
                </div>
              </div>
            </div>

            <div
              className={`p-3 rounded-lg border ${recallLevel.bg} ${recallLevel.border}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium">Recall</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`font-bold ${recallLevel.color}`}>
                    {(metrics.recall * 100).toFixed(1)}%
                  </span>
                  <Badge variant="outline" className={recallLevel.color}>
                    {recallLevel.level}
                  </Badge>
                </div>
              </div>
            </div>

            <div
              className={`p-3 rounded-lg border ${f1Level.bg} ${f1Level.border}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium">F1 Score</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`font-bold ${f1Level.color}`}>
                    {(metrics.f1Score * 100).toFixed(1)}%
                  </span>
                  <Badge variant="outline" className={f1Level.color}>
                    {f1Level.level}
                  </Badge>
                </div>
              </div>
            </div>

            <div
              className={`p-3 rounded-lg border ${aucLevel.bg} ${aucLevel.border}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium">AUC</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`font-bold ${aucLevel.color}`}>
                    {(metrics.auc * 100).toFixed(1)}%
                  </span>
                  <Badge variant="outline" className={aucLevel.color}>
                    {aucLevel.level}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Insights */}
        <div>
          <h4 className="text-sm font-medium mb-3">Performance Insights</h4>
          <div className="space-y-3">
            {metrics.precision > metrics.recall && (
              <div className="flex items-start space-x-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    High Precision, Lower Recall
                  </p>
                  <p className="text-xs text-blue-600">
                    Model is conservative in predictions, minimizing false
                    positives but may miss some positive cases.
                  </p>
                </div>
              </div>
            )}

            {metrics.recall > metrics.precision && (
              <div className="flex items-start space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">
                    High Recall, Lower Precision
                  </p>
                  <p className="text-xs text-yellow-600">
                    Model catches most positive cases but may have more false
                    positives.
                  </p>
                </div>
              </div>
            )}

            {Math.abs(metrics.precision - metrics.recall) < 0.05 && (
              <div className="flex items-start space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800">
                    Balanced Performance
                  </p>
                  <p className="text-xs text-green-600">
                    Precision and recall are well-balanced, indicating good
                    overall performance.
                  </p>
                </div>
              </div>
            )}

            {metrics.auc > 0.9 && (
              <div className="flex items-start space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800">
                    Excellent Discrimination
                  </p>
                  <p className="text-xs text-green-600">
                    High AUC indicates excellent ability to distinguish between
                    classes.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h4 className="text-sm font-medium mb-3">
            Optimization Recommendations
          </h4>
          <div className="space-y-2">
            {getRecommendations().map((recommendation, index) => (
              <div
                key={index}
                className="flex items-start space-x-2 p-3 bg-gray-50 border rounded-lg"
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-700">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Model Characteristics */}
        <div>
          <h4 className="text-sm font-medium mb-3">Model Characteristics</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-gray-50 rounded-lg border">
              <div className="text-lg font-bold text-indigo-600">
                {(metrics.specificity * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">Specificity</div>
              <div className="text-xs text-gray-500">True negative rate</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg border">
              <div className="text-lg font-bold text-cyan-600">
                {(metrics.sensitivity * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">Sensitivity</div>
              <div className="text-xs text-gray-500">True positive rate</div>
            </div>
          </div>
        </div>

        {/* Overall Assessment */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <h5 className="font-medium text-gray-900 mb-2">Overall Assessment</h5>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              • <span className="font-medium">Model Quality:</span>{" "}
              {metrics.accuracy > 0.9
                ? "Excellent"
                : metrics.accuracy > 0.8
                ? "Good"
                : "Needs Improvement"}
            </p>
            <p>
              • <span className="font-medium">Balanced Performance:</span>{" "}
              {Math.abs(metrics.precision - metrics.recall) < 0.1
                ? "Yes"
                : "No"}
            </p>
            <p>
              • <span className="font-medium">Discrimination Ability:</span>{" "}
              {metrics.auc > 0.9
                ? "Excellent"
                : metrics.auc > 0.8
                ? "Good"
                : "Fair"}
            </p>
            <p>
              • <span className="font-medium">Ready for Production:</span>{" "}
              {metrics.accuracy > 0.85 && metrics.f1Score > 0.8
                ? "Yes"
                : "Needs Optimization"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

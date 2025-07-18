"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { PromptIteration } from "@/lib/types";
import { format } from "date-fns";
import {
  BarChart3,
  CheckCircle,
  ChevronDown,
  Clock,
  Code,
  Copy,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { useState } from "react";

interface ExperimentPromptIterationsProps {
  promptIterations: PromptIteration[];
}

export function ExperimentPromptIterations({
  promptIterations,
}: ExperimentPromptIterationsProps) {
  const [openIterations, setOpenIterations] = useState<Set<string>>(new Set());

  const toggleIteration = (iterationId: string) => {
    const newOpen = new Set(openIterations);
    if (newOpen.has(iterationId)) {
      newOpen.delete(iterationId);
    } else {
      newOpen.add(iterationId);
    }
    setOpenIterations(newOpen);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "running":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Success
          </Badge>
        );
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "running":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Running
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getPerformanceTrend = (current: number, previous: number) => {
    if (current > previous)
      return {
        trend: "up",
        color: "text-green-600",
        icon: <TrendingUp className="h-3 w-3" />,
      };
    if (current < previous)
      return {
        trend: "down",
        color: "text-red-600",
        icon: <TrendingUp className="h-3 w-3 rotate-180" />,
      };
    return { trend: "stable", color: "text-gray-600", icon: null };
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Prompt Iterations
        </h2>
        <p className="text-gray-600">
          Detailed analysis of all prompt versions and their performance
          evolution
        </p>
      </div>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <span>Iteration Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">
                {promptIterations.length}
              </div>
              <div className="text-sm text-blue-800 font-medium">
                Total Iterations
              </div>
              <div className="text-xs text-blue-600">
                Prompt versions tested
              </div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">
                {promptIterations.filter((p) => p.status === "success").length}
              </div>
              <div className="text-sm text-green-800 font-medium">
                Successful
              </div>
              <div className="text-xs text-green-600">Completed runs</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="text-2xl font-bold text-red-600">
                {promptIterations.filter((p) => p.status === "failed").length}
              </div>
              <div className="text-sm text-red-800 font-medium">Failed</div>
              <div className="text-xs text-red-600">Error runs</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">
                {promptIterations
                  .reduce((sum, p) => sum + (p.tokensUsed || 0), 0)
                  .toLocaleString()}
              </div>
              <div className="text-sm text-purple-800 font-medium">
                Total Tokens
              </div>
              <div className="text-xs text-purple-600">Consumed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>
            Key metrics progression across iterations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-3 font-medium text-gray-900">
                    Iteration
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    Date
                  </th>
                  <th className="text-right p-3 font-medium text-gray-900">
                    Accuracy
                  </th>
                  <th className="text-right p-3 font-medium text-gray-900">
                    F1 Score
                  </th>
                  <th className="text-right p-3 font-medium text-gray-900">
                    Precision
                  </th>
                  <th className="text-right p-3 font-medium text-gray-900">
                    Recall
                  </th>
                  <th className="text-right p-3 font-medium text-gray-900">
                    AUC
                  </th>
                  <th className="text-right p-3 font-medium text-gray-900">
                    Tokens
                  </th>
                  <th className="text-center p-3 font-medium text-gray-900">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {promptIterations.map((iteration, index) => {
                  const previous =
                    index > 0 ? promptIterations[index - 1] : null;
                  const accuracyTrend = previous
                    ? getPerformanceTrend(
                        iteration.metrics.accuracy,
                        previous.metrics.accuracy
                      )
                    : null;

                  return (
                    <tr
                      key={iteration.id}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-3 font-medium text-gray-900">
                        #{iteration.iteration}
                      </td>
                      <td className="p-3 text-gray-600">
                        {format(new Date(iteration.timestamp), "MMM dd, HH:mm")}
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <span className="font-medium text-blue-600">
                            {(iteration.metrics.accuracy * 100).toFixed(1)}%
                          </span>
                          {accuracyTrend && (
                            <span className={accuracyTrend.color}>
                              {accuracyTrend.icon}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3 text-right font-medium text-purple-600">
                        {(iteration.metrics.f1Score * 100).toFixed(1)}%
                      </td>
                      <td className="p-3 text-right font-medium text-red-600">
                        {(iteration.metrics.precision * 100).toFixed(1)}%
                      </td>
                      <td className="p-3 text-right font-medium text-green-600">
                        {(iteration.metrics.recall * 100).toFixed(1)}%
                      </td>
                      <td className="p-3 text-right font-medium text-pink-600">
                        {(iteration.metrics.auc * 100).toFixed(1)}%
                      </td>
                      <td className="p-3 text-right text-gray-600">
                        {iteration.tokensUsed?.toLocaleString() || "N/A"}
                      </td>
                      <td className="p-3 text-center">
                        {getStatusBadge(iteration.status)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Iterations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Code className="h-5 w-5 text-gray-600" />
            <span>Detailed Iterations</span>
          </CardTitle>
          <CardDescription>
            Expand each iteration to view the prompt and detailed metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {promptIterations.map((iteration) => (
              <Collapsible
                key={iteration.id}
                open={openIterations.has(iteration.id)}
                onOpenChange={() => toggleIteration(iteration.id)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between p-4 h-auto"
                  >
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(iteration.status)}
                      <div className="text-left">
                        <div className="font-medium">
                          Iteration {iteration.iteration}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {format(
                            new Date(iteration.timestamp),
                            "MMM dd, yyyy HH:mm"
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="font-medium">
                          {(iteration.metrics.accuracy * 100).toFixed(1)}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Accuracy
                        </div>
                      </div>
                      {getStatusBadge(iteration.status)}
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 p-4 border-t">
                  {/* Prompt Content */}
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center space-x-2">
                      <Code className="h-4 w-4" />
                      <span>Prompt</span>
                    </h4>
                    <div className="relative">
                      <pre className="bg-gray-50 p-4 rounded-lg text-sm whitespace-pre-wrap break-words border">
                        {iteration.prompt}
                      </pre>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(iteration.prompt)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">
                      Performance Metrics
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="text-lg font-bold text-blue-600">
                          {(iteration.metrics.accuracy * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-blue-600">Accuracy</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="text-lg font-bold text-purple-600">
                          {(iteration.metrics.precision * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-purple-600">Precision</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-lg font-bold text-green-600">
                          {(iteration.metrics.recall * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-green-600">Recall</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="text-lg font-bold text-orange-600">
                          {(iteration.metrics.f1Score * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-orange-600">F1 Score</div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Metrics */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">
                      Additional Metrics
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="text-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                        <div className="text-lg font-bold text-indigo-600">
                          {(iteration.metrics.specificity * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-indigo-600">
                          Specificity
                        </div>
                      </div>
                      <div className="text-center p-3 bg-cyan-50 rounded-lg border border-cyan-200">
                        <div className="text-lg font-bold text-cyan-600">
                          {(iteration.metrics.sensitivity * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-cyan-600">Sensitivity</div>
                      </div>
                      <div className="text-center p-3 bg-pink-50 rounded-lg border border-pink-200">
                        <div className="text-lg font-bold text-pink-600">
                          {(iteration.metrics.auc * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-pink-600">AUC</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="text-lg font-bold text-gray-600">
                          {iteration.tokensUsed?.toLocaleString() || "N/A"}
                        </div>
                        <div className="text-xs text-gray-600">Tokens Used</div>
                      </div>
                    </div>
                  </div>

                  {/* Confusion Matrix */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">
                      Confusion Matrix
                    </h4>
                    <div className="grid grid-cols-2 gap-2 max-w-xs">
                      <div className="text-center p-2 bg-green-100 rounded border border-green-200">
                        <div className="font-bold text-green-700">
                          {iteration.metrics.confusionMatrix.truePositives}
                        </div>
                        <div className="text-xs text-green-600">TP</div>
                      </div>
                      <div className="text-center p-2 bg-red-100 rounded border border-red-200">
                        <div className="font-bold text-red-700">
                          {iteration.metrics.confusionMatrix.falsePositives}
                        </div>
                        <div className="text-xs text-red-600">FP</div>
                      </div>
                      <div className="text-center p-2 bg-red-100 rounded border border-red-200">
                        <div className="font-bold text-red-700">
                          {iteration.metrics.confusionMatrix.falseNegatives}
                        </div>
                        <div className="text-xs text-red-600">FN</div>
                      </div>
                      <div className="text-center p-2 bg-green-100 rounded border border-green-200">
                        <div className="font-bold text-green-700">
                          {iteration.metrics.confusionMatrix.trueNegatives}
                        </div>
                        <div className="text-xs text-green-600">TN</div>
                      </div>
                    </div>
                  </div>

                  {/* Performance Data */}
                  {iteration.latency && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">
                        Performance Data
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center p-3 bg-gray-50 rounded-lg border">
                          <div className="text-lg font-bold">
                            {iteration.latency}ms
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Latency
                          </div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg border">
                          <div className="text-lg font-bold">
                            {iteration.tokensUsed?.toLocaleString() || "N/A"}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Tokens
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

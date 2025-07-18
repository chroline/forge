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
import { CheckCircle, ChevronDown, Clock, Copy, XCircle } from "lucide-react";
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prompt Iterations</CardTitle>
        <CardDescription>
          Detailed view of all prompt versions and their performance metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-lg font-bold">{promptIterations.length}</div>
              <div className="text-xs text-muted-foreground">
                Total Iterations
              </div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-lg font-bold text-green-600">
                {promptIterations.filter((p) => p.status === "success").length}
              </div>
              <div className="text-xs text-muted-foreground">Successful</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-lg font-bold text-red-600">
                {promptIterations.filter((p) => p.status === "failed").length}
              </div>
              <div className="text-xs text-muted-foreground">Failed</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-lg font-bold text-blue-600">
                {promptIterations
                  .reduce((sum, p) => sum + (p.tokensUsed || 0), 0)
                  .toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Total Tokens</div>
            </div>
          </div>

          {/* Iterations List */}
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
                    <h4 className="text-sm font-medium mb-2">Prompt</h4>
                    <div className="relative">
                      <pre className="bg-muted p-3 rounded-lg text-sm whitespace-pre-wrap break-words">
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
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="text-lg font-bold text-blue-600">
                          {(iteration.metrics.accuracy * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Accuracy
                        </div>
                      </div>
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="text-lg font-bold text-purple-600">
                          {(iteration.metrics.precision * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Precision
                        </div>
                      </div>
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="text-lg font-bold text-orange-600">
                          {(iteration.metrics.recall * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Recall
                        </div>
                      </div>
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="text-lg font-bold text-green-600">
                          {(iteration.metrics.f1Score * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          F1 Score
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Metrics */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">
                      Additional Metrics
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="text-lg font-bold text-indigo-600">
                          {(iteration.metrics.specificity * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Specificity
                        </div>
                      </div>
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="text-lg font-bold text-cyan-600">
                          {(iteration.metrics.sensitivity * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Sensitivity
                        </div>
                      </div>
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="text-lg font-bold text-pink-600">
                          {(iteration.metrics.auc * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-muted-foreground">AUC</div>
                      </div>
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="text-lg font-bold text-gray-600">
                          {iteration.tokensUsed?.toLocaleString() || "N/A"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Tokens Used
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Confusion Matrix */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">
                      Confusion Matrix
                    </h4>
                    <div className="grid grid-cols-2 gap-2 max-w-xs">
                      <div className="text-center p-2 bg-green-100 rounded">
                        <div className="font-bold text-green-700">
                          {iteration.metrics.confusionMatrix.truePositives}
                        </div>
                        <div className="text-xs text-green-600">TP</div>
                      </div>
                      <div className="text-center p-2 bg-red-100 rounded">
                        <div className="font-bold text-red-700">
                          {iteration.metrics.confusionMatrix.falsePositives}
                        </div>
                        <div className="text-xs text-red-600">FP</div>
                      </div>
                      <div className="text-center p-2 bg-red-100 rounded">
                        <div className="font-bold text-red-700">
                          {iteration.metrics.confusionMatrix.falseNegatives}
                        </div>
                        <div className="text-xs text-red-600">FN</div>
                      </div>
                      <div className="text-center p-2 bg-green-100 rounded">
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
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="text-lg font-bold">
                            {iteration.latency}ms
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Latency
                          </div>
                        </div>
                        <div className="text-center p-2 bg-muted rounded">
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
        </div>
      </CardContent>
    </Card>
  );
}

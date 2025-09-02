"use client";

import { useExperiment } from "@/hooks/use-experiments";
import { notFound, useParams } from "next/navigation";
import { ExperimentClassificationSummary } from "./experiment-classification-summary";
import { ExperimentDetailsError } from "./experiment-details-error";
import { ExperimentDetailsHeader } from "./experiment-details-header";
import { ExperimentDetailsLoading } from "./experiment-details-loading";
import { ExperimentErrorAnalysis } from "./experiment-error-analysis";
import { ExperimentMetricsCharts } from "./experiment-metrics-charts";
import { ExperimentMetricsOverview } from "./experiment-metrics-overview";
import { ExperimentMultiClassConfusionMatrix } from "./experiment-multi-class-confusion-matrix";
import { ExperimentOverallMetrics } from "./experiment-overall-metrics";
import { ExperimentPerClassPerformance } from "./experiment-per-class-performance";
import { ExperimentPerformanceAnalysis } from "./experiment-performance-analysis";
import { ExperimentPromptIterations } from "./experiment-prompt-iterations";

export default function ExperimentDetailsPage() {
  const params = useParams();
  const experimentId = params.experimentId as string;

  const { data: experiment, isLoading, error } = useExperiment(experimentId);

  // Loading state
  if (isLoading) {
    return <ExperimentDetailsLoading />;
  }

  // Error state
  if (error) {
    return <ExperimentDetailsError />;
  }

  // Not found state
  if (!experiment) {
    notFound();
  }

  return (
    <div className="">
      {/* Header */}
      <ExperimentDetailsHeader experiment={experiment} />

      {/* Main Content */}
      <div className="container mx-auto space-y-8 pt-8">
        {/* Metrics Overview */}
        <ExperimentMetricsOverview metrics={experiment.metrics} />

        {/* Classification Summary */}
        {experiment.metrics?.classificationMetrics
          ?.multiClassConfusionMatrix && (
          <ExperimentClassificationSummary
            confusionMatrix={
              experiment.metrics.classificationMetrics.multiClassConfusionMatrix
            }
          />
        )}

        {/* Metrics Over Time Charts */}
        {experiment.metrics?.metricsOverTime &&
          experiment.metrics.metricsOverTime.length > 0 && (
            <ExperimentMetricsCharts
              metricsOverTime={experiment.metrics.metricsOverTime}
            />
          )}

        {/* Performance Analysis */}
        {experiment.metrics?.classificationMetrics && (
          <div className="space-y-8">
            {/* Multi-Class Confusion Matrix */}
            {experiment.metrics.classificationMetrics
              .multiClassConfusionMatrix && (
              <ExperimentMultiClassConfusionMatrix
                confusionMatrix={
                  experiment.metrics.classificationMetrics
                    .multiClassConfusionMatrix
                }
              />
            )}

            {/* Overall Metrics */}
            {experiment.metrics.classificationMetrics
              .multiClassConfusionMatrix && (
              <ExperimentOverallMetrics
                confusionMatrix={
                  experiment.metrics.classificationMetrics
                    .multiClassConfusionMatrix
                }
              />
            )}

            {/* Performance Analysis and Related Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Performance Analysis */}
              <ExperimentPerformanceAnalysis
                metrics={experiment.metrics.classificationMetrics}
              />

              {/* Per-Class Performance */}
              {experiment.metrics.classificationMetrics
                .multiClassConfusionMatrix && (
                <ExperimentPerClassPerformance
                  confusionMatrix={
                    experiment.metrics.classificationMetrics
                      .multiClassConfusionMatrix
                  }
                />
              )}
            </div>

            {/* Error Analysis */}
            {experiment.metrics.classificationMetrics
              .multiClassConfusionMatrix && (
              <ExperimentErrorAnalysis
                confusionMatrix={
                  experiment.metrics.classificationMetrics
                    .multiClassConfusionMatrix
                }
              />
            )}
          </div>
        )}

        {/* Prompt Iterations */}
        {experiment.metrics?.promptIterations &&
          experiment.metrics.promptIterations.length > 0 && (
            <ExperimentPromptIterations
              promptIterations={experiment.metrics.promptIterations}
            />
          )}
      </div>
    </div>
  );
}

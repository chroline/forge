"use client";

import { useExperiment } from "@/hooks/use-experiments";
import { notFound, useParams } from "next/navigation";
import { ExperimentConfusionMatrix } from "./experiment-confusion-matrix";
import { ExperimentDetailsError } from "./experiment-details-error";
import { ExperimentDetailsHeader } from "./experiment-details-header";
import { ExperimentDetailsLoading } from "./experiment-details-loading";
import { ExperimentMetricsCharts } from "./experiment-metrics-charts";
import { ExperimentMetricsOverview } from "./experiment-metrics-overview";
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
      <div className="container mx-auto px-12 py-8 space-y-8">
        {/* Metrics Overview */}
        <ExperimentMetricsOverview metrics={experiment.metrics} />

        {/* Metrics Over Time Charts */}
        {experiment.metrics?.metricsOverTime &&
          experiment.metrics.metricsOverTime.length > 0 && (
            <ExperimentMetricsCharts
              metricsOverTime={experiment.metrics.metricsOverTime}
            />
          )}

        {/* Performance Analysis */}
        {experiment.metrics?.classificationMetrics && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ExperimentConfusionMatrix
              confusionMatrix={
                experiment.metrics.classificationMetrics.confusionMatrix
              }
            />
            <ExperimentPerformanceAnalysis
              metrics={experiment.metrics.classificationMetrics}
            />
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

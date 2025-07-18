"use client";

import { Button } from "@/components/ui/button";
import { useExperiment } from "@/hooks/use-experiments";
import { BarChart3 } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ExperimentActions } from "./experiment-actions";
import { ExperimentDetails } from "./experiment-details";
import { ExperimentError } from "./experiment-error";
import { ExperimentHeader } from "./experiment-header";
import { ExperimentLoading } from "./experiment-loading";
import { ExperimentMetrics } from "./experiment-metrics";

export default function ExperimentPage() {
  const params = useParams();
  const experimentId = params.experimentId as string;

  const { data: experiment, isLoading, error } = useExperiment(experimentId);

  // Loading state
  if (isLoading) {
    return <ExperimentLoading />;
  }

  // Error state
  if (error) {
    return <ExperimentError />;
  }

  // Not found state
  if (!experiment) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <ExperimentHeader
        name={experiment.name}
        description={experiment.description}
        status={experiment.status}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExperimentDetails
          dataset={experiment.dataset}
          model={experiment.model}
          framework={experiment.framework}
          createdAt={experiment.createdAt}
          updatedAt={experiment.updatedAt}
        />

        <ExperimentMetrics metrics={experiment.metrics} />
      </div>

      <div className="flex justify-center">
        <Link href={`/dashboard/experiment-details/${experimentId}`}>
          <Button size="lg" className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>View Detailed Analysis</span>
          </Button>
        </Link>
      </div>

      <ExperimentActions />
    </div>
  );
}

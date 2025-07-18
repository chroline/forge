"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function ExperimentError() {
  return (
    <div className="text-center py-8">
      <h2 className="text-lg font-semibold mb-2">Experiment Not Found</h2>
      <p className="text-muted-foreground mb-4">
        The experiment you're looking for doesn't exist or has been removed.
      </p>
      <Link href="/dashboard/experiments">
        <Button>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Experiments
        </Button>
      </Link>
    </div>
  );
}

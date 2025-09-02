"use client";

import { DashboardBody } from "@/components/dashboard-body";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ExperimentCreateSheet } from "./experiment-create-sheet";
import { ExperimentSidebar } from "./experiment-sidebar";

export default function ExperimentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [createSheetOpen, setCreateSheetOpen] = useState(false);

  return (
    <div className="flex flex-1 flex-col">
      <DashboardHeader title="Experiments">
        <Button onClick={() => setCreateSheetOpen(true)}>
          <Plus className="mr-1 h-4 w-4" />
          New Experiment
        </Button>
      </DashboardHeader>
      <DashboardBody>
        <div className="flex-1 flex gap-8 h-full overflow-hidden">
          {/* Left Panel - Experiment List */}
          <ExperimentSidebar />

          {/* Right Panel - Child Pages */}
          <div className="flex-1 flex flex-col h-full overflow-scroll">
            <div className="max-w-4xl w-full mx-auto">{children}</div>
          </div>
        </div>

        {/* Create Sheet */}
        <ExperimentCreateSheet
          open={createSheetOpen}
          onOpenChange={setCreateSheetOpen}
        />
      </DashboardBody>
    </div>
  );
}

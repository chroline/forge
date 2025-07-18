"use client";

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
    <div className="flex flex-1 flex-col h-full overflow-hidden">
      <DashboardHeader title="Experiments">
        <Button onClick={() => setCreateSheetOpen(true)}>
          <Plus className="mr-1 h-4 w-4" />
          New Experiment
        </Button>
      </DashboardHeader>
      <div className="flex-1 flex h-full overflow-hidden">
        {/* Left Panel - Experiment List */}
        <ExperimentSidebar />

        {/* Right Panel - Child Pages */}
        <div className="flex-1 flex flex-col h-full overflow-scroll py-4">
          <div className="max-w-4xl w-full mx-auto p-6">{children}</div>
        </div>
      </div>

      {/* Create Sheet */}
      <ExperimentCreateSheet
        open={createSheetOpen}
        onOpenChange={setCreateSheetOpen}
      />
    </div>
  );
}

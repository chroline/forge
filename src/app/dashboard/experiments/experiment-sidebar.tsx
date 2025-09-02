"use client";

import { useFilteredExperiments } from "@/hooks/use-experiments";
import { useState } from "react";
import { ExperimentList } from "./experiment-list";
import { ExperimentSearch } from "./experiment-search";

type Status = "running" | "completed" | "failed" | "pending";

export function ExperimentSidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [selectedExperiments, setSelectedExperiments] = useState<string[]>([]);

  // Use TanStack Query to fetch filtered experiments
  const {
    data: experiments = [],
    isLoading,
    error,
  } = useFilteredExperiments({
    search: searchQuery,
    status: statusFilter,
  });

  const handleSelectionChange = (selectedIds: string[]) => {
    setSelectedExperiments(selectedIds);
    console.log("Selected experiments:", selectedIds);
  };

  const handleBulkDelete = (selectedIds: string[]) => {
    console.log("Deleting experiments:", selectedIds);
    // TODO: Implement actual delete logic
    // You can call an API here to delete the experiments
    alert(`Delete ${selectedIds.length} experiment(s)?`);
  };

  const handleBulkArchive = (selectedIds: string[]) => {
    console.log("Archiving experiments:", selectedIds);
    // TODO: Implement actual archive logic
    // You can call an API here to archive the experiments
    alert(`Archive ${selectedIds.length} experiment(s)?`);
  };

  return (
    <div className="w-80 xl:w-sm flex flex-col h-full overflow-hidden sticky top-0">
      <ExperimentSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      {/* Experiment List */}
      <div className="flex-1 overflow-hidden">
        <ExperimentList
          experiments={experiments}
          isLoading={isLoading}
          error={error}
          showSelection={true}
          onSelectionChange={handleSelectionChange}
          onBulkDelete={handleBulkDelete}
          onBulkArchive={handleBulkArchive}
        />
      </div>
    </div>
  );
}

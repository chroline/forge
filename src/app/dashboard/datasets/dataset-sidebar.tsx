"use client";

import { useFilteredDatasets } from "@/hooks/use-datasets";
import { useState } from "react";
import { DatasetList } from "./dataset-list";
import { DatasetSearch } from "./dataset-search";

type Status = "active" | "archived" | "pending";

export function DatasetSidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [selectedDatasets, setSelectedDatasets] = useState<string[]>([]);

  // Use TanStack Query to fetch filtered datasets
  const {
    data: datasets = [],
    isLoading,
    error,
  } = useFilteredDatasets({
    search: searchQuery,
    status: statusFilter,
  });

  const handleSelectionChange = (selectedIds: string[]) => {
    setSelectedDatasets(selectedIds);
    console.log("Selected datasets:", selectedIds);
  };

  const handleBulkDelete = (selectedIds: string[]) => {
    console.log("Deleting datasets:", selectedIds);
    // TODO: Implement actual delete logic
    // You can call an API here to delete the datasets
    alert(`Delete ${selectedIds.length} dataset(s)?`);
  };

  const handleBulkArchive = (selectedIds: string[]) => {
    console.log("Archiving datasets:", selectedIds);
    // TODO: Implement actual archive logic
    // You can call an API here to archive the datasets
    alert(`Archive ${selectedIds.length} dataset(s)?`);
  };

  return (
    <div className="border-r w-80 xl:w-sm flex flex-col h-full overflow-hidden sticky top-0">
      <DatasetSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      {/* Dataset List */}
      <div className="flex-1 overflow-hidden">
        <DatasetList
          datasets={datasets}
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

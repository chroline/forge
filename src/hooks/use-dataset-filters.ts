"use client";

import { type Dataset } from "@/lib/api";
import { useMemo, useState } from "react";

type Status = "active" | "archived";

export function useDatasetFilters(datasets: Dataset[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");

  // Filter datasets based on search query and status filter
  const filteredDatasets = useMemo(() => {
    return datasets.filter((dataset) => {
      const matchesSearch =
        dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dataset.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || dataset.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [datasets, searchQuery, statusFilter]);

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    filteredDatasets,
  };
}

"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { type Dataset } from "@/lib/api";
import { Archive, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DatasetCard } from "./dataset-card";

interface DatasetListProps {
  datasets: Dataset[];
  isLoading?: boolean;
  error?: Error | null;
  showSelection?: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
  onBulkDelete?: (selectedIds: string[]) => void;
  onBulkArchive?: (selectedIds: string[]) => void;
}

export function DatasetList({
  datasets,
  isLoading,
  error,
  showSelection = false,
  onSelectionChange,
  onBulkDelete,
  onBulkArchive,
}: DatasetListProps) {
  const pathname = usePathname();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelectionChange = (datasetId: string, selected: boolean) => {
    const newSelectedIds = selected
      ? [...selectedIds, datasetId]
      : selectedIds.filter((id) => id !== datasetId);

    setSelectedIds(newSelectedIds);
    onSelectionChange?.(newSelectedIds);
  };

  const handleBulkDelete = () => {
    if (selectedIds.length > 0) {
      onBulkDelete?.(selectedIds);
      setSelectedIds([]);
      onSelectionChange?.([]);
    }
  };

  const handleBulkArchive = () => {
    if (selectedIds.length > 0) {
      onBulkArchive?.(selectedIds);
      setSelectedIds([]);
      onSelectionChange?.([]);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="p-2 space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-3 border rounded-lg">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/2 mb-1" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-sm text-destructive">Failed to load datasets</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  // Empty state
  if (datasets.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-sm">No datasets found</p>
        <p className="text-xs mt-1">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-4 pt-4 overflow-y-auto">
        {datasets.map((dataset) => {
          const isActive = pathname === `/dashboard/datasets/${dataset.id}`;
          const isSelected = selectedIds.includes(dataset.id);

          return (
            <div key={dataset.id}>
              <DatasetCard
                dataset={dataset}
                isActive={isActive}
                isSelected={isSelected}
                onSelectionChange={handleSelectionChange}
                showCheckbox={showSelection}
              />
            </div>
          );
        })}

        {/* Bulk Actions with Animation */}
        <div className="mt-4 sticky bottom-0 z-10">
          <AnimatePresence>
            {showSelection && selectedIds.length > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden w-full"
              >
                <div className="p-3 space-y-2 bg-background border-t">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      {selectedIds.length} dataset
                      {selectedIds.length !== 1 ? "s" : ""} selected
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedIds([]);
                        onSelectionChange?.([]);
                      }}
                    >
                      Clear
                    </Button>
                  </div>
                  <div className="flex gap-2 mb-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleBulkArchive}
                      className="flex-1"
                    >
                      <Archive className="h-4 w-4 mr-2" />
                      Archive
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleBulkDelete}
                      className="text-destructive flex-1"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

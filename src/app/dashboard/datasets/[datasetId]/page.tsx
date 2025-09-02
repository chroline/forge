"use client";

import { useDataset, useUpdateDatasetSchema } from "@/hooks/use-datasets";
import { type ColumnSchema } from "@/lib/api";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DatasetActions } from "./dataset-actions";
import { DatasetDetails } from "./dataset-details";
import { DatasetError } from "./dataset-error";
import { DatasetHeader } from "./dataset-header";
import { DatasetLoading } from "./dataset-loading";
import { DatasetStats } from "./dataset-stats";
import { DatasetEntriesTable } from "./dataset-entries-table";

export default function DatasetPage() {
  const params = useParams();
  const datasetId = params.datasetId as string;
  const [showEntries, setShowEntries] = useState(false);

  // Use TanStack Query to fetch dataset
  const { data: dataset, isLoading, error } = useDataset(datasetId);

  // Schema update mutation
  const updateSchemaMutation = useUpdateDatasetSchema();

  // State for schema changes
  const [localSchema, setLocalSchema] = useState<ColumnSchema[] | undefined>(
    dataset?.schema
  );

  // Update local schema when dataset changes
  useEffect(() => {
    if (dataset?.schema) {
      setLocalSchema(dataset.schema);
    }
  }, [dataset?.schema]);

  // Loading state
  if (isLoading) {
    return <DatasetLoading />;
  }

  // Error state
  if (error) {
    return <DatasetError />;
  }

  // Not found state
  if (!dataset) {
    notFound();
  }

  // Generate sample columns for datasets without schema
  const getSampleColumns = (dataset: any) => {
    if (dataset.schema && dataset.schema.length > 0) {
      return dataset.schema.map((col: any) => col.name);
    }

    // Generate sample column names based on dataset type
    const sampleColumns = [];
    for (let i = 1; i <= Math.min(dataset.columns, 10); i++) {
      if (dataset.name.toLowerCase().includes("customer")) {
        sampleColumns.push(`column_${i}`);
      } else if (dataset.name.toLowerCase().includes("sales")) {
        sampleColumns.push(`field_${i}`);
      } else {
        sampleColumns.push(`feature_${i}`);
      }
    }
    return sampleColumns;
  };

  const handleSchemaChange = async (newSchema: ColumnSchema[]) => {
    setLocalSchema(newSchema);

    try {
      await updateSchemaMutation.mutateAsync({
        id: datasetId,
        schema: newSchema,
      });
    } catch (error) {
      console.error("Failed to update schema:", error);
      // Revert local schema on error
      setLocalSchema(dataset.schema);
    }
  };

  const handleViewData = () => {
    setShowEntries(!showEntries);
  };

  return (
    <div className="space-y-6">
      <DatasetHeader
        name={dataset.name}
        status={dataset.status}
        description={dataset.description}
      />

      <DatasetDetails
        createdAt={dataset.createdAt || ""}
        lastUpdated={dataset.lastUpdated || ""}
      />

      <DatasetStats
        entries={dataset.entries || 0}
        columns={dataset.columns || 0}
      />

      <DatasetActions onViewData={handleViewData} showEntries={showEntries} />

      {/* Dataset Entries Table */}
      {showEntries && (
        <DatasetEntriesTable datasetId={datasetId} />
      )}
    </div>
  );
}

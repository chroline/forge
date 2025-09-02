import { useQuery } from "@tanstack/react-query";
import { datasetEntriesApi, type DatasetEntry } from "@/app/data/dataset-entries";

// Query keys for dataset entries
export const datasetEntriesKeys = {
  all: ["dataset-entries"] as const,
  lists: () => [...datasetEntriesKeys.all, "list"] as const,
  list: (datasetId: string) => [...datasetEntriesKeys.lists(), datasetId] as const,
  details: () => [...datasetEntriesKeys.all, "detail"] as const,
  detail: (datasetId: string) => [...datasetEntriesKeys.details(), datasetId] as const,
  paginated: (datasetId: string, page: number, pageSize: number) =>
    [...datasetEntriesKeys.list(datasetId), "paginated", page, pageSize] as const,
  search: (datasetId: string, query: string) =>
    [...datasetEntriesKeys.list(datasetId), "search", query] as const,
  filterByIntent: (datasetId: string, intent: string) =>
    [...datasetEntriesKeys.list(datasetId), "filter", "intent", intent] as const,
  filterByUrgency: (datasetId: string, urgency: string) =>
    [...datasetEntriesKeys.list(datasetId), "filter", "urgency", urgency] as const,
};

// Hook to get all entries for a dataset
export function useDatasetEntries(datasetId: string) {
  return useQuery({
    queryKey: datasetEntriesKeys.list(datasetId),
    queryFn: () => datasetEntriesApi.getByDatasetId(datasetId),
    enabled: !!datasetId,
  });
}

// Hook to get paginated entries for a dataset
export function useDatasetEntriesPaginated(
  datasetId: string,
  page: number = 1,
  pageSize: number = 20
) {
  return useQuery({
    queryKey: datasetEntriesKeys.paginated(datasetId, page, pageSize),
    queryFn: () => datasetEntriesApi.getPaginated(datasetId, page, pageSize),
    enabled: !!datasetId,
  });
}

// Hook to search entries
export function useDatasetEntriesSearch(datasetId: string, query: string) {
  return useQuery({
    queryKey: datasetEntriesKeys.search(datasetId, query),
    queryFn: () => datasetEntriesApi.search(datasetId, query),
    enabled: !!datasetId && !!query,
  });
}

// Hook to filter entries by intent category
export function useDatasetEntriesByIntent(datasetId: string, intent: string) {
  return useQuery({
    queryKey: datasetEntriesKeys.filterByIntent(datasetId, intent),
    queryFn: () => datasetEntriesApi.filterByIntent(datasetId, intent),
    enabled: !!datasetId && !!intent,
  });
}

// Hook to filter entries by urgency level
export function useDatasetEntriesByUrgency(datasetId: string, urgency: string) {
  return useQuery({
    queryKey: datasetEntriesKeys.filterByUrgency(datasetId, urgency),
    queryFn: () => datasetEntriesApi.filterByUrgency(datasetId, urgency),
    enabled: !!datasetId && !!urgency,
  });
}

// Utility function to get unique intent categories from entries
export function getUniqueIntents(entries: DatasetEntry[]): string[] {
  const intents = new Set(entries.map(entry => entry.intent_category));
  return Array.from(intents).sort();
}

// Utility function to get unique urgency levels from entries
export function getUniqueUrgencyLevels(entries: DatasetEntry[]): string[] {
  const urgencyLevels = new Set(entries.map(entry => entry.urgency_level));
  return Array.from(urgencyLevels).sort();
}

// Utility function to get unique patient types from entries
export function getUniquePatientTypes(entries: DatasetEntry[]): string[] {
  const patientTypes = new Set(entries.map(entry => entry.patient_type));
  return Array.from(patientTypes).sort();
}

// Utility function to get statistics for a dataset
export function getDatasetStatistics(entries: DatasetEntry[]) {
  const totalEntries = entries.length;
  const intents = getUniqueIntents(entries);
  const urgencyLevels = getUniqueUrgencyLevels(entries);
  const patientTypes = getUniquePatientTypes(entries);

  // Count by intent category
  const intentCounts = intents.reduce((acc, intent) => {
    acc[intent] = entries.filter(entry => entry.intent_category === intent).length;
    return acc;
  }, {} as Record<string, number>);

  // Count by urgency level
  const urgencyCounts = urgencyLevels.reduce((acc, urgency) => {
    acc[urgency] = entries.filter(entry => entry.urgency_level === urgency).length;
    return acc;
  }, {} as Record<string, number>);

  // Count by patient type
  const patientTypeCounts = patientTypes.reduce((acc, type) => {
    acc[type] = entries.filter(entry => entry.patient_type === type).length;
    return acc;
  }, {} as Record<string, number>);

  // Average response priority
  const avgResponsePriority = entries.reduce((sum, entry) => sum + entry.response_priority, 0) / totalEntries;

  return {
    totalEntries,
    intents,
    urgencyLevels,
    patientTypes,
    intentCounts,
    urgencyCounts,
    patientTypeCounts,
    avgResponsePriority: Math.round(avgResponsePriority * 100) / 100,
  };
}

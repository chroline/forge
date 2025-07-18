import { datasetsApi } from "@/lib/api";
import type { ColumnSchema } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Query keys
export const datasetKeys = {
  all: ["datasets"] as const,
  lists: () => [...datasetKeys.all, "list"] as const,
  list: (filters: { status?: string; search?: string }) =>
    [...datasetKeys.lists(), filters] as const,
  details: () => [...datasetKeys.all, "detail"] as const,
  detail: (id: string) => [...datasetKeys.details(), id] as const,
};

// Hook to get all datasets
export function useDatasets(filters?: { status?: string; search?: string }) {
  return useQuery({
    queryKey: datasetKeys.list(filters || {}),
    queryFn: () => datasetsApi.getAll(),
  });
}

// Hook to get a single dataset
export function useDataset(id: string) {
  return useQuery({
    queryKey: datasetKeys.detail(id),
    queryFn: () => datasetsApi.getById(id),
    enabled: !!id,
  });
}

// Hook to search datasets
export function useDatasetSearch(query: string) {
  return useQuery({
    queryKey: datasetKeys.list({ search: query }),
    queryFn: () => datasetsApi.search(query),
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

// Hook to filter datasets by status
export function useDatasetsByStatus(
  status: "active" | "archived" | "pending" | "all"
) {
  return useQuery({
    queryKey: datasetKeys.list({ status }),
    queryFn: () => datasetsApi.filterByStatus(status),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Hook to get filtered datasets (combines search and status)
export function useFilteredDatasets(filters: {
  search?: string;
  status?: "active" | "archived" | "pending" | "all";
}) {
  const { search, status } = filters;

  // If we have a search query, use search hook
  if (search && search.length > 0) {
    return useDatasetSearch(search);
  }

  // If we have a status filter, use status hook
  if (status && status !== "all") {
    return useDatasetsByStatus(status);
  }

  // Otherwise, get all datasets
  return useDatasets();
}

// Hook to create a new dataset
export function useCreateDataset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: datasetsApi.create,
    onSuccess: () => {
      // Invalidate and refetch datasets list
      queryClient.invalidateQueries({ queryKey: datasetKeys.lists() });
    },
  });
}

// Hook to update dataset schema
export function useUpdateDatasetSchema() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, schema }: { id: string; schema: ColumnSchema[] }) =>
      datasetsApi.updateSchema(id, schema),
    onSuccess: (updatedDataset) => {
      if (updatedDataset) {
        // Update the specific dataset in cache
        queryClient.setQueryData(
          datasetKeys.detail(updatedDataset.id),
          updatedDataset
        );
        // Invalidate and refetch datasets list
        queryClient.invalidateQueries({ queryKey: datasetKeys.lists() });
      }
    },
  });
}

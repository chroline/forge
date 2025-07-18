import { experimentsApi } from "@/lib/api";
import type { Experiment } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Query keys
export const experimentKeys = {
  all: ["experiments"] as const,
  lists: () => [...experimentKeys.all, "list"] as const,
  list: (filters: { status?: string; search?: string }) =>
    [...experimentKeys.lists(), filters] as const,
  details: () => [...experimentKeys.all, "detail"] as const,
  detail: (id: string) => [...experimentKeys.details(), id] as const,
};

// Hook to get all experiments
export function useExperiments(filters?: { status?: string; search?: string }) {
  return useQuery({
    queryKey: experimentKeys.list(filters || {}),
    queryFn: () => experimentsApi.getAll(),
  });
}

// Hook to get a single experiment
export function useExperiment(id: string) {
  return useQuery({
    queryKey: experimentKeys.detail(id),
    queryFn: () => experimentsApi.getById(id),
    enabled: !!id,
  });
}

// Hook to search experiments
export function useExperimentSearch(query: string) {
  return useQuery({
    queryKey: experimentKeys.list({ search: query }),
    queryFn: () => experimentsApi.search(query),
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

// Hook to filter experiments by status
export function useExperimentsByStatus(
  status: "running" | "completed" | "failed" | "pending" | "all"
) {
  return useQuery({
    queryKey: experimentKeys.list({ status }),
    queryFn: () => experimentsApi.filterByStatus(status),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Hook to get filtered experiments (combines search and status)
export function useFilteredExperiments(filters: {
  search?: string;
  status?: "running" | "completed" | "failed" | "pending" | "all";
}) {
  const { search, status } = filters;

  // If we have a search query, use search hook
  if (search && search.length > 0) {
    return useExperimentSearch(search);
  }

  // If we have a status filter, use status hook
  if (status && status !== "all") {
    return useExperimentsByStatus(status);
  }

  // Otherwise, get all experiments
  return useExperiments();
}

// Hook to create a new experiment
export function useCreateExperiment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: experimentsApi.create,
    onSuccess: () => {
      // Invalidate and refetch experiments list
      queryClient.invalidateQueries({ queryKey: experimentKeys.lists() });
    },
  });
}

// Hook to update experiment
export function useUpdateExperiment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Experiment>;
    }) => experimentsApi.update(id, updates),
    onSuccess: (updatedExperiment) => {
      if (updatedExperiment) {
        // Update the specific experiment in cache
        queryClient.setQueryData(
          experimentKeys.detail(updatedExperiment.id),
          updatedExperiment
        );
        // Invalidate and refetch experiments list
        queryClient.invalidateQueries({ queryKey: experimentKeys.lists() });
      }
    },
  });
}

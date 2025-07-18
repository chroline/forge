import { datasets } from "@/app/data/datasets";
import { experiments } from "@/app/data/experiments";
import type { ColumnSchema, Dataset, Experiment } from "@/lib/types";

// Re-export types for backward compatibility
export type { ColumnSchema, Dataset, Experiment };

// API functions
export const datasetsApi = {
  // Get all datasets
  getAll: async (): Promise<Dataset[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return datasets;
  },

  // Get a single dataset by ID
  getById: async (id: string): Promise<Dataset | null> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    const dataset = datasets.find((d) => d.id === id);
    return dataset || null;
  },

  // Search datasets
  search: async (query: string): Promise<Dataset[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200));
    return datasets.filter(
      (dataset) =>
        dataset.name.toLowerCase().includes(query.toLowerCase()) ||
        dataset.description.toLowerCase().includes(query.toLowerCase())
    );
  },

  // Filter datasets by status
  filterByStatus: async (
    status: "active" | "archived" | "pending" | "all"
  ): Promise<Dataset[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200));
    if (status === "all") return datasets;
    return datasets.filter((dataset) => dataset.status === status);
  },

  // Create a new dataset
  create: async (file: File): Promise<Dataset> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newDataset: Dataset = {
      id: `dataset-${Date.now()}`,
      name: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
      description: `Dataset uploaded from ${file.name}`,
      entries: 0, // Will be calculated after processing
      columns: 0, // Will be calculated after processing
      lastUpdated: new Date().toISOString().split("T")[0],
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
    };

    // Add to the datasets array
    datasets.unshift(newDataset); // Add to beginning of array

    return newDataset;
  },

  // Update dataset schema
  updateSchema: async (
    id: string,
    schema: ColumnSchema[]
  ): Promise<Dataset | null> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const datasetIndex = datasets.findIndex((d) => d.id === id);
    if (datasetIndex === -1) return null;

    datasets[datasetIndex] = {
      ...datasets[datasetIndex],
      schema,
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    return datasets[datasetIndex];
  },
};

// Experiments API functions
export const experimentsApi = {
  // Get all experiments
  getAll: async (): Promise<Experiment[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return experiments;
  },

  // Get a single experiment by ID
  getById: async (id: string): Promise<Experiment | null> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    const experiment = experiments.find((e) => e.id === id);
    return experiment || null;
  },

  // Search experiments
  search: async (query: string): Promise<Experiment[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200));
    return experiments.filter(
      (experiment) =>
        experiment.name.toLowerCase().includes(query.toLowerCase()) ||
        experiment.description.toLowerCase().includes(query.toLowerCase())
    );
  },

  // Filter experiments by status
  filterByStatus: async (
    status: "running" | "completed" | "failed" | "pending" | "all"
  ): Promise<Experiment[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200));
    if (status === "all") return experiments;
    return experiments.filter((experiment) => experiment.status === status);
  },

  // Create a new experiment
  create: async (
    experimentData: Omit<Experiment, "id" | "createdAt" | "updatedAt">
  ): Promise<Experiment> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newExperiment: Experiment = {
      ...experimentData,
      id: `exp-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    // Add to the experiments array
    experiments.unshift(newExperiment); // Add to beginning of array

    return newExperiment;
  },

  // Update experiment
  update: async (
    id: string,
    updates: Partial<Experiment>
  ): Promise<Experiment | null> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const experimentIndex = experiments.findIndex((e) => e.id === id);
    if (experimentIndex === -1) return null;

    experiments[experimentIndex] = {
      ...experiments[experimentIndex],
      ...updates,
      updatedAt: new Date().toISOString().split("T")[0],
    };

    return experiments[experimentIndex];
  },
};

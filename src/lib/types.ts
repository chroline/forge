// Common types used across the application

export interface ColumnSchema {
  name: string;
  type: "identifier" | "feature" | "target" | "metadata";
  dataType?: string;
  description?: string;
}

export interface Dataset {
  id: string;
  name: string;
  description: string;
  entries: number;
  columns: number;
  lastUpdated: string;
  status: "active" | "archived" | "pending";
  createdAt?: string;
  schema?: ColumnSchema[];
}

export interface ClassificationMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  specificity: number;
  sensitivity: number;
  auc: number;
  confusionMatrix: {
    truePositives: number;
    trueNegatives: number;
    falsePositives: number;
    falseNegatives: number;
  };
}

export interface MetricsOverTime {
  timestamp: string;
  metrics: ClassificationMetrics;
  iteration: number;
}

export interface PromptIteration {
  id: string;
  iteration: number;
  prompt: string;
  timestamp: string;
  metrics: ClassificationMetrics;
  status: "success" | "failed" | "running";
  tokensUsed?: number;
  latency?: number;
}

export interface ExperimentMetrics {
  accuracy: number;
  loss: number;
  epochs: number;
  // Extended metrics for classification
  classificationMetrics?: ClassificationMetrics;
  metricsOverTime?: MetricsOverTime[];
  promptIterations?: PromptIteration[];
}

export interface Experiment {
  id: string;
  name: string;
  description: string;
  status: "running" | "completed" | "failed" | "pending";
  createdAt: string;
  updatedAt: string;
  metrics: ExperimentMetrics | null;
  owner?: string;
  dataset: string;
  model: string;
  framework: string;
}

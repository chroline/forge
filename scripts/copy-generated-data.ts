import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

// Copy generated experiment data to app data file
function copyExperimentData() {
  try {
    const generatedExperimentPath = join(
      process.cwd(),
      "scripts",
      "generated-experiment.json"
    );
    const appExperimentPath = join(
      process.cwd(),
      "src",
      "app",
      "data",
      "experiments.ts"
    );

    const generatedData = readFileSync(generatedExperimentPath, "utf-8");
    const experiment = JSON.parse(generatedData);

    // Create the TypeScript file content
    const fileContent = `import { type Experiment } from "@/lib/types";

// Generated experiment data with multi-class confusion matrix
export const experiments: Experiment[] = [
  ${JSON.stringify(experiment, null, 2)}
];
`;

    writeFileSync(appExperimentPath, fileContent);
    console.log("✅ Copied generated experiment data to app");
  } catch (error) {
    console.error("❌ Error copying experiment data:", error);
  }
}

// Copy generated dataset data to app data file
function copyDatasetData() {
  try {
    const generatedDatasetPath = join(
      process.cwd(),
      "scripts",
      "generated-dataset.json"
    );
    const appDatasetPath = join(
      process.cwd(),
      "src",
      "app",
      "data",
      "datasets.ts"
    );

    const generatedData = readFileSync(generatedDatasetPath, "utf-8");
    const dataset = JSON.parse(generatedData);

    // Create the TypeScript file content
    const fileContent = `import { type Dataset } from "@/lib/types";

// Generated dataset data
export const datasets: Dataset[] = [
  ${JSON.stringify(dataset, null, 2)}
];
`;

    writeFileSync(appDatasetPath, fileContent);
    console.log("✅ Copied generated dataset data to app");
  } catch (error) {
    console.error("❌ Error copying dataset data:", error);
  }
}

// Run the copy operations
console.log("🔄 Copying generated data to app...");
copyExperimentData();
copyDatasetData();
console.log("✅ All data copied successfully!");

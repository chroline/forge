import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

// Types matching the application
interface ColumnSchema {
  name: string;
  type: "identifier" | "feature" | "target" | "metadata";
  dataType?: string;
  description?: string;
}

interface Dataset {
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

interface ClassificationMetrics {
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
  multiClassConfusionMatrix?: { [key: string]: { [key: string]: number } };
}

interface MetricsOverTime {
  timestamp: string;
  metrics: ClassificationMetrics;
  iteration: number;
}

interface PromptIteration {
  id: string;
  iteration: number;
  prompt: string;
  timestamp: string;
  metrics: ClassificationMetrics;
  status: "success" | "failed" | "running";
  tokensUsed?: number;
  latency?: number;
}

interface ExperimentMetrics {
  accuracy: number;
  loss: number;
  iterations: number;
  classificationMetrics?: ClassificationMetrics;
  metricsOverTime?: MetricsOverTime[];
  promptIterations?: PromptIteration[];
}

interface Experiment {
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
}

// Synthetic dataset entry interface
interface DatasetEntry {
  message_id: string;
  message_content: string;
  intent_category: string;
  urgency_level: string;
  patient_type: string;
  response_priority: number;
}

// Generate synthetic patient messages
function generateSyntheticDataset(): {
  dataset: Dataset;
  entries: DatasetEntry[];
} {
  const patientMessages: DatasetEntry[] = [];

  // Intent categories and their associated message patterns
  const intentPatterns = {
    "appointment request": [
      "I need to schedule an appointment with Dr. Smith",
      "Can I book a follow-up visit for next week?",
      "I'd like to make an appointment for my annual checkup",
      "Need to reschedule my appointment from Tuesday to Thursday",
      "Looking to schedule a consultation about my back pain",
      "Can you help me book an appointment with the cardiologist?",
      "I need to see a specialist for my knee injury",
      "Want to schedule a routine physical examination",
      "Need an appointment for my prescription refill",
      "Can I get an appointment for my chronic condition review",
    ],
    "medication question": [
      "What are the side effects of my blood pressure medication?",
      "Can I take this medication with food?",
      "I'm running low on my prescription, can I get a refill?",
      "Is it safe to take this medicine while pregnant?",
      "What time should I take my diabetes medication?",
      "I missed a dose of my medication, what should I do?",
      "Can you explain what this new medication does?",
      "I'm experiencing side effects from my medication",
      "Do I need to adjust my medication dosage?",
      "Can I get a generic version of my prescription?",
    ],
    "billing inquiry": [
      "I received a bill that seems incorrect",
      "Can you explain the charges on my statement?",
      "I need to set up a payment plan for my medical bills",
      "Why wasn't my insurance applied to this visit?",
      "I think there's an error in my billing statement",
      "Can I get an itemized breakdown of my charges?",
      "I need help understanding my copay amount",
      "Why am I being charged for a service I didn't receive?",
      "Can you help me dispute this medical bill?",
      "I need to update my insurance information",
    ],
    "test results": [
      "When will my blood test results be available?",
      "Can you explain what my lab results mean?",
      "I need to get a copy of my test results",
      "Are my test results normal?",
      "Can you send my results to my specialist?",
      "I'm concerned about my recent test results",
      "When should I get my next round of tests?",
      "Can you explain the abnormal values in my results?",
      "I need to schedule follow-up tests",
      "Are my test results ready for my appointment?",
    ],
    "general question": [
      "What are your office hours?",
      "Do you accept my insurance plan?",
      "Can you recommend a good specialist?",
      "What should I bring to my first appointment?",
      "How do I access my medical records online?",
      "What's the best way to contact my doctor?",
      "Do you offer telehealth appointments?",
      "Can you help me find a primary care physician?",
      "What's your cancellation policy?",
      "How do I request a referral to a specialist?",
    ],
    complaint: [
      "I'm very unhappy with my last visit",
      "The wait time was unacceptable",
      "The staff was rude to me during my appointment",
      "I'm filing a complaint about my treatment",
      "The doctor didn't listen to my concerns",
      "I'm dissatisfied with the care I received",
      "The facility was not clean during my visit",
      "I want to speak to a manager about my experience",
      "The billing department made multiple errors",
      "I'm extremely frustrated with the service quality",
    ],
  };

  const urgencyLevels = ["low", "medium", "high", "urgent"];
  const patientTypes = ["new", "existing", "vip", "senior"];

  let messageId = 1;

  // Generate 1000 synthetic entries
  for (let i = 0; i < 1000; i++) {
    const intent = Object.keys(intentPatterns)[
      Math.floor(Math.random() * Object.keys(intentPatterns).length)
    ] as keyof typeof intentPatterns;
    const patterns = intentPatterns[intent];
    const messageContent =
      patterns[Math.floor(Math.random() * patterns.length)];

    // Add some variation to make messages more realistic
    const variations = [
      messageContent,
      messageContent + " Thank you.",
      "Hi, " + messageContent.toLowerCase(),
      messageContent + " Please let me know.",
      "Hello, " + messageContent.toLowerCase(),
      messageContent + " I appreciate your help.",
    ];

    const finalMessage =
      variations[Math.floor(Math.random() * variations.length)];

    const urgency =
      urgencyLevels[Math.floor(Math.random() * urgencyLevels.length)];
    const patientType =
      patientTypes[Math.floor(Math.random() * patientTypes.length)];

    // Assign response priority based on urgency and intent
    let responsePriority = 1;
    if (urgency === "urgent") responsePriority = 4;
    else if (urgency === "high") responsePriority = 3;
    else if (urgency === "medium") responsePriority = 2;
    else responsePriority = 1;

    // Boost priority for complaints and medication questions
    if (intent === "complaint")
      responsePriority = Math.min(5, responsePriority + 1);
    if (intent === "medication question")
      responsePriority = Math.min(5, responsePriority + 1);

    patientMessages.push({
      message_id: `msg_${messageId.toString().padStart(6, "0")}`,
      message_content: finalMessage,
      intent_category: intent,
      urgency_level: urgency,
      patient_type: patientType,
      response_priority: responsePriority,
    });

    messageId++;
  }

  const dataset: Dataset = {
    id: "1",
    name: "Patient Communication Intent",
    description:
      "Patient messages and inquiries classified by intent and communication type",
    entries: patientMessages.length,
    columns: 6,
    lastUpdated: "2025-07-10",
    status: "active",
    createdAt: "2025-07-02",
    schema: [
      { name: "message_id", type: "identifier", dataType: "string" },
      { name: "message_content", type: "feature", dataType: "string" },
      { name: "intent_category", type: "target", dataType: "string" },
      { name: "urgency_level", type: "target", dataType: "string" },
      { name: "patient_type", type: "metadata", dataType: "string" },
      { name: "response_priority", type: "target", dataType: "integer" },
    ],
  };

  return { dataset, entries: patientMessages };
}

// Simulate model predictions with different accuracy levels and realistic error patterns
function simulateModelPredictions(
  entries: DatasetEntry[],
  baseAccuracy: number,
  iteration: number
): string[] {
  const predictions: string[] = [];
  const intents = [
    "appointment request",
    "medication question",
    "billing inquiry",
    "test results",
    "general question",
    "complaint",
  ];

  // Define confusion patterns - which intents are commonly confused with each other
  const confusionMatrix = {
    "appointment request": {
      "general question": 0.3,
      "medication question": 0.1,
      "test results": 0.1,
    },
    "medication question": {
      "appointment request": 0.2,
      "general question": 0.2,
      "test results": 0.1,
    },
    "billing inquiry": {
      "general question": 0.4,
      complaint: 0.2,
      "appointment request": 0.1,
    },
    "test results": {
      "medication question": 0.3,
      "general question": 0.2,
      "appointment request": 0.1,
    },
    "general question": {
      "appointment request": 0.3,
      "medication question": 0.2,
      "test results": 0.1,
    },
    complaint: {
      "billing inquiry": 0.4,
      "general question": 0.2,
      "appointment request": 0.1,
    },
  };

  // Add iteration-specific improvements to confusion patterns
  const iterationImprovement = iteration * 0.05; // 5% improvement per iteration

  for (const entry of entries) {
    const random = Math.random();

    // Calculate class-specific accuracy (some classes are harder than others)
    let classAccuracy = baseAccuracy;

    // Adjust accuracy based on class difficulty
    if (entry.intent_category === "complaint") {
      classAccuracy += 0.02; // Complaints are easier to identify
    } else if (entry.intent_category === "general question") {
      classAccuracy -= 0.03; // General questions are harder (ambiguous)
    } else if (entry.intent_category === "billing inquiry") {
      classAccuracy -= 0.01; // Billing inquiries can be confused with complaints
    }

    // Add iteration improvement
    classAccuracy += iterationImprovement;

    // Add realistic noise to the accuracy (±2% random variation)
    const noise = (Math.random() - 0.5) * 0.04;
    const currentAccuracy = Math.max(
      0.6,
      Math.min(0.95, classAccuracy + noise)
    );

    if (random < currentAccuracy) {
      // Correct prediction
      predictions.push(entry.intent_category);
    } else {
      // Incorrect prediction - use confusion patterns for more realistic errors
      const confusionPattern =
        confusionMatrix[entry.intent_category as keyof typeof confusionMatrix];
      const confusionEntries = Object.entries(confusionPattern);

      // Weighted random selection based on confusion patterns
      const totalWeight = confusionEntries.reduce(
        (sum, [_, weight]) => sum + weight,
        0
      );
      let randomWeight = Math.random() * totalWeight;

      let selectedIntent = intents[Math.floor(Math.random() * intents.length)]; // fallback
      for (const [intent, weight] of confusionEntries) {
        randomWeight -= weight;
        if (randomWeight <= 0) {
          selectedIntent = intent;
          break;
        }
      }

      predictions.push(selectedIntent);
    }
  }

  return predictions;
}

// Simulate model predictions that decrease accuracy but improve F1 (more recall-oriented tradeoff)
function simulateModelPredictionsWithBetterF1(
  entries: DatasetEntry[],
  baseAccuracy: number,
  iteration: number
): string[] {
  // Start slightly *less* accurate than the baseline to bias toward recall
  const reducedAccuracy = Math.max(0.55, Math.min(0.9, baseAccuracy * 0.94));

  const intents = [
    "appointment request",
    "medication question",
    "billing inquiry",
    "test results",
    "general question",
    "complaint",
  ] as const;

  // Reasonable confusions keep errors "close" (helps precision/recall balance)
  const balancedErrors: Record<
    (typeof intents)[number],
    (typeof intents)[number][]
  > = {
    "appointment request": ["general question", "medication question"],
    "medication question": ["appointment request", "test results"],
    "billing inquiry": ["general question", "complaint"],
    "test results": ["medication question", "general question"],
    "general question": ["appointment request", "medication question"],
    complaint: ["billing inquiry", "general question"],
  };

  // Simple keyword hints to "fix" obvious FN (boost recall/TP)
  const intentHints: Record<(typeof intents)[number], RegExp[]> = {
    "appointment request": [/schedule|appointment|book|reschedul/i],
    "medication question": [/medicat|prescription|dose|refill|side effect/i],
    "billing inquiry": [/bill|charge|copay|insurance|statement|payment/i],
    "test results": [/result|lab|blood test|abnormal|values/i],
    "general question": [/hours|telehealth|records|referral|policy|doctor/i],
    complaint: [/unhappy|wait|rude|complain|dissatisf|frustrat|not clean/i],
  };

  // 1) Create a first pass of predictions with slightly *lower* accuracy.
  const firstPass: string[] = [];
  for (const entry of entries) {
    const r = Math.random();
    if (r < reducedAccuracy) {
      firstPass.push(entry.intent_category);
    } else {
      const opts =
        balancedErrors[entry.intent_category as keyof typeof balancedErrors];
      firstPass.push(opts[Math.floor(Math.random() * opts.length)]);
    }
  }

  // 2) Targeted *recall fixes*: turn a slice of "obvious" mistakes into correct labels.
  //    This increases TP and reduces FN → tends to increase F1.
  const predictions = firstPass.slice();
  for (let i = 0; i < entries.length; i++) {
    const actual = entries[i].intent_category as (typeof intents)[number];
    const pred = predictions[i] as (typeof intents)[number];
    if (pred !== actual) {
      // If message matches the actual intent's hints, fix it with some probability.
      const hints = intentHints[actual];
      const looksObvious = hints.some((re) =>
        re.test(entries[i].message_content)
      );
      // Fix probability tuned to get a noticeable recall gain without overshooting accuracy too much.
      if (looksObvious && Math.random() < 0.55) {
        predictions[i] = actual; // convert FN to TP (or FP to TP across classes)
      }
    }
  }

  // 3) Add a small amount of *precision-reducing noise* on "easy" classes to push accuracy down.
  //    We intentionally create a few extra FP/FN (mostly from general/billing) to ensure accuracy dips,
  //    but we keep them as reasonable confusions so F1 doesn't crash.
  const easyBuckets: (typeof intents)[number][] = [
    "general question",
    "billing inquiry",
  ];
  for (let i = 0; i < entries.length; i++) {
    const actual = entries[i].intent_category as (typeof intents)[number];
    const pred = predictions[i] as (typeof intents)[number];

    // Only perturb when we were correct and from an "easy" bucket.
    if (pred === actual && easyBuckets.includes(actual)) {
      // Small rate keeps F1 up while shaving accuracy.
      if (Math.random() < 0.06) {
        const opts = balancedErrors[actual];
        predictions[i] = opts[Math.floor(Math.random() * opts.length)];
      }
    }
  }

  return predictions;
}

// Calculate metrics from predictions vs actual
function calculateMetrics(
  actual: string[],
  predictions: string[]
): ClassificationMetrics {
  const intents = [
    "appointment request",
    "medication question",
    "billing inquiry",
    "test results",
    "general question",
    "complaint",
  ];

  // Build confusion matrix
  const confusionMatrix: { [key: string]: { [key: string]: number } } = {};

  // Initialize confusion matrix
  for (const intent of intents) {
    confusionMatrix[intent] = {};
    for (const predictedIntent of intents) {
      confusionMatrix[intent][predictedIntent] = 0;
    }
  }

  // Fill confusion matrix
  for (let i = 0; i < actual.length; i++) {
    const actualClass = actual[i];
    const predictedClass = predictions[i];
    confusionMatrix[actualClass][predictedClass]++;
  }

  // Calculate per-class metrics
  const classMetrics: {
    [key: string]: { precision: number; recall: number; f1: number };
  } = {};

  for (const intent of intents) {
    const tp = confusionMatrix[intent][intent]; // True positives for this class
    const fp =
      Object.values(confusionMatrix).reduce(
        (sum, row) => sum + row[intent],
        0
      ) - tp; // Sum of column minus TP
    const fn =
      Object.values(confusionMatrix[intent]).reduce(
        (sum, val) => sum + val,
        0
      ) - tp; // Sum of row minus TP

    const precision = tp + fp > 0 ? tp / (tp + fp) : 0;
    const recall = tp + fn > 0 ? tp / (tp + fn) : 0;
    const f1 =
      precision + recall > 0
        ? (2 * precision * recall) / (precision + recall)
        : 0;

    classMetrics[intent] = { precision, recall, f1 };
  }

  // Calculate macro-averaged metrics
  const macroPrecision =
    Object.values(classMetrics).reduce(
      (sum, metrics) => sum + metrics.precision,
      0
    ) / intents.length;
  const macroRecall =
    Object.values(classMetrics).reduce(
      (sum, metrics) => sum + metrics.recall,
      0
    ) / intents.length;
  const macroF1 =
    Object.values(classMetrics).reduce((sum, metrics) => sum + metrics.f1, 0) /
    intents.length;

  // Calculate overall accuracy
  const totalCorrect = intents.reduce(
    (sum, intent) => sum + confusionMatrix[intent][intent],
    0
  );
  const overallAccuracy = totalCorrect / actual.length;

  // Calculate per-class specificity using one-vs-rest approach
  const classSpecificities = intents.map((intent) => {
    let tn = 0; // True negatives for this class
    let fp = 0; // False positives for this class

    // For each actual class that isn't this intent
    intents.forEach((actualClass) => {
      if (actualClass !== intent) {
        // Count predictions for other classes
        intents.forEach((predictedClass) => {
          if (predictedClass === intent) {
            // Predicted this class when it wasn't - false positive
            fp += confusionMatrix[actualClass][predictedClass];
          } else {
            // Correctly didn't predict this class - true negative
            tn += confusionMatrix[actualClass][predictedClass];
          }
        });
      }
    });

    return tn / (tn + fp); // Specificity = TN / (TN + FP)
  });

  // Calculate macro-averaged specificity
  const macroSpecificity =
    classSpecificities.reduce((sum, spec) => sum + spec, 0) / intents.length;

  // For backward compatibility, calculate binary-style metrics
  const totalTP = totalCorrect;
  const totalFP = actual.length - totalCorrect;
  const totalFN = totalFP;
  const totalTN =
    intents.length * actual.length - (totalTP + totalFP + totalFN); // Total possible negative predictions minus incorrect ones

  // Calculate proper AUC using ROC curve method
  const auc = calculateAUC(actual, predictions, intents);

  return {
    accuracy: overallAccuracy,
    precision: macroPrecision,
    recall: macroRecall,
    f1Score: macroF1,
    specificity: macroSpecificity,
    sensitivity: macroRecall,
    auc,
    confusionMatrix: {
      truePositives: totalTP,
      trueNegatives: totalTN,
      falsePositives: totalFP,
      falseNegatives: totalFN,
    },
    multiClassConfusionMatrix: confusionMatrix,
  };
}

// Calculate proper AUC using ROC curve method
function calculateAUC(
  actual: string[],
  predictions: string[],
  intents: string[]
): number {
  // For multi-class classification, we use One-vs-Rest approach
  const aucs: number[] = [];

  for (const intent of intents) {
    // Create binary labels for this intent (1 for this intent, 0 for others)
    const binaryActual = actual.map((label) => (label === intent ? 1 : 0));

    // Create confidence scores based on prediction correctness
    const confidenceScores = predictions.map((pred) => {
      if (pred === intent) {
        return 0.9; // High confidence for correct prediction
      } else {
        // Lower confidence for incorrect predictions, with some randomness
        return 0.1 + Math.random() * 0.3;
      }
    });

    // Calculate AUC for this intent using trapezoidal rule
    const auc = calculateBinaryAUC(binaryActual, confidenceScores);
    aucs.push(auc);
  }

  // Return macro-averaged AUC
  return aucs.reduce((sum, auc) => sum + auc, 0) / aucs.length;
}

// Calculate binary AUC using trapezoidal rule
function calculateBinaryAUC(actual: number[], scores: number[]): number {
  // Sort by scores in descending order
  const sortedData = actual
    .map((label, index) => ({ label, score: scores[index] }))
    .sort((a, b) => b.score - a.score);

  let tp = 0,
    fp = 0;
  let prevScore = -1;
  let auc = 0;

  const totalPositives = actual.filter((label) => label === 1).length;
  const totalNegatives = actual.filter((label) => label === 0).length;

  for (const { label, score } of sortedData) {
    if (score !== prevScore) {
      // Calculate area of trapezoid
      const tpr = tp / totalPositives;
      const fpr = fp / totalNegatives;

      if (prevScore !== -1) {
        const prevTPR = (tp - (label === 1 ? 1 : 0)) / totalPositives;
        const prevFPR = (fp - (label === 0 ? 1 : 0)) / totalNegatives;
        auc += ((fpr - prevFPR) * (tpr + prevTPR)) / 2;
      }

      prevScore = score;
    }

    if (label === 1) {
      tp++;
    } else {
      fp++;
    }
  }

  // Add final trapezoid
  const finalTPR = tp / totalPositives;
  const finalFPR = fp / totalNegatives;
  auc += ((1 - finalFPR) * (finalTPR + 1)) / 2;

  return auc;
}

// Generate experiment with progressive improvement
function generateExperiment(
  dataset: Dataset,
  entries: DatasetEntry[]
): Experiment {
  const intents = entries.map((entry) => entry.intent_category);

  const iterations = [
    {
      prompt:
        "Classify the intent of this patient message into: appointment request, medication question, billing inquiry, test results, general question, complaint. Respond with only the intent category.",
    },
    {
      prompt:
        "You are a patient communication intent classifier. Analyze the following patient message and categorize its intent as: appointment request (scheduling), medication question (prescriptions), billing inquiry (payments), test results (lab work), general question (information), complaint (dissatisfaction). Consider tone, urgency, and medical terminology. Respond with intent only.",
    },
    {
      prompt:
        "You are an expert patient communication intent classifier. Categorize this patient message's intent: appointment request (scheduling needs), medication question (prescription issues), billing inquiry (payment concerns), test results (lab inquiries), general question (information seeking), complaint (dissatisfaction). Analyze: medical terminology, urgency indicators, tone, and context. Return intent category only.",
    },
    {
      prompt:
        "You are a specialized healthcare communication intent classifier. Analyze this patient message and classify intent as: appointment request (scheduling), medication question (prescriptions), billing inquiry (payments), test results (lab work), general question (information), complaint (dissatisfaction). Consider: medical terminology, urgency indicators, emotional tone, context clues, and patient demographics. Provide only the intent category as response.",
    },
    {
      prompt:
        "You are an advanced healthcare communication intent classifier with deep expertise in patient interactions. Analyze this patient message and classify intent as: appointment request (scheduling), medication question (prescriptions), billing inquiry (payments), test results (lab work), general question (information), complaint (dissatisfaction). Consider: medical terminology, urgency indicators, emotional tone, context clues, patient demographics, and communication patterns. Provide only the intent category as response.",
    },
  ];

  const metricsOverTime: MetricsOverTime[] = [];
  const promptIterations: PromptIteration[] = [];

  iterations.forEach((iteration, index) => {
    // Calculate base accuracy that improves with iteration, with realistic noise and dip
    let baseAccuracy = 0.72 + index * 0.02; // Start at 72%, improve by 2% each iteration

    // Add a temporary dip in iteration 3 (overfitting scenario)
    if (index === 2) {
      baseAccuracy = 0.7; // Dip to 70%
    }

    // Add realistic noise (±1% random variation)
    const noise = (Math.random() - 0.5) * 0.02;
    const targetAccuracy = Math.max(0.68, Math.min(0.9, baseAccuracy + noise));

    // For iteration 3, use a special prediction strategy that decreases accuracy but improves F1
    let predictions: string[];
    if (index === 2) {
      predictions = simulateModelPredictionsWithBetterF1(
        entries,
        targetAccuracy,
        index + 1
      );
    } else {
      predictions = simulateModelPredictions(
        entries,
        targetAccuracy,
        index + 1
      );
    }
    const metrics = calculateMetrics(intents, predictions);

    // Generate timestamps on July 15, 2025 with realistic time intervals
    const baseTime = new Date("2025-07-15T14:23:18.412Z").getTime();
    // Add realistic intervals (roughly 45-75 minutes apart, with some random variation)
    const interval = (45 + Math.random() * 30) * 60 * 1000; // 45-75 minutes in milliseconds
    const timestamp = new Date(baseTime + index * interval).toISOString();

    metricsOverTime.push({
      timestamp,
      metrics,
      iteration: index + 1,
    });

    promptIterations.push({
      id: `iter-001-${index + 1}`,
      iteration: index + 1,
      prompt: iteration.prompt,
      timestamp,
      metrics,
      status: "success",
      // Generate realistic token counts (base + variation based on prompt length and complexity)
      tokensUsed: Math.floor(987 + index * 234 + (Math.random() - 0.5) * 100),
      // Generate realistic latency (base + variation + occasional spikes)
      latency: Math.floor(
        823.4 +
          index * 167.3 +
          (Math.random() - 0.5) * 200 +
          (Math.random() < 0.2 ? 300 : 0)
      ),
    });
  });

  const finalMetrics = metricsOverTime[metricsOverTime.length - 1].metrics;

  return {
    id: "exp-001",
    name: "Patient Communication Intent Optimization",
    description:
      "Optimizing system prompts for patient communication intent classification with different prompting strategies",
    status: "completed",
    createdAt: "2025-07-10",
    updatedAt: "2025-07-18",
    metrics: {
      accuracy: finalMetrics.accuracy,
      loss: 1 - finalMetrics.accuracy,
      iterations: iterations.length,
      classificationMetrics: finalMetrics,
      metricsOverTime,
      promptIterations,
    },
    dataset: dataset.name,
    model: "Claude-3",
  };
}

// Generate and save the data
function generateAndSaveData() {
  try {
    // Create scripts directory if it doesn't exist
    mkdirSync("scripts", { recursive: true });

    console.log("🔄 Generating synthetic dataset...");
    const { dataset, entries } = generateSyntheticDataset();

    console.log("🔄 Generating experiment with progressive improvement...");
    const experiment = generateExperiment(dataset, entries);

    // Save dataset
    writeFileSync(
      join("scripts", "generated-dataset.json"),
      JSON.stringify(dataset, null, 2)
    );

    // Save dataset entries (sample for demonstration)
    const sampleEntries = entries.slice(0, 50); // Save first 50 entries as sample
    writeFileSync(
      join("scripts", "generated-dataset-entries-sample.json"),
      JSON.stringify(sampleEntries, null, 2)
    );

    // Save experiment
    writeFileSync(
      join("scripts", "generated-experiment.json"),
      JSON.stringify(experiment, null, 2)
    );

    // Generate summary report
    const summary = {
      generatedAt: new Date().toISOString(),
      dataset: {
        name: dataset.name,
        entries: dataset.entries,
        columns: dataset.columns,
        sampleSize: sampleEntries.length,
      },
      experiment: {
        name: experiment.name,
        iterations: experiment.metrics?.iterations || 0,
        finalAccuracy: experiment.metrics?.accuracy || 0,
        improvement: experiment.metrics?.metricsOverTime
          ? (
              (experiment.metrics.accuracy -
                experiment.metrics.metricsOverTime[0].metrics.accuracy) *
              100
            ).toFixed(1) + "%"
          : "0%",
      },
      metricsProgression:
        experiment.metrics?.metricsOverTime?.map((m) => ({
          iteration: m.iteration,
          accuracy: m.metrics.accuracy,
          precision: m.metrics.precision,
          recall: m.metrics.recall,
          f1Score: m.metrics.f1Score,
        })) || [],
    };

    writeFileSync(
      join("scripts", "generation-summary.json"),
      JSON.stringify(summary, null, 2)
    );

    console.log("✅ Synthetic data generated successfully!");
    console.log(
      `📊 Generated dataset: ${
        dataset.name
      } with ${dataset.entries.toLocaleString()} entries`
    );
    console.log(
      `🔬 Generated experiment: ${experiment.name} with ${experiment.metrics?.iterations} iterations`
    );
    console.log("\n📁 Files created:");
    console.log("  - scripts/generated-dataset.json");
    console.log("  - scripts/generated-dataset-entries-sample.json");
    console.log("  - scripts/generated-experiment.json");
    console.log("  - scripts/generation-summary.json");

    console.log("\n📈 Model Improvement Summary:");
    console.log(
      `  - Starting accuracy: ${(
        experiment.metrics?.metricsOverTime?.[0]?.metrics.accuracy || 0
      ).toFixed(3)}`
    );
    console.log(
      `  - Final accuracy: ${(experiment.metrics?.accuracy || 0).toFixed(3)}`
    );
    console.log(`  - Total improvement: ${summary.experiment.improvement}`);

    console.log("\n📊 Metrics Progression:");
    summary.metricsProgression.forEach((m) => {
      console.log(
        `  - Iteration ${m.iteration}: Accuracy ${m.accuracy.toFixed(
          3
        )}, F1 ${m.f1Score.toFixed(3)}`
      );
    });
  } catch (error) {
    console.error("❌ Error generating synthetic data:", error);
  }
}

// Run the generation
generateAndSaveData();

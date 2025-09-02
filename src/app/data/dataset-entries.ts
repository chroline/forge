// Synthetic dataset entries for the Patient Communication Intent dataset
// This data was generated using the scripts/generate-synthetic-data.ts script

export interface DatasetEntry {
  message_id: string;
  message_content: string;
  intent_category: string;
  urgency_level: string;
  patient_type: string;
  response_priority: number;
}

// Sample of 50 entries from the generated synthetic dataset
export const datasetEntries: DatasetEntry[] = [
  {
    message_id: "msg_000001",
    message_content: "I need to schedule an appointment with Dr. Smith",
    intent_category: "appointment request",
    urgency_level: "medium",
    patient_type: "existing",
    response_priority: 2,
  },
  {
    message_id: "msg_000002",
    message_content: "What are the side effects of my blood pressure medication?",
    intent_category: "medication question",
    urgency_level: "high",
    patient_type: "existing",
    response_priority: 4,
  },
  {
    message_id: "msg_000003",
    message_content: "I received a bill that seems incorrect",
    intent_category: "billing inquiry",
    urgency_level: "medium",
    patient_type: "existing",
    response_priority: 2,
  },
  {
    message_id: "msg_000004",
    message_content: "When will my blood test results be available?",
    intent_category: "test results",
    urgency_level: "high",
    patient_type: "existing",
    response_priority: 3,
  },
  {
    message_id: "msg_000005",
    message_content: "What are your office hours?",
    intent_category: "general question",
    urgency_level: "low",
    patient_type: "new",
    response_priority: 1,
  },
  {
    message_id: "msg_000006",
    message_content: "I'm very unhappy with my last visit",
    intent_category: "complaint",
    urgency_level: "high",
    patient_type: "existing",
    response_priority: 4,
  },
  {
    message_id: "msg_000007",
    message_content: "Can I book a follow-up visit for next week?",
    intent_category: "appointment request",
    urgency_level: "medium",
    patient_type: "existing",
    response_priority: 2,
  },
  {
    message_id: "msg_000008",
    message_content: "Can I take this medication with food?",
    intent_category: "medication question",
    urgency_level: "medium",
    patient_type: "existing",
    response_priority: 3,
  },
  {
    message_id: "msg_000009",
    message_content: "Can you explain the charges on my statement?",
    intent_category: "billing inquiry",
    urgency_level: "medium",
    patient_type: "existing",
    response_priority: 2,
  },
  {
    message_id: "msg_000010",
    message_content: "Can you explain what my lab results mean?",
    intent_category: "test results",
    urgency_level: "high",
    patient_type: "existing",
    response_priority: 3,
  },
  {
    message_id: "msg_000011",
    message_content: "Do you accept my insurance plan?",
    intent_category: "general question",
    urgency_level: "low",
    patient_type: "new",
    response_priority: 1,
  },
  {
    message_id: "msg_000012",
    message_content: "The wait time was unacceptable",
    intent_category: "complaint",
    urgency_level: "high",
    patient_type: "existing",
    response_priority: 4,
  },
  {
    message_id: "msg_000013",
    message_content: "I'd like to make an appointment for my annual checkup",
    intent_category: "appointment request",
    urgency_level: "low",
    patient_type: "existing",
    response_priority: 1,
  },
  {
    message_id: "msg_000014",
    message_content: "I'm running low on my prescription, can I get a refill?",
    intent_category: "medication question",
    urgency_level: "high",
    patient_type: "existing",
    response_priority: 4,
  },
  {
    message_id: "msg_000015",
    message_content: "I need to set up a payment plan for my medical bills",
    intent_category: "billing inquiry",
    urgency_level: "medium",
    patient_type: "existing",
    response_priority: 2,
  },
  {
    message_id: "msg_000016",
    message_content: "I need to get a copy of my test results",
    intent_category: "test results",
    urgency_level: "medium",
    patient_type: "existing",
    response_priority: 2,
  },
  {
    message_id: "msg_000017",
    message_content: "Can you recommend a good specialist?",
    intent_category: "general question",
    urgency_level: "medium",
    patient_type: "existing",
    response_priority: 2,
  },
  {
    message_id: "msg_000018",
    message_content: "The staff was rude to me during my appointment",
    intent_category: "complaint",
    urgency_level: "high",
    patient_type: "existing",
    response_priority: 4,
  },
  {
    message_id: "msg_000019",
    message_content: "Need to reschedule my appointment from Tuesday to Thursday",
    intent_category: "appointment request",
    urgency_level: "medium",
    patient_type: "existing",
    response_priority: 2,
  },
  {
    message_id: "msg_000020",
    message_content: "Is it safe to take this medicine while pregnant?",
    intent_category: "medication question",
    urgency_level: "urgent",
    patient_type: "existing",
    response_priority: 5,
  },
  {
    message_id: "msg_000021",
    message_content: "Why wasn't my insurance applied to this visit?",
    intent_category: "billing inquiry",
    urgency_level: "high",
    patient_type: "existing",
    response_priority: 3,
  },
  {
    message_id: "msg_000022",
    message_content: "Are my test results normal?",
    intent_category: "test results",
    urgency_level: "high",
    patient_type: "existing",
    response_priority: 3,
  },
  {
    message_id: "msg_000023",
    message_content: "What should I bring to my first appointment?",
    intent_category: "general question",
    urgency_level: "low",
    patient_type: "new",
    response_priority: 1,
  },
  {
    message_id: "msg_000024",
    message_content: "I'm filing a complaint about my treatment",
    intent_category: "complaint",
    urgency_level: "urgent",
    patient_type: "existing",
    response_priority: 5,
  },
  {
    message_id: "msg_000025",
    message_content: "Looking to schedule a consultation about my back pain",
    intent_category: "appointment request",
    urgency_level: "high",
    patient_type: "existing",
    response_priority: 3,
  },
  {
    message_id: "msg_000026",
    message_content: "What time should I take my diabetes medication?",
    intent_category: "medication question",
    urgency_level: "medium",
    patient_type: "existing",
    response_priority: 3,
  },
  {
    message_id: "msg_000027",
    message_content: "I think there's an error in my billing statement",
    intent_category: "billing inquiry",
    urgency_level: "high",
    patient_type: "existing",
    response_priority: 3,
  },
  {
    message_id: "msg_000028",
    message_content: "Can you send my results to my specialist?",
    intent_category: "test results",
    urgency_level: "medium",
    patient_type: "existing",
    response_priority: 2,
  },
  {
    message_id: "msg_000029",
    message_content: "How do I access my medical records online?",
    intent_category: "general question",
    urgency_level: "low",
    patient_type: "existing",
    response_priority: 1,
  },
  {
    message_id: "msg_000030",
    message_content: "The doctor didn't listen to my concerns",
    intent_category: "complaint",
    urgency_level: "high",
    patient_type: "existing",
    response_priority: 4,
  },
  {
    message_id: "msg_000031",
    message_content: "Can you help me book an appointment with the cardiologist?",
    intent_category: "appointment request",
    urgency_level: "high",
    patient_type: "existing",
    response_priority: 3,
  },
  {
    message_id: "msg_000032",
    message_content: "I missed a dose of my medication, what should I do?",
    intent_category: "medication question",
    urgency_level: "high",
    patient_type: "existing",
    response_priority: 4,
  },
  {
    message_id: "msg_000033",
    message_content: "Can I get an itemized breakdown of my charges?",
    intent_category: "billing inquiry",
    urgency_level: "medium",
    patient_type: "existing",
    response_priority: 2,
  },
  {
    message_id: "msg_000034",
    message_content: "I'm concerned about my recent test results",
    intent_category: "test results",
    urgency_level: "urgent",
    patient_type: "existing",
    response_priority: 5,
  },
  {
    message_id: "msg_000035",
    message_content: "What's the best way to contact my doctor?",
    intent_category: "general question",
    urgency_level: "low",
    patient_type: "existing",
    response_priority: 1,
  },
  {
    message_id: "msg_000036",
    message_content: "I'm dissatisfied with the care I received",
    intent_category: "complaint",
    urgency_level: "high",
    patient_type: "existing",
    response_priority: 4,
  },
  {
    message_id: "msg_000037",
    message_content: "I need to see a specialist for my knee injury",
    intent_category: "appointment request",
    urgency_level: "high",
    patient_type: "existing",
    response_priority: 3,
  },
  {
    message_id: "msg_000038",
    message_content: "Can you explain what this new medication does?",
    intent_category: "medication question",
    urgency_level: "medium",
    patient_type: "existing",
    response_priority: 3,
  },
  {
    message_id: "msg_000039",
    message_content: "I need help understanding my copay amount",
    intent_category: "billing inquiry",
    urgency_level: "medium",
    patient_type: "existing",
    response_priority: 2,
  },
  {
    message_id: "msg_000040",
    message_content: "When should I get my next round of tests?",
    intent_category: "test results",
    urgency_level: "medium",
    patient_type: "existing",
    response_priority: 2,
  },
  {
    message_id: "msg_000041",
    message_content: "Do you offer telehealth appointments?",
    intent_category: "general question",
    urgency_level: "low",
    patient_type: "existing",
    response_priority: 1,
  },
  {
    message_id: "msg_000042",
    message_content: "The facility was not clean during my visit",
    intent_category: "complaint",
    urgency_level: "high",
    patient_type: "existing",
    response_priority: 4,
  },
  {
    message_id: "msg_000043",
    message_content: "Want to schedule a routine physical examination",
    intent_category: "appointment request",
    urgency_level: "low",
    patient_type: "existing",
    response_priority: 1,
  },
  {
    message_id: "msg_000044",
    message_content: "I'm experiencing side effects from my medication",
    intent_category: "medication question",
    urgency_level: "urgent",
    patient_type: "existing",
    response_priority: 5,
  },
  {
    message_id: "msg_000045",
    message_content: "Why am I being charged for a service I didn't receive?",
    intent_category: "billing inquiry",
    urgency_level: "high",
    patient_type: "existing",
    response_priority: 3,
  },
  {
    message_id: "msg_000046",
    message_content: "Can you explain the abnormal values in my results?",
    intent_category: "test results",
    urgency_level: "high",
    patient_type: "existing",
    response_priority: 3,
  },
  {
    message_id: "msg_000047",
    message_content: "Can you help me find a primary care physician?",
    intent_category: "general question",
    urgency_level: "medium",
    patient_type: "new",
    response_priority: 2,
  },
  {
    message_id: "msg_000048",
    message_content: "I want to speak to a manager about my experience",
    intent_category: "complaint",
    urgency_level: "high",
    patient_type: "existing",
    response_priority: 4,
  },
  {
    message_id: "msg_000049",
    message_content: "Need an appointment for my prescription refill",
    intent_category: "appointment request",
    urgency_level: "medium",
    patient_type: "existing",
    response_priority: 2,
  },
  {
    message_id: "msg_000050",
    message_content: "Do I need to adjust my medication dosage?",
    intent_category: "medication question",
    urgency_level: "high",
    patient_type: "existing",
    response_priority: 4,
  },
];

// API functions for dataset entries
export const datasetEntriesApi = {
  // Get all entries for a dataset
  getByDatasetId: async (datasetId: string): Promise<DatasetEntry[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    // For now, return the sample entries for dataset "1"
    if (datasetId === "1") {
      return datasetEntries;
    }
    
    return [];
  },

  // Get entries with pagination
  getPaginated: async (
    datasetId: string,
    page: number = 1,
    pageSize: number = 20
  ): Promise<{ entries: DatasetEntry[]; total: number; page: number; pageSize: number }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    if (datasetId === "1") {
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedEntries = datasetEntries.slice(startIndex, endIndex);
      
      return {
        entries: paginatedEntries,
        total: datasetEntries.length,
        page,
        pageSize,
      };
    }
    
    return { entries: [], total: 0, page, pageSize };
  },

  // Search entries
  search: async (
    datasetId: string,
    query: string
  ): Promise<DatasetEntry[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    if (datasetId === "1") {
      const lowercaseQuery = query.toLowerCase();
      return datasetEntries.filter(
        (entry) =>
          entry.message_content.toLowerCase().includes(lowercaseQuery) ||
          entry.intent_category.toLowerCase().includes(lowercaseQuery) ||
          entry.urgency_level.toLowerCase().includes(lowercaseQuery) ||
          entry.patient_type.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    return [];
  },

  // Filter entries by intent category
  filterByIntent: async (
    datasetId: string,
    intent: string
  ): Promise<DatasetEntry[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 150));
    
    if (datasetId === "1") {
      return datasetEntries.filter(
        (entry) => entry.intent_category === intent
      );
    }
    
    return [];
  },

  // Filter entries by urgency level
  filterByUrgency: async (
    datasetId: string,
    urgency: string
  ): Promise<DatasetEntry[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 150));
    
    if (datasetId === "1") {
      return datasetEntries.filter(
        (entry) => entry.urgency_level === urgency
      );
    }
    
    return [];
  },
};

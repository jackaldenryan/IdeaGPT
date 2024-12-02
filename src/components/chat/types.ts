// src/types.ts

// Type definition for a single idea
export interface Idea {
  id: number;
  description: string;
  label: "good" | "bad" | "neutral";
  reason: string;
}

// Type definition for the full LLM response
export interface LLMResponse {
  ideas: {
    ideas_list: Idea[];
  };
}

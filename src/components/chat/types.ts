// src/types.ts

// Type definition for a single idea
export interface Idea {
    id: number;
    description: string;
    label: 'good' | 'bad'; // Label indicating if the idea is marked good or bad
    reason: string;        // Reason for why it's marked good or bad
}


// Type definition for the full LLM response
export interface LLMResponse {
    ideas: {
        ideas_list: Idea[];
    };
}

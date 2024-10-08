"use client";

import * as React from "react";
import { useState } from "react";
import PromptBoxAndButtons from "@/components/chat/PromptBoxAndButtons";
import IdeaTableContainer from "@/components/chat/IdeaTableContainer";

import { Idea } from "@/components/chat/types";

export default function IdeaGenerationUI() {
  const [ideas, setIdeas] = useState<Idea[]>([]);

  const handleAppendIdeas = (newIdeas: Idea[]) => {
    const initializedIdeas = newIdeas.map((idea) => ({
      ...idea,
      label: "bad" as "bad", // Default label is "bad"
      reason: "", // Default reason is an empty string
    }));

    // Append the new ideas to the existing ones
    setIdeas((prevIdeas) => [...prevIdeas, ...initializedIdeas]);
  };

  return (
    <div className="flex flex-col justify-between items-center h-[90vh] w-full">
      <div className="w-full flex-grow">
        <IdeaTableContainer ideas={ideas} setIdeas={setIdeas} />
      </div>
      <div className="w-1/2 mt-4 mb-8">
        <PromptBoxAndButtons onNewIdeas={handleAppendIdeas} ideas={ideas} />
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { useState } from "react";
import PromptBoxAndButtons from "@/components/chat/PromptBoxAndButtons";
import IdeaTableContainer from "@/components/chat/IdeaTableContainer";

import { Idea } from "@/components/chat/types";

export default function IdeaGenerationUI() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [nextId, setNextId] = useState<number>(0);

  const handleAppendIdeas = (newIdeas: Idea[]) => {
    const initializedIdeas = newIdeas.map((idea, index) => ({
      ...idea,
      id: nextId + index,
      label: "neutral" as const,
      reason: "",
    }));

    setIdeas((prevIdeas) => [...prevIdeas, ...initializedIdeas]);
    setNextId(nextId + newIdeas.length);
  };

  return (
    <div className="flex flex-col h-[90vh] w-full">
      <div className="w-full flex-grow">
        <IdeaTableContainer ideas={ideas} setIdeas={setIdeas} />
      </div>
      <div className="w-full md:w-1/2 mt-4 mb-8 flex-shrink-0 mx-auto px-4">
        <PromptBoxAndButtons onNewIdeas={handleAppendIdeas} ideas={ideas} />
      </div>
    </div>
  );
}

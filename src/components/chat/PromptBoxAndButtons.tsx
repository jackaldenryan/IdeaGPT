"use client";

import React, { useState } from "react";
import PromptBox from "./PromptBox";
import PromptButton from "./PromptButton";
import GearIcon from "./GearIcon";

import { Idea, LLMResponse } from "@/components/chat/types";

type PromptBoxAndButtonsProps = {
  onNewIdeas: (newIdeas: Idea[]) => void;
  ideas: Idea[];
};

export default function PromptBoxAndButton({
  onNewIdeas,
  ideas,
}: PromptBoxAndButtonsProps) {
  const [prompt, setPrompt] = useState("");
  const [options, setOptions] = useState({
    numIdeas: 10,
    modelType: "gpt-4o-mini",
  });

  const handleGenerate = async () => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          ideas: { ideas_list: ideas },
          options,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data: LLMResponse = await response.json();

      onNewIdeas(data.ideas.ideas_list);
    } catch (error) {
      console.error("Error generating ideas:", error);
    }
  };

  return (
    <div>
      <div className="flex items-end space-x-4 w-full">
        <PromptBox value={prompt} onChange={setPrompt} className="flex-grow" />
        <PromptButton onClick={handleGenerate} />
        <GearIcon setOptions={setOptions} options={options} />
      </div>
    </div>
  );
}

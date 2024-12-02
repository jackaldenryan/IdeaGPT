// PromptBox.tsx
"use client";

import React from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

type PromptBoxProps = {
  className?: string;
  value: string;
  onChange: (value: string) => void;
};

export default function PromptBox({
  className,
  value,
  onChange,
}: PromptBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      document.getElementById("generate-btn")?.click();
      event.currentTarget.blur();
    }
  };

  return (
    <div className={`relative ${className}`} style={{ minHeight: "50px" }}>
      <TextareaAutosize
        className="absolute bottom-0 left-0 w-full text-md font-sans leading-normal p-3 rounded-xl rounded-br-none shadow-lg shadow-slate-100 focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 focus:border-purple-500 focus-visible:outline-0 box-border"
        aria-label="Text box for entering a prompt - what ideas do you want to generate?"
        placeholder="Message IdeaGPT"
        minRows={1}
        maxRows={5}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        style={{ resize: "none" }} // Prevent manual resizing
      />
    </div>
  );
}

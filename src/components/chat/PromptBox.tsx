// PromptBox.tsx
"use client";

import React from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

type PromptBoxProps = {
  className?: string;
  value: string;
  onChange: (value: string) => void;
};

export default function PromptBox({ className, value, onChange }: PromptBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={`flex ${className}`}>
      <TextareaAutosize
        className="text-md font-sans leading-normal p-3 rounded-xl rounded-br-none shadow-lg shadow-slate-100 focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 focus:border-purple-500 focus-visible:outline-0 box-border w-full"
        aria-label="Text box for entering a prompt - what ideas do you want to generate?"
        placeholder="What ideas do you want to generate?"
        minRows={1}
        maxRows={5}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}




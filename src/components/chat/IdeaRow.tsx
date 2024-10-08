"use client";

import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

import { Idea } from '@/components/chat/types';

type IdeaRowProps = {
    idea: Idea;
    setIdea: (updatedIdea: Idea) => void; // Function to update this specific idea
  };

export default function IdeaRow({ idea, setIdea }: IdeaRowProps) {
    const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIdea({ ...idea, label: event.target.checked ? 'good' : 'bad' });
    };
    
    const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIdea({ ...idea, reason: event.target.value });
    };
  return (
    <div className="flex justify-between items-center py-2 border-b w-full max-w-full">
      {/* Idea description */}
      <div className="flex-1 text-left">
        {idea.description}
      </div>

      {/* Checkbox and Textbox */}
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={idea.label === 'good'}
          onChange={handleLabelChange}
        />

        {/* Textbox */}
        <TextField
          variant="standard"
          size="small"
          placeholder="Feedback"
          value={idea.reason}
          onChange={handleReasonChange}
          sx={{ width: '150px' }} // Fixed width for the textbox
        />
      </div>
    </div>
  );
}
"use client";

import * as React from 'react';
import IdeaRow from './IdeaRow';

import { Idea } from '@/components/chat/types';

type IdeaTableProps = {
    ideas: Idea[];
    setIdeas: (updatedIdeas: Idea[]) => void;
  };


export default function IdeaTable({ ideas, setIdeas }: IdeaTableProps) {
  const updateIdea = (updatedIdea: Idea) => {
    const updatedIdeas = ideas.map(idea => 
        idea.id === updatedIdea.id ? updatedIdea : idea
    );
    setIdeas(updatedIdeas);
  };
  return (
    <div className="flex flex-col justify-start items-center h-[90vh] w-full">
      {ideas.map((idea) => (
        <IdeaRow key={idea.id} idea={idea} setIdea={updateIdea}/>
      ))}
    </div>
  );
}

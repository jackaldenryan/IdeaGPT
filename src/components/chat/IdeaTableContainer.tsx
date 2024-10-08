"use client";

import * as React from 'react';
import IdeaTable from './IdeaTable';

import { Idea } from '@/components/chat/types';

type IdeaTableContainerProps = {
    ideas: Idea[];
    setIdeas: (updatedIdeas: Idea[]) => void;
  };

export default function IdeaTableContainer({ ideas, setIdeas }: IdeaTableContainerProps) {
  return (
    <div className="flex justify-center w-full max-h-[80vh] overflow-y-auto px-4 py-2"> {/* Full-width container */}
      <div className="w-1/2"> {/* The IdeaTable will take up half the width */}
        <IdeaTable ideas={ideas} setIdeas={setIdeas} />
      </div>
    </div>
  );
}

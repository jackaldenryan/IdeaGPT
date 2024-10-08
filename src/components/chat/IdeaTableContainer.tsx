// "use client";

// import * as React from "react";
// import IdeaTable from "./IdeaTable";

// import { Idea } from "@/components/chat/types";

// type IdeaTableContainerProps = {
//   ideas: Idea[];
//   setIdeas: (updatedIdeas: Idea[]) => void;
// };

// export default function IdeaTableContainer({
//   ideas,
//   setIdeas,
// }: IdeaTableContainerProps) {
//   return (
//     <div className="flex justify-center w-full max-h-[80vh] overflow-y-auto px-4 py-2">
//       {" "}
//       {/* Full-width container */}
//       <div className="w-1/2">
//         {" "}
//         {/* The IdeaTable will take up half the width */}
//         <IdeaTable ideas={ideas} setIdeas={setIdeas} />
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useRef, useEffect } from "react";
import IdeaTable from "./IdeaTable";

import { Idea } from "@/components/chat/types";

type IdeaTableContainerProps = {
  ideas: Idea[];
  setIdeas: (updatedIdeas: Idea[]) => void;
};

export default function IdeaTableContainer({
  ideas,
  setIdeas,
}: IdeaTableContainerProps) {
  const scrollableContainerRef = useRef<HTMLDivElement>(null);
  const prevIdeasLengthRef = useRef<number>(ideas.length);

  useEffect(() => {
    if (ideas.length > prevIdeasLengthRef.current) {
      // New ideas have been added
      if (scrollableContainerRef.current) {
        scrollableContainerRef.current.scrollTo({
          top: scrollableContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }
    // Update the previous length to current length
    prevIdeasLengthRef.current = ideas.length;
  }, [ideas]);

  return (
    <div
      ref={scrollableContainerRef}
      className="flex justify-center w-full max-h-[80vh] overflow-y-auto px-4 py-2"
    >
      {/* Full-width container */}
      <div className="w-1/2">
        {/* The IdeaTable will take up half the width */}
        <IdeaTable ideas={ideas} setIdeas={setIdeas} />
      </div>
    </div>
  );
}

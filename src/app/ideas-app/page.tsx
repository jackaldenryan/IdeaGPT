// src/app/page.tsx

"use client";

import React from "react";
import IdeaGenerationUI from "@/components/chat/IdeaGenerationUI";
import withAuth from "@/hoc/withAuth";

function Page() {
  return <IdeaGenerationUI />;
}

export default withAuth(Page);

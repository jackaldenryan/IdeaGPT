// src/app/api/generate/route.ts
import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const generatedIdea = z.object({
  id: z.number(), // This is purely to help the LLM count how many ideas it generates. The final ID will be overwritten manually
  description: z.string(),
});

const generatedIdeas = z.object({
  ideas_list: z.array(generatedIdea),
});

const previousIdea = z.object({
  id: z.number(),
  description: z.string(),
  label: z.enum(["good", "bad", "neutral"]),
  reason: z.string().optional(),
});

const previousIdeas = z.object({
  ideas_list: z.array(previousIdea),
});

const openai = new OpenAI();

export async function POST(request: Request) {
  try {
    const { prompt, ideas, options } = await request.json();

    const parsedIdeas = previousIdeas.parse(ideas);

    const finalPrompt = generateFinalPrompt(
      prompt,
      parsedIdeas,
      options.numIdeas
    );

    console.log("\n\nSUPER-PROMPT:\n");
    console.log(finalPrompt);
    console.log("\n\n");
    console.log("OPTIONS:\n", options);
    console.log("\n\n");

    // Call OpenAI API to get new ideas
    const completion = await openai.beta.chat.completions.parse({
      model: options.modelType,
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: finalPrompt },
      ],
      response_format: zodResponseFormat(generatedIdeas, "ideas"),
    });

    const newIdeas = completion.choices[0].message.parsed;

    console.log(newIdeas);

    if (!newIdeas) {
      return NextResponse.json(
        { error: "No ideas generated" },
        { status: 400 }
      );
    }

    return NextResponse.json({ ideas: newIdeas });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate ideas" },
      { status: 500 }
    );
  }
}

// Helper function to generate the final prompt using the old ideas
function generateFinalPrompt(
  prompt: string,
  ideas: z.infer<typeof previousIdeas>,
  numIdeas: number
) {
  let finalPrompt = `${prompt}. What are ${numIdeas} different ideas? Ensure each idea is unique.\n`;

  const goodIdeasPromptPiece = generateGoodIdeasPromptPiece(ideas);
  const badIdeasPromptPiece = generateBadIdeasPromptPiece(ideas);
  const neutralIdeasPromptPiece = generateNeutralIdeasPromptPiece(ideas);

  finalPrompt +=
    goodIdeasPromptPiece + badIdeasPromptPiece + neutralIdeasPromptPiece;
  return finalPrompt;
}

// Function to generate prompt piece for good ideas
function generateGoodIdeasPromptPiece(ideas: z.infer<typeof previousIdeas>) {
  const goodIdeas = ideas.ideas_list.filter((idea) => idea.label === "good");
  if (goodIdeas.length === 0) return "";

  const goodIdeasString = ideasToString(goodIdeas);
  return `\n\nHere are the ideas you previously generated which the user LIKES. Try to generate more ideas like these. Pay close attention to the reason it is a good idea (if a reason is given):\n${goodIdeasString}`;
}

// Function to generate prompt piece for bad ideas
function generateBadIdeasPromptPiece(ideas: z.infer<typeof previousIdeas>) {
  const badIdeas = ideas.ideas_list.filter((idea) => idea.label === "bad");
  if (badIdeas.length === 0) return "";

  const badIdeasString = ideasToString(badIdeas);
  return `\n\nHere are the ideas you previously generated which the user DOES NOT LIKE. Avoid generating ideas like these. Pay close attention to the reason it is a bad idea (if a reason is given):\n${badIdeasString}`;
}

// Function to generate prompt piece for bad ideas
function generateNeutralIdeasPromptPiece(ideas: z.infer<typeof previousIdeas>) {
  const neutralIdeas = ideas.ideas_list.filter(
    (idea) => idea.label === "neutral"
  );
  if (neutralIdeas.length === 0) return "";

  const neutralIdeasString = ideasToString(neutralIdeas);
  return `\n\nHere are the ideas you previously generated which the user IS NEUTRAL ABOUT:\n${neutralIdeasString}`;
}

// Helper function to convert ideas to a string format for the prompt
function ideasToString(ideas: Array<z.infer<typeof previousIdea>>) {
  return ideas
    .map((idea) => {
      const reason = idea.reason ? ` (Reason: ${idea.reason})` : "";
      return `${idea.description}${reason}`;
    })
    .join("\n");
}

// // src/app/api/generate/route.ts
// import { NextResponse } from 'next/server';
// import { OpenAI } from 'openai';
// import { zodResponseFormat } from "openai/helpers/zod";
// import { z } from "zod";

// const Idea = z.object({
//     id: z.number(),          // Equivalent to Python's int type
//     description: z.string(), // Equivalent to Python's str type
//   });

//   const Ideas = z.object({
//     ideas_list: z.array(Idea), // Equivalent to a list of Idea objects
//   });

// const openai = new OpenAI();

// export async function POST(request: Request) {
//   try {
//     const { prompt } = await request.json();

//     const completion = await openai.beta.chat.completions.parse({
//       model: "gpt-4o-mini",
//       messages: [
//         { role: "system", content: "You are a helpful assistant. Please provide a list of ideas separated by newlines." },
//         { role: "user", content: prompt },
//       ],
//       response_format: zodResponseFormat(Ideas, "ideas"),
//     });

//     const ideas = completion.choices[0].message.parsed;

//     if (!ideas) {
//         // Handle cases where no ideas were parsed
//         return NextResponse.json({ error: 'No ideas found' }, { status: 400 });
//     }

//     return NextResponse.json({ ideas });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Failed to generate ideas' }, { status: 500 });
//   }
// }

// src/app/api/generate/route.ts
import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

// Define the structure for the Idea and Ideas objects
const Idea = z.object({
  id: z.number(), // Equivalent to Python's int type
  description: z.string(), // Equivalent to Python's str type
  label: z.enum(["good", "bad"]), // Label can be 'good' or 'bad'
  reason: z.string().optional(), // Optional reason
});

const Ideas = z.object({
  ideas_list: z.array(Idea), // Equivalent to a list of Idea objects
});

const openai = new OpenAI();

export async function POST(request: Request) {
  try {
    const { prompt, ideas, options } = await request.json(); // Extract prompt and ideas from request

    // Parse the incoming ideas list using Zod schema
    const parsedIdeas = Ideas.parse(ideas);

    // Generate the prompt based on old ideas, including good/bad ideas and reasons
    const finalPrompt = generateFinalPrompt(
      prompt,
      parsedIdeas,
      options.numIdeas
    );

    console.log(finalPrompt);

    // Call OpenAI API to get new ideas
    const completion = await openai.beta.chat.completions.parse({
      model: options.modelType,
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: finalPrompt },
      ],
      response_format: zodResponseFormat(Ideas, "ideas"),
    });

    const newIdeas = completion.choices[0].message.parsed;

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
  ideas: z.infer<typeof Ideas>,
  numIdeas: number
) {
  let finalPrompt = `${prompt}. What are ${numIdeas} different ideas? Ensure each idea is unique.\n`;

  const goodIdeasPromptPiece = generateGoodIdeasPromptPiece(ideas);
  const badIdeasPromptPiece = generateBadIdeasPromptPiece(ideas);

  finalPrompt += goodIdeasPromptPiece + badIdeasPromptPiece;
  return finalPrompt;
}

// Function to generate prompt piece for good ideas
function generateGoodIdeasPromptPiece(ideas: z.infer<typeof Ideas>) {
  const goodIdeas = ideas.ideas_list.filter((idea) => idea.label === "good");
  if (goodIdeas.length === 0) return "";

  const goodIdeasString = ideasToString(goodIdeas);
  return `\nAlso, here are some ideas the user really likes. Try to generate more ideas like these. Pay close attention to the reason it is a good idea (if a reason is given):\n${goodIdeasString}`;
}

// Function to generate prompt piece for bad ideas
function generateBadIdeasPromptPiece(ideas: z.infer<typeof Ideas>) {
  const badIdeas = ideas.ideas_list.filter((idea) => idea.label === "bad");
  if (badIdeas.length === 0) return "";

  const badIdeasString = ideasToString(badIdeas);
  return `\n\nHere are some ideas the user does not like. Avoid generating ideas like these. Pay close attention to the reason it is a bad idea (if a reason is given):\n${badIdeasString}`;
}

// Helper function to convert ideas to a string format for the prompt
function ideasToString(ideas: Array<z.infer<typeof Idea>>) {
  return ideas
    .map((idea) => {
      const reason = idea.reason ? ` (Reason: ${idea.reason})` : "";
      return `${idea.description}${reason}`;
    })
    .join("\n");
}

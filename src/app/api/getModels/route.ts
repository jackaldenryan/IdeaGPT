import { NextResponse } from "next/server";
import OpenAI from "openai";

// Use named export for the HTTP GET method
export async function GET() {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const list = await openai.models.list();
    const modelIds: string[] = [];

    for await (const model of list) {
      // Only use models after and including gpt-4-0613 - because apparently those are the ones with structured outputs
      // TODO: still need to exclude non-chat models - dont know how
      if (model.created > 1686588895) {
        modelIds.push(model.id);
      }
    }

    return NextResponse.json({ models: modelIds });
  } catch (error) {
    console.error("Error fetching models:", error);
    return NextResponse.json(
      { error: "Failed to fetch models" },
      { status: 500 }
    );
  }
}

import { GoogleGenAI, Type } from "@google/genai";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const GeneratedQuestionSchema = z.object({
  category: z.enum(["Logic", "Programming"]),
  subCategory: z.string(),
  question: z.string(),
  codeSnippet: z.string().nullable().optional(),
  options: z.array(z.string()).min(2),
  correctAnswerIndex: z.number().int(),
  explanation: z.string(),
});

const GeneratedQuestionsSchema = z.object({
  questions: z.array(GeneratedQuestionSchema),
});

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    questions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING, enum: ["Logic", "Programming"] },
          subCategory: { type: Type.STRING },
          question: { type: Type.STRING },
          codeSnippet: { type: Type.STRING, nullable: true },
          options: { type: Type.ARRAY, items: { type: Type.STRING } },
          correctAnswerIndex: { type: Type.INTEGER },
          explanation: { type: Type.STRING },
        },
        required: ["category", "subCategory", "question", "options", "correctAnswerIndex", "explanation"],
      },
    },
  },
  required: ["questions"],
};

const DIFFICULTY_BY_RANK: Record<number, string> = {
  1: "Beginner: basic pattern recognition, single-step arithmetic sequences, simple syntax and vocabulary (variables, loops, arrays).",
  2: "Intermediate: multi-step reasoning, common algorithms, moderately tricky code behavior (off-by-one, scope).",
  3: "Advanced: layered logic chains, deceptive syllogisms, non-obvious code output (mutation, closures, optionals).",
  4: "Expert: highly complex multi-step reasoning and advanced Swift concepts (concurrency, generics, protocol-oriented programming, memory semantics).",
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const category: "All" | "Logic" | "Programming" = body.category ?? "All";
  const rank: number = Math.min(Math.max(body.rank ?? 1, 1), 4);
  const recentAccuracy: number = body.recentAccuracy ?? 0;
  const recentSubCategories: string[] = Array.isArray(body.recentSubCategories)
    ? body.recentSubCategories.slice(-20)
    : [];
  const count = 10;

  const difficulty = DIFFICULTY_BY_RANK[rank];
  const accuracyNudge =
    recentAccuracy >= 90
      ? "The user's recent accuracy is very high (90%+) — skew slightly harder than the base difficulty."
      : recentAccuracy > 0 && recentAccuracy < 50
        ? "The user's recent accuracy is low (under 50%) — skew slightly easier than the base difficulty while staying within the level."
        : "";

  const categoryInstruction =
    category === "All"
      ? "Mix both categories roughly evenly."
      : `Every question must have category "${category}".`;

  const avoidInstruction =
    recentSubCategories.length > 0
      ? `Avoid repeating these recently-used sub-topics: ${recentSubCategories.join(", ")}.`
      : "";

  const systemInstruction =
    "You write multiple-choice practice questions for candidates preparing for the Apple Developer Academy screening test. " +
    "Questions cover two categories: 'Logic' (number series, syllogisms, spatial/abstract reasoning, seating puzzles) and " +
    "'Programming' (Swift fundamentals: loops, arrays, optionals, OOP, concurrency, data structures). " +
    "Every question needs exactly 4 plausible options with exactly one unambiguously correct answer, and a clear explanation " +
    "that justifies the correct answer using the question's own facts. Use codeSnippet only for Programming questions that show code; leave it null otherwise. " +
    "Never write a visual/emoji/ASCII-diagram question — text and code only. Respond with JSON only, matching the response schema exactly.";

  const prompt =
    `Generate ${count} practice questions.\n` +
    `Difficulty level: ${difficulty}\n` +
    (accuracyNudge ? `${accuracyNudge}\n` : "") +
    `${categoryInstruction}\n` +
    (avoidInstruction ? `${avoidInstruction}\n` : "") +
    `Each subCategory should be a short label like "Number Series" or "Optionals & Unwrapping".`;

  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "GEMINI_API_KEY is not configured" }, { status: 500 });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema,
      },
    });

    const text = response.text;
    if (!text) {
      return NextResponse.json({ error: "Model returned no content" }, { status: 502 });
    }

    const parsed = GeneratedQuestionsSchema.safeParse(JSON.parse(text));
    if (!parsed.success) {
      console.error("generate-questions: schema validation failed", parsed.error);
      return NextResponse.json({ error: "Model returned malformed output" }, { status: 502 });
    }

    const questions = parsed.data.questions
      .filter((q) => q.options.length >= 2 && q.correctAnswerIndex < q.options.length)
      .map((q, i) => ({
        id: `ai-${Date.now()}-${i}`,
        category: q.category,
        subCategory: q.subCategory,
        question: q.question,
        codeSnippet: q.codeSnippet ?? undefined,
        options: q.options,
        correctAnswerIndex: q.correctAnswerIndex,
        explanation: q.explanation,
      }));

    if (questions.length === 0) {
      return NextResponse.json({ error: "No valid questions generated" }, { status: 502 });
    }

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("generate-questions failed", error);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}

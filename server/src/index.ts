import { Hono } from "hono";
// import { streamTextHandler } from "./helpers/stream";
import { model } from "@/lib/ai/google";
import { consumeStream, smoothStream, streamText } from "ai";
import { cors } from "hono/cors";

const promptHandler = (userPrompt: string) => `

You are an AI assistant. Your task is to answer the user's questions clearly and concisely in **plain text**. 
- Do NOT respond with code, scripts, or formatting instructions.
- Keep your answers straightforward, informative, and conversational.
- Only provide extra explanations if they help clarify your answer.

USER PROMPT:
${userPrompt}

Your response should be text-only:
`;

const app = new Hono();

app.use(
    "*",
    cors({
        origin: "*",
        allowHeaders: ["Content-Type", "Authorization"],
        allowMethods: ["*"],
        credentials: true,
    }),
);

app.post("/chat", async (c) => {
    try {
        const { prompt } = await c.req.json();

        if (!prompt) return c.json({ message: "prompt not found" }, 404);

        const result = streamText({
            model,
            prompt: promptHandler(prompt),
            experimental_transform: smoothStream({
                delayInMs: 30,
                chunking: "word",
            }),
        });

        // return c.json({ text });

        return result.toTextStreamResponse();
    } catch (error) {
        console.log("failed to /chat", error);
    }
});

export default app;

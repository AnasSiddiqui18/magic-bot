import { model } from "@/lib/ai/google";
import { consumeStream, smoothStream, streamText } from "ai";

const prompt = (userPrompt: string) => `

You are an AI assistant. Your task is to answer the user's questions clearly and concisely in **plain text**. 
- Do NOT respond with code, scripts, or formatting instructions.
- Keep your answers straightforward, informative, and conversational.
- Only provide extra explanations if they help clarify your answer.

USER PROMPT:
${userPrompt}

Your response should be text-only:
`;

export async function streamTextHandler(question: string) {
    try {
        const result = streamText({
            model,
            prompt: prompt(question),
            experimental_transform: smoothStream({
                delayInMs: 30,
                chunking: "word",
            }),
            onError: (event) => {
                console.error("streaming failed", event.error);
            },
            onFinish: () => {
                console.log("streaming finished successfully");
            },
        });

        return result.toUIMessageStreamResponse({
            onFinish: ({ isAborted }) =>
                isAborted
                    ? console.log("stream aborted")
                    : console.log("stream closed normally"),

            onError: (error) => {
                console.error("error", error);
                return "failed to stream::";
            },
            consumeSseStream: consumeStream,
        });
    } catch (error) {
        console.error("failed to stream", error);
    }
}

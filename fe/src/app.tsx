import { Text, Box, useInput } from "ink";
import Spinner from "ink-spinner";
import { useEffect, useState } from "react";
import { jsonrepair } from "jsonrepair";

const TITLE = `
 ███╗   ███╗  █████╗   ██████╗  ██╗  ██████╗
 ████╗ ████║ ██╔══██╗ ██╔════╝  ██║ ██╔════╝
 ██╔████╔██║ ███████║ ██║  ███╗ ██║ ██║     
 ██║╚██╔╝██║ ██╔══██║ ██║   ██║ ██║ ██║     
 ██║ ╚═╝ ██║ ██║  ██║ ╚██████╔╝ ██║ ╚██████╗
 ╚═╝     ╚═╝ ╚═╝  ╚═╝  ╚═════╝  ╚═╝  ╚═════╝

 ██████╗   ██████╗  ████████╗
 ██╔══██╗ ██╔═══██╗ ╚══██╔══╝
 ██████╔╝ ██║   ██║    ██║   
 ██╔══██╗ ██║   ██║    ██║   
 ██████╔╝ ╚██████╔╝    ██║  
 ╚═════╝   ╚═════╝     ╚═╝ 
`;

type Message =
    | {
          content: string;
          id: string;
          role: "assistant";
      }
    | {
          content: string;
          id: string;
          role: "user";
      };

function repairJson(json: string) {
    return jsonrepair(json);
}

export default function App() {
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        // {
        //     role: "user",
        //     content: "why we dont push .env files in production actually??",
        //     id: crypto.randomUUID(),
        // },
        // {
        //     role: "assistant",
        //     content:
        //         "Execute untrusted code safely: Run AI agent output, user uploads, or third-party scripts without exposing your production systems. Build interactive tools: Create code playgrounds, AI-powered UI builders, or developer sandboxes. Test in isolation: Preview how user-submitted or agent-generated code behaves in a self-contained environment with access to logs, file edits, and live previews. Run development servers: Spin up and test applications with live previews. CLI: Use the sandbox CLI for manual testing, agentic workflows, debugging, and one-off operations",
        //     id: crypto.randomUUID(),
        // },
    ]);
    const [showCursor, setShowCursor] = useState(true);

    const [loading, setLoading] = useState(false);

    useInput(async (input, key) => {
        if (key.return) {
            if (inputValue.trim()) {
                const userMessage = {
                    content: inputValue,
                    id: crypto.randomUUID(),
                    role: "user" as const,
                };
                setMessages((prev) => [...prev, userMessage]);

                // sendMessage({text: inputValue});

                setLoading(true);

                try {
                    const response = await fetch("http://localhost:3000/chat", {
                        body: JSON.stringify({ prompt: inputValue }),
                        method: "POST",
                        headers: { Accept: "text/event-stream" },
                    });

                    const messageId = crypto.randomUUID();

                    const reader = response.body?.getReader();

                    setLoading(false);

                    while (true && reader) {
                        const { done, value } = await reader.read();

                        const textChunk = new TextDecoder("utf-8")
                            .decode(value)
                            .trim();
                        // .replace("data: ", "");

                        // console.log("chunk", textChunk);

                        // const { delta } = JSON.parse(repairJson(textChunk));

                        // if (!delta) {
                        //     // console.log(delta);

                        //     // console.log("delta not found....");

                        //     continue;
                        // }

                        setMessages((prevMessages) => {
                            const existingMessage = prevMessages.find(
                                (message) => message.id === messageId
                            );

                            if (existingMessage)
                                return prevMessages.map((message) =>
                                    message.id === messageId
                                        ? {
                                              ...message,
                                              content:
                                                  message.content +
                                                  ` ${textChunk}`,
                                          }
                                        : message
                                );

                            return [
                                ...prevMessages,
                                {
                                    id: messageId,
                                    content: textChunk,
                                    role: "assistant",
                                },
                            ];
                        });

                        if (done) {
                            break;
                        }
                    }

                    setInputValue("");
                } catch (error) {
                    console.error("something went wrong", error);
                }
            }
        } else if (key.backspace || key.delete) {
            setInputValue((prev) => prev.slice(0, -1));
        } else {
            setInputValue((prev) => prev + input);
        }
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <Box flexDirection="column" padding={1}>
            <Text color="white">{TITLE}</Text>

            <Box flexDirection="column" marginTop={1} gap={1}>
                {messages.map((msg, index) => {
                    const isBot = msg.role === "assistant";

                    return (
                        <Box key={index} gap={1}>
                            <Text color={isBot ? "cyan" : "green"} bold>
                                {isBot ? "❯ Bot " : "❯ You "}
                            </Text>

                            <Text wrap="wrap">{msg.content}</Text>
                        </Box>
                    );
                })}

                {loading && (
                    <Box gap={1}>
                        <Text color="cyan">
                            <Spinner type="dots" />
                        </Text>
                        <Text>Thinking...</Text>
                    </Box>
                )}
            </Box>

            <Box
                marginTop={1}
                borderStyle="single"
                paddingLeft={1}
                alignItems="flex-start"
            >
                <Text color="white">
                    {inputValue}
                    <Text
                        backgroundColor={!showCursor ? "black" : "white"}
                        color="black"
                    >
                        {" "}
                    </Text>
                </Text>
            </Box>
        </Box>
    );
}

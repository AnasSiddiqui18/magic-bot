import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import "dotenv/config";

export const env = createEnv({
    server: {
        GOOGLE_GENERATIVE_AI_API_KEY: z.string(),
        SERVER_BASE_URL: z.string(),
    },

    runtimeEnv: process.env,
    emptyStringAsUndefined: true,
    skipValidation: true,
});

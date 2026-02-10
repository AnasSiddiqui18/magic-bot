#!/usr/bin/env node
import { render } from "ink";
import meow from "meow";
import App from "./app";

const _a = meow(
    `
	Usage
	  $ terminal-ink-ts

	Options
		--name Your name

	Examples
	  $ terminal-ink-ts --name=Jane
	  Hello, Jane
`,
    {
        importMeta: import.meta,
        flags: {
            name: {
                type: "string",
            },
        },
    }
);

render(<App />);

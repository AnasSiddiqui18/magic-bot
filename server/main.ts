import { jsonrepair } from "jsonrepair";
import fs from "fs";

const stream = [
    `data: {"type":"start"}`,

    `data: {"type":"start-step"}

    data: {"type":"text-start","id":"0"}

    data: {"type":"text-delta","id":"0","delta":"As "}`,

    `data: {"type":"text-start","id":"0"}`,

    `data: {"type":"text-delta","id":"0","delta":"As "}`,

    `data: {"type":"text-delta","id":"0","delta":"an "}`,

    `data: {"type":"text-delta","id":"0","delta":"AI, "}`,

    `data: {"type":"text-delta","id":"0","delta":"I "}`,

    `data: {"type":"text-delta","id":"0","delta":"don't "}`,

    `data: {"type":"text-delta","id":"0","delta":"have "}`,

    `data: {"type":"text-delta","id":"0","delta":"personal "}`,

    `data: {"type":"text-delta","id":"0","delta":"thoughts "}`,

    `data: {"type":"text-delta","id":"0","delta":"or "}`,

    `data: {"type":"text-delta","id":"0","delta":"feelings "}`,

    `data: {"type":"text-delta","id":"0","delta":"in "}`,

    `data: {"type":"text-delta","id":"0","delta":"the "}`,

    `data: {"type":"text-delta","id":"0","delta":"way "}`,

    `data: {"type":"text-delta","id":"0","delta":"a "}`,

    `data: {"type":"text-delta","id":"0","delta":"human "}`,

    `data: {"type":"text-delta","id":"0","delta":"does. "}`,

    `data: {"type":"text-delta","id":"0","delta":"However, "}`,

    `data: {"type":"text-delta","id":"0","delta":"I "}`,

    `data: {"type":"text-delta","id":"0","delta":"can "}`,

    `data: {"type":"text-delta","id":"0","delta":"tell "}`,

    `data: {"type":"text-delta","id":"0","delta":"you "}`,

    `data: {"type":"text-delta","id":"0","delta":"that "}`,

    `data: {"type":"text-delta","id":"0","delta":"AI "}`,

    `data: {"type":"text-delta","id":"0","delta":"is "}`,

    `data: {"type":"text-delta","id":"0","delta":"a "}`,

    `data: {"type":"text-delta","id":"0","delta":"powerful "}`,

    `data: {"type":"text-delta","id":"0","delta":"and "}`,

    `data: {"type":"text-delta","id":"0","delta":"evolving "}`,

    `data: {"type":"text-delta","id":"0","delta":"technology "}`,

    `data: {"type":"text-delta","id":"0","delta":"designed "}`,

    `data: {"type":"text-delta","id":"0","delta":"to "}`,

    `data: {"type":"text-delta","id":"0","delta":"perform "}`,

    `data: {"type":"text-delta","id":"0","delta":"tasks "}`,

    `data: {"type":"text-delta","id":"0","delta":"that "}`,

    `data: {"type":"text-delta","id":"0","delta":"typically "}`,

    `data: {"type":"text-delta","id":"0","delta":"require "}`,

    `data: {"type":"text-delta","id":"0","delta":"human "}`,

    `data: {"type":"text-delta","id":"0","delta":"intelligence, "}`,

    `data: {"type":"text-delta","id":"0","delta":"such "}`,

    `data: {"type":"text-delta","id":"0","delta":"as "}`,

    `data: {"type":"text-delta","id":"0","delta":"learning, "}`,

    `data: {"type":"text-delta","id":"0","delta":"problem-solving, "}`,

    `data: {"type":"text-delta","id":"0","delta":"decision-making, "}`,

    `data: {"type":"text-delta","id":"0","delta":"and "}`,

    `data: {"type":"text-delta","id":"0","delta":"understanding "}`,

    `data: {"type":"text-delta","id":"0","delta":"language. "}`,

    `data: {"type":"text-delta","id":"0","delta":"It's "}`,

    `data: {"type":"text-delta","id":"0","delta":"a "}`,

    `data: {"type":"text-delta","id":"0","delta":"tool "}`,

    `data: {"type":"text-delta","id":"0","delta":"that "}`,

    `data: {"type":"text-delta","id":"0","delta":"can "}`,

    `data: {"type":"text-delta","id":"0","delta":"process "}`,

    `data: {"type":"text-delta","id":"0","delta":"vast "}`,

    `data: {"type":"text-delta","id":"0","delta":"amounts "}`,

    `data: {"type":"text-delta","id":"0","delta":"of "}`,

    `data: {"type":"text-delta","id":"0","delta":"information "}`,

    `data: {"type":"text-delta","id":"0","delta":"and "}`,

    `data: {"type":"text-delta","id":"0","delta":"automate "}`,

    `data: {"type":"text-delta","id":"0","delta":"many "}`,

    `data: {"type":"text-delta","id":"0","delta":"processes, "}`,

    `data: {"type":"text-delta","id":"0","delta":"making "}`,

    `data: {"type":"text-delta","id":"0","delta":"systems "}`,

    `data: {"type":"text-delta","id":"0","delta":"more "}`,

    `data: {"type":"text-delta","id":"0","delta":"efficient "}`,

    `data: {"type":"text-delta","id":"0","delta":"and "}`,

    `data: {"type":"text-delta","id":"0","delta":"capable.\n\n"}`,

    `data: {"type":"text-delta","id":"0","delta":"Regarding "}`,

    `data: {"type":"text-delta","id":"0","delta":"its "}`,

    `data: {"type":"text-delta","id":"0","delta":"impact "}`,

    `data: {"type":"text-delta","id":"0","delta":"on "}`,

    `data: {"type":"text-delta","id":"0","delta":"the "}`,

    `data: {"type":"text-delta","id":"0","delta":"future "}`,

    `data: {"type":"text-delta","id":"0","delta":"job "}`,

    `data: {"type":"text-delta","id":"0","delta":"market, "}`,

    `data: {"type":"text-delta","id":"0","delta":"AI "}`,

    `data: {"type":"text-delta","id":"0","delta":"is "}`,

    `data: {"type":"text-delta","id":"0","delta":"expected "}`,

    `data: {"type":"text-delta","id":"0","delta":"to "}`,

    `data: {"type":"text-delta","id":"0","delta":"bring "}`,

    `data: {"type":"text-delta","id":"0","delta":"significant "}`,

    `data: {"type":"text-delta","id":"0","delta":"changes:\n\n"}`,

    `data: {"type":"text-delta","id":"0","delta":"1.  "}`,

    `data: {"type":"text-delta","id":"0","delta":"**Automation "}`,

    `data: {"type":"text-delta","id":"0","delta":"of "}`,

    `data: {"type":"text-delta","id":"0","delta":"Repetitive "}`,

    `data: {"type":"text-delta","id":"0","delta":"Tasks:** "}`,

    `data: {"type":"text-delta","id":"0","delta":"AI "}`,

    `data: {"type":"text-delta","id":"0","delta":"will "}`,

    `data: {"type":"text-delta","id":"0","delta":"likely "}`,

    `data: {"type":"text-delta","id":"0","delta":"automate "}`,

    `data: {"type":"text-delta","id":"0","delta":"many "}`,

    `data: {"type":"text-delta","id":"0","delta":"routine, "}`,

    `data: {"type":"text-delta","id":"0","delta":"predictable, "}`,

    `data: {"type":"text-delta","id":"0","delta":"and "}`,

    `data: {"type":"text-delta","id":"0","delta":"data-heavy "}`,

    `data: {"type":"text-delta","id":"0","delta":"jobs "}`,

    `data: {"type":"text-delta","id":"0","delta":"across "}`,

    `data: {"type":"text-delta","id":"0","delta":"various "}`,

    `data: {"type":"text-delta","id":"0","delta":"sectors, "}`,

    `data: {"type":"text-delta","id":"0","delta":"leading "}`,

    `data: {"type":"text-delta","id":"0","delta":"to "}`,

    `data: {"type":"text-delta","id":"0","delta":"some "}`,

    `data: {"type":"text-delta","id":"0","delta":"job "}`,

    `data: {"type":"text-delta","id":"0","delta":"displacement "}`,

    `data: {"type":"text-delta","id":"0","delta":"in "}`,

    `data: {"type":"text-delta","id":"0","delta":"areas "}`,

    `data: {"type":"text-delta","id":"0","delta":"like "}`,

    `data: {"type":"text-delta","id":"0","delta":"administrative "}`,

    `data: {"type":"text-delta","id":"0","delta":"support, "}`,

    `data: {"type":"text-delta","id":"0","delta":"manufacturing, "}`,
];

const fixedStream = stream.map((s) => {
    const slicedString = s.slice(6);
    const parsed = JSON.parse(jsonrepair(slicedString));
    return parsed;
});

// fs.writeFileSync("data.json", JSON.stringify(fixedStream));

const json = `
data: {"type":"text-start","id":"0"}
`;

console.log(json.trim().replace("data: ", ""));

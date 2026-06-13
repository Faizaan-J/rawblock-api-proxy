import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

import FullSectionGenerator from "./MarkdownGenerators/FullSectionGenerator.ts";

import type { PathMetadata } from "../classes/PathMetadata.ts";
import type { ZodParsedResult } from "./ZodParameterParser.ts";

import ZodParser from "./ZodParameterParser.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiDirectory = path.join(__dirname, "../api");
const generatedDocsDirectory = path.join(__dirname, "../generated-docs");
const metadataFileRegex = /^.+\.meta\.ts$/;

type MetadataFileInfo = {
    filePath: string;
    rootName: string;
}

type CompleteZodParsedResults = {
    name: string;
    metadata: PathMetadata;
    parsedParameters: ZodParsedResult;
}[];

const metadataFiles: MetadataFileInfo[] = (() => {
    const targetFiles: MetadataFileInfo[] = [];
    const fileWalker = (directory: string) => {
        const files = fs.readdirSync(directory);
        for (const file of files) {
            const filePath = path.join(directory, file);
            const isDirectory = fs.statSync(filePath).isDirectory();
            if (isDirectory) {
                fileWalker(filePath);
                continue;
            }

            const matches = file.match(metadataFileRegex);
            if (!matches) continue;
            if (matches.length === 0) continue;

            const rootName = matches[0].replace(".meta.ts", "");
            targetFiles.push({filePath, rootName});
        }
    }
    fileWalker(apiDirectory);
    return targetFiles;
})();

const zodParserResults: CompleteZodParsedResults = await (async () => {
    const allResults = await Promise.all(
    metadataFiles.map(async ({ filePath, rootName }) => {
        if (!filePath || !rootName) return null;

        const metadata = await import(pathToFileURL(filePath).href)
            .then(m => m.default as PathMetadata)
            .catch(err => {
                console.error(`Failed to import ${filePath}:`, err);
            });

        if (!metadata) return;

        const parser = new ZodParser(metadata.urlClass.validationSchema);
        const parsed = parser.parse();
        return {
            metadata,
            parsedParameters: parsed
        }
        })
    );

    return allResults.filter(result => result != null) as CompleteZodParsedResults;
})();

// this method is vibecoded
const convertToKebabCase = (str: string) => {
    return str
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, "-")
        .toLowerCase();
};

for (const result of zodParserResults) {
    if (!result) continue;
    const { metadata, parsedParameters } = result;
    const fullSectionMarkdown = FullSectionGenerator.generate(metadata, parsedParameters, zodParserResults.indexOf(result));
    const outputFilePath = path.join(generatedDocsDirectory, `${convertToKebabCase(metadata.name)}.mdx`);
    fs.writeFileSync(outputFilePath, fullSectionMarkdown, "utf-8");
}
// const finalMarkdown = fullGeneratedDocs.join("\n");
// fs.readFile(readmePath, "utf-8", (err, data) => {
//     if (err) {
//         console.error("Error reading README.md:", err);
//         return;
//     }

//     const START_MARKER = "<!--TOBEGENERATED:CURRENT-FEATURES-START-->";
//     const END_MARKER = "<!--TOBEGENERATED:CURRENT-FEATURES-END-->";

//     data = data.replace(
//         new RegExp(`${START_MARKER}[\\s\\S]*?${END_MARKER}`, "g"),
//         `${START_MARKER}\n${finalMarkdown}\n${END_MARKER}`
//     )
//     console.log("Generated documentation:\n", finalMarkdown);
//     fs.writeFile(readmePath, data, "utf-8", (err) => {
//         if (err) {
//             console.error("Error writing to README.md:", err);
//             return;
//         }
//     });
// })

export type { CompleteZodParsedResults };

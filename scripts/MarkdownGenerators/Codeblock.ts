import dedent from "dedent";

class Codeblock {
    static generate(language: string, code: string): string {
        return dedent([
            `\`\`\`${language}`,
            code,
            "```"
        ].join("\n"));
    }
}

export default Codeblock;

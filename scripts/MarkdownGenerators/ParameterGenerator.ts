import { type ZodParsedResult } from "../ZodParameterParser.ts";

class ParameterGenerator {
    static #escapeMarkdownTableCell(text: string): string {
        return text.replaceAll("|", "\\|");
    }
    
    static generate(parameters: ZodParsedResult): string {
        const header = "## Parameters";
        if (parameters.length === 0) {
            return [
                header,
                "This endpoint does not accept any parameters."
            ].join("\n");
        }
        
        const rowMap = parameters.map(param => {
            const requiredText = param.required ? "✅" : "❌";
            const defaultText = param.default !== undefined ? param.default.toString() : "-";
            return `| ${this.#escapeMarkdownTableCell(param.name)} | ${this.#escapeMarkdownTableCell(param.type)} | ${requiredText} | ${this.#escapeMarkdownTableCell(param.description)} | ${this.#escapeMarkdownTableCell(defaultText)} |`;
        });

        return [
            header,
            "| Name | Type | Required | Description | Default |",
            "| ---- | ---- | -------- | ----------- | ------- |",
            ...rowMap
        ].join("\n");
    }
}

export default ParameterGenerator;

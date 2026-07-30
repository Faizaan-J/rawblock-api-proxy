import type { PathMetadata } from "../../classes/PathMetadata.ts";
import Codeblock from "./Codeblock.ts";

class ExamplesGenerator {
    static surroundWithTabItem(content: string, value: string, label: string, isDefault?: boolean): string {
        return `<TabItem value="${value}" label="${label}" ${isDefault ? 'default' : ''}>\n\n${content}\n\n</TabItem>`;
    }

    static generate(examples: PathMetadata["examples"]): string {
        let { cURL, JSFetch, Rawblock } = examples;
        if (Array.isArray(cURL)) {
            cURL = cURL.join("\n");
        }
        if (Array.isArray(JSFetch)) {
            JSFetch = JSFetch.join("\n");
        }
        if (Array.isArray(Rawblock)) {
            Rawblock = Rawblock.join("\n");
        }

        const header = "## Examples";
        const cURLSection = this.surroundWithTabItem(Codeblock.generate("bash", cURL), "curl", "cURL");
        const JSFetchSection = this.surroundWithTabItem(Codeblock.generate("javascript", JSFetch), "js", "JavaScript Fetch");
        const RawblockSection = this.surroundWithTabItem(Codeblock.generate("lua", Rawblock), "lua", "Luau", true);

        return [
            header,
            "<Tabs>",
            cURLSection, 
            JSFetchSection, 
            RawblockSection,
            "</Tabs>"
        ]
        .join("\n\n");
    }
}

export default ExamplesGenerator;

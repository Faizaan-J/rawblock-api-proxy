import type { PathMetadata } from "../../classes/PathMetadata.ts";
import Codeblock from "./Codeblock.ts";

class ExamplesGenerator {
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

        const header = "#### Examples";
        const cURLSection = "##### cURL\n" + Codeblock.generate("bash", cURL);
        const JSFetchSection = "##### JavaScript Fetch\n" + Codeblock.generate("javascript", JSFetch);
        const RawblockSection = "##### Raw Block\n" + Codeblock.generate("lua", Rawblock);

        return [
            header, 
            cURLSection, 
            JSFetchSection, 
            RawblockSection]
        .join("\n\n");
    }
}

export default ExamplesGenerator;

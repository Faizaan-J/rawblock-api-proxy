import CodeBlock from "./Codeblock.ts";
import type { PathMetadata } from "../../classes/PathMetadata.ts";

class SchemaGenerator {
    static generate(schema: PathMetadata["schematic"]): string {
        const header = "## Schema";
        const codeBlock = CodeBlock.generate("json", JSON.stringify(schema, null, 4));
        return [header, codeBlock].join("\n\n");
    }
}

export default SchemaGenerator;

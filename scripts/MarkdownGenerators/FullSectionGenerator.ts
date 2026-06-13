import type { PathMetadata } from "../../classes/PathMetadata.ts";
import { type ZodParsedResult } from "../ZodParameterParser.ts";

import HeaderGenerator from "./HeaderGenerator.ts";
import ParameterGenerator from "./ParameterGenerator.ts";
import ExamplesGenerator from "./ExamplesGenerator.ts";
import SchemaGenerator from "./SchemaGenerator.ts";

class FullSectionGenerator {
    static generate(metadata: PathMetadata, parameters: ZodParsedResult, position: number = 0) : string {
        const fullSection : string[] = [];
        fullSection.push(HeaderGenerator.generate(metadata.name, metadata.description, position));
        fullSection.push(ParameterGenerator.generate(parameters));
        fullSection.push(ExamplesGenerator.generate(metadata.examples));
        fullSection.push(SchemaGenerator.generate(metadata.schematic));
        return fullSection.join("\n\n");
    }
}

export default FullSectionGenerator;

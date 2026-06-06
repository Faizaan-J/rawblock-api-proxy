import URLClass from "./URLClass.js";
import * as zod from "zod"

type PathMetadata = {
    name: string;
    description: string;
    urlClass: URLClass;
    examples: {
        cURL: string[] | string;
        JSFetch: string[] | string;
        Rawblock: string[] | string;
    },
    schematic: zod.ZodObject;
}

export default PathMetadata;

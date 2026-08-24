import type URLClass from "./URLClass.js";

type PathMetadata = {
    name: string;
    description: string;
    urlClass: URLClass;
    examples: {
        cURL: string[] | string;
        JSFetch: string[] | string;
        Rawblock: string[] | string;
    },
    schematic: Record<string, any>;
}

export type { PathMetadata };

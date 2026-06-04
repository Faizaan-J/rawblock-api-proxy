import type { VercelRequestQuery } from '@vercel/node';
import * as zod from "zod";

abstract class URLCLass {
    constructor() {
        if (new.target === URLCLass) {
            throw new Error("URLClass cannot be instantiated directly.");
        }
    }

    abstract generate(query: VercelRequestQuery): URL | zod.z.core.$ZodIssue[];
}

export default URLCLass;

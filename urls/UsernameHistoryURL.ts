import URLClass from "../classes/URLClass.js";

import type { VercelRequestQuery } from '@vercel/node';
import * as zod from "zod";

class UsernameHistoryURL extends URLClass {
    validationSchema;
    constructor() {
        super();

        this.validationSchema = zod.object({
            userId: zod.coerce.number().int().positive()
                .describe("The user id of the player."),
            limit: zod.enum(["10", "25", "50", "100"]).transform(Number).default(10)
                .describe("The number of results per request"),
            sortOrder: zod.enum(["Asc", "Desc"]).default("Asc")
                .describe("The order the results are sorted in."),
            cursor: zod.string().optional()
                .describe("The paging cursor for the previous or next page.")
        })
    }

    generate(query: VercelRequestQuery) : URL | zod.z.core.$ZodIssue[] {
        const { success, data, error } = this.validationSchema.safeParse({ ...query });
        if (!success) {
            if (process.env.NODE_ENV !== "production") {
                console.warn(`Invalid parameters for generating UsernameHistoryURL: ${error?.message}`);
            }
            return error.issues;
        }
        
        const url = new URL(`https://users.roblox.com/v1/users/${data.userId}/username-history`);
        url.searchParams.append("limit", data.limit.toString());
        url.searchParams.append("sortOrder", data.sortOrder);
        if (data.cursor != undefined && data.cursor != "") {
            url.searchParams.append("cursor", data.cursor);
        }
        return url;
    }
}

export default new UsernameHistoryURL();

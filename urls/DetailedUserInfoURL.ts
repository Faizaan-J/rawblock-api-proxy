import URLCLass from "../classes/URLClass";

import type { VercelRequestQuery } from '@vercel/node';
import * as zod from "zod";

class DetailedUserInfoURL extends URLCLass {
    validationSchema: zod.ZodObject<{ userId: zod.z.ZodCoercedNumber<unknown>; }, zod.z.core.$strip>;
    constructor() {
        super();

        this.validationSchema = zod.object({
            userId: zod.coerce.number().int().positive()
        });
    }

    generate(query: VercelRequestQuery) : URL | zod.z.core.$ZodIssue[] {
        const { success, data, error } = this.validationSchema.safeParse({ ...query });
        if (!success) {
            if (process.env.NODE_ENV !== "production") {
                console.warn(`Invalid parameters for generating DetailedUserInfoURL: ${error?.message}`);
            }
            return error.issues;
        }

        const link = new URL(`https://users.roblox.com/v1/users/${data.userId}/`);
        return link;
    }
}

export default new DetailedUserInfoURL();

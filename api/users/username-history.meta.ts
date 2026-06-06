import PathMetadata from "../../classes/PathMetadata.js";
import UsernameHistoryURL from "../../urls/UsernameHistoryURL.js";
import * as zod from "zod";

const metadata: PathMetadata = {
    name: "Username History",
    description: "Get a list of a user's previous usernames.",
    urlClass: UsernameHistoryURL,
    examples: {
        cURL: 
        `
        curl -X GET "https://rawblock-api-proxy.vercel.app/api/users/username-history?userId=140258990&limit=10&sortOrder=Asc" \
            -H "Authorization: Bearer {API_KEY_HERE}"
        `,
        JSFetch: 
        `
        const response = fetch("https://rawblock-api-proxy.vercel.app/api/users/username-history?userId=140258990&limit=10&sortOrder=Asc", {
            headers: {
                "Authorization": "Bearer {API_KEY_HERE}"
            }
        });
        `,
        Rawblock: 
        `
        local RawblockHelpers = require("./RawblockHelpers") -- replace with the path you put RawblockHelpers in

        local Response = RawblockHelpers.GetUsernameHistory({
            UserId = 140258990,
            SortOrder = "Asc",
            Limit = 50
        })

        if (Response.success) then
            local Data = Response.data
        else
            warn(Response.error)
        end
        `
    },
    schematic: zod.object({
        body: zod.object({
            usernames: zod.array(zod.string()),
            previousPageCursor: zod.string().nullable(),
            nextPageCursor: zod.string().nullable(),
        }),
        query: zod.object({
            userId: zod.string(),
            limit: zod.string().optional(),
            sortOrder: zod.string().optional(),
            cursor: zod.string().optional()
        })
    })
}

export default metadata;

import type { PathMetadata } from "../../classes/PathMetadata.ts";
import DetailedUserInfoURL from "../../urls/DetailedUserInfoURL.ts";
import * as zod from "zod";

const metadata: PathMetadata = {
    name: "Detailed User Info",
    description: "Get detailed information about a specific user.",
    urlClass: DetailedUserInfoURL,
    examples: {
        cURL: 
        `
        curl -X GET "https://rawblock-api-proxy.vercel.app/api/users/detailed-user-info?userId=1" \
            -H "Authorization: Bearer {API_KEY_HERE}"
        `,
        JSFetch: 
        `
        const response = fetch("https://rawblock-api-proxy.vercel.app/api/users/detailed-user-info?userId=1", {
            headers: {
                "Authorization": "Bearer {API_KEY_HERE}"
            }
        });
        `,
        Rawblock: 
        `
        local RawblockHelpers = require("./RawblockHelpers") -- replace with the path you put RawblockHelpers in

        local Response = RawblockHelpers.GetDetailedUserInfo({
            UserId = 1
        })

        if (Response.success) then
            local Data = Response.data
        else
            warn(Response.error)
        end
        `
    },
    schematic: {
        body: {
            description: "string",
            created: "string",
            isBanned: "boolean",
            externalAppDisplayName: '"string" | null',
            hasVerifiedBadge: "boolean",
            id: "number",
            name: "string",
            displayName: "string"
        },
        query: {
            userId: "string"
        }
    }
}

export default metadata;

import type { PathMetadata } from "../../classes/PathMetadata.ts";
import DetailedUserInfoURL from "../../urls/DetailedUserInfoURL.ts";
import SchematicProperty from "../../classes/SchematicProperty.ts";

const metadata: PathMetadata = {
    name: "Detailed User Info",
    description: "Get detailed information about a specific user.",
    urlClass: DetailedUserInfoURL,
    examples: {
        cURL: 
        `
        curl -X GET "https://rawblock-api-proxy.vercel.app/api/users/detailed-user-info?userId=1" \\
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
            description: new SchematicProperty("string", { example: "A brief description of the user." }).generateString(),
            created: new SchematicProperty("string", { example: new Date().toISOString() }).generateString(),
            isBanned: new SchematicProperty("boolean", { example: false }).generateString(),
            externalAppDisplayName: new SchematicProperty("string", { nullable: true }).generateString(),
            hasVerifiedBadge: new SchematicProperty("boolean", { example: false }).generateString(),
            id: new SchematicProperty("number", { example: 1 }).generateString(),
            name: new SchematicProperty("string", { example: "John Doe" }).generateString(),
            displayName: new SchematicProperty("string", { example: "JD" }).generateString()
        },
        query: {
            userId: new SchematicProperty("string").generateString()
        }
    }
}

export default metadata;

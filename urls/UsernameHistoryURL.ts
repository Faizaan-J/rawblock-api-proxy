import URLCLass from "../classes/URLClass";

type SortOrderType = "Asc" | "Desc";

class UsernameHistoryURL extends URLCLass {
    generate(userId: number, limit : number = 10, sortOrder : SortOrderType = "Asc", cursor?: string | undefined) : URL {
        const url = new URL(`https://users.roblox.com/v1/users/${userId}/username-history`);
        url.searchParams.append("limit", limit.toString());
        url.searchParams.append("sortOrder", sortOrder);
        if (cursor != undefined && cursor != "") {
            url.searchParams.append("cursor", cursor);
        }
        return url;
    }
}

export default new UsernameHistoryURL();

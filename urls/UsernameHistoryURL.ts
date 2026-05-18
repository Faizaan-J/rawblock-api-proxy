import URLCLass from "../classes/URLClass";

type SortOrderType = "Asc" | "Desc";

class UsernameHistoryURL extends URLCLass {
    generate(userId: number, limit : number = 20, sortOrder : SortOrderType = "Asc", nextCursor?: string | undefined) : URL {
        const url = new URL(`https://users.roblox.com/v1/users/${userId}/username-history`);
        url.searchParams.append("limit", limit.toString());
        url.searchParams.append("sortOrder", sortOrder);
        if (nextCursor != undefined && nextCursor != "") {
            url.searchParams.append("cursor", nextCursor);
        }
        return url;
    }
}

export default new UsernameHistoryURL();

import type { VercelRequest, VercelResponse } from '@vercel/node';
import UsernameHistoryURL from '../../urls/UsernameHistoryURL';

const handler = async (request: VercelRequest, response: VercelResponse) => {
    const query = request.query;
    const userId = String(query.userId || '');
    const limit = query.limit ? Number(query.limit) : undefined;
    const sortOrder = (() => {
        const param = String(query.sortOrder).toLowerCase();
        if (param === "asc") return "Asc";
        if (param === "desc") return "Desc";
    })();
    const cursor = String(query.cursor || '');

    const fetchedUsernameHistoryPage = 
        await fetch(UsernameHistoryURL.generate(Number(userId), limit, sortOrder, cursor))
            .then(res => res.json());

    console.log(fetchedUsernameHistoryPage, "fetchedUsernameHistoryPage");
    if (!fetchedUsernameHistoryPage) {
        response.status(500).json({
            error: "Failed to fetch username history",
            query: request.query,
            cookies: request.cookies,
        });
        return;
    };

    if (fetchedUsernameHistoryPage.errors) {
        const firstError = fetchedUsernameHistoryPage?.errors[0];
        if (firstError) {
            /*
                remove code since it's always 0, and for sending it back to the
                client with less redundancy
            */
            delete firstError.code;
            const givenMessage = firstError.message;
            if (givenMessage.length === 0) {
                /*
                    rawblock's api doesn't give an actual error code (always 0), 
                    so if given an empty message, assume we got rate limited
                */
                response.status(429).json({
                    error: "Rate limited",
                    query: request.query
                });
                return;
            }

            const isFieldError = "field" in firstError;
            if (isFieldError) {
                response.status(400).json({
                    error: firstError,
                    query: request.query,
                });
                return;
            } else {
                response.status(500).json({
                    error: "Unknown error",
                    query: request.query,
                });
                return;
            }
        }
        return;
    }

    const simplifiedPage = {
        usernames: [] as string[],
        previousPageCursor : fetchedUsernameHistoryPage.previousPageCursor,
        nextPageCursor : fetchedUsernameHistoryPage.nextPageCursor,
    };
    if (fetchedUsernameHistoryPage.data && Array.isArray(fetchedUsernameHistoryPage.data)) {
        if (fetchedUsernameHistoryPage.data.length > 0) {
            for (const usernameHistoryEntry of fetchedUsernameHistoryPage.data as Array<{ name: string }>) {
                simplifiedPage.usernames.push(usernameHistoryEntry.name);
            }
        }
    }

    response.status(200).json({
        body: simplifiedPage,
        query: request.query,
        cookies: request.cookies,
    });
}

export default handler;

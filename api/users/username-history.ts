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

    const simplifiedPage = {
        usernames: [] as string[],
        previousPageCursor : fetchedUsernameHistoryPage.previousPageCursor,
        nextPageCursor : fetchedUsernameHistoryPage.nextPageCursor,
    };
    for (const usernameHistoryEntry of fetchedUsernameHistoryPage.data as Array<{ name: string }>) {
        simplifiedPage.usernames.push(usernameHistoryEntry.name);
    }

    response.status(200).json({
        body: simplifiedPage,
        query: request.query,
        cookies: request.cookies,
    });
}

export default handler;

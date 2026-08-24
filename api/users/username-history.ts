import type { VercelRequest, VercelResponse } from '@vercel/node';
import UsernameHistoryURL from '../../urls/UsernameHistoryURL.js';

import * as zod from "zod";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    const urlResult = UsernameHistoryURL.generate(request.query);
    
    if (!(urlResult instanceof URL)) {
        response.status(400).json({
            error: "Invalid query parameters",
            details: urlResult,
        });
        return;
    }

    const fetchedUsernameHistoryPage = 
        await fetch(urlResult)
            .then(res => res.json());

    console.log(fetchedUsernameHistoryPage, "fetchedUsernameHistoryPage");
    if (!fetchedUsernameHistoryPage) {
        response.status(500).json({
            error: "Failed to fetch username history"
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
                    error: "Rate limited"
                });
                return;
            }

            const isFieldError = "field" in firstError;
            if (isFieldError) {
                response.status(400).json({
                    error: firstError
                });
                return;
            } else {
                response.status(500).json({
                    error: "Unknown error"
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
        body: simplifiedPage
    });
}

export default handler;

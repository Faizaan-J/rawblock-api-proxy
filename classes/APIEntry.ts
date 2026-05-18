import type { VercelRequest, VercelResponse } from '@vercel/node';

type APIEntryFunction = (request: VercelRequest, response: VercelResponse) => any | void;

/**
 * Class for representing an API entry
 * Used for middleware such as API key authentication
 */
class APIEntry {
    functionBody : APIEntryFunction;

    constructor(functionBody : APIEntryFunction) {
        this.functionBody = functionBody;
    }

    getGeneratedFunction() {
        const wrapper = async (request: VercelRequest, response: VercelResponse) => {
            const isAuthorized = this.#apiKeyMiddleware(request);

            if (!isAuthorized
            // maybe there will be more conditions here in the future
            ) {
                response.status(401).json({
                    error: "Unauthorized",
                    message: "Invalid API key",
                });
                return;
            } 
            await this.functionBody(request, response);
        }
        return wrapper;
    }

    #apiKeyMiddleware(request : VercelRequest) {
        const apiKey = process.env.AUTH;
        const authorizationHeader = request.headers.authorization;
        if (authorizationHeader == undefined) {
            return false;
        }

        if (authorizationHeader === `Bearer ${apiKey}`) {
            return true;
        }
        return false;
    }
}

export default APIEntry;

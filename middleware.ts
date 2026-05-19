import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const middleware = (request: NextRequest) => {
    const apiKey = process.env.AUTH;
    const authorizationHeader = request.headers.get("authorization");

    const errorResponse = NextResponse.json({
        error: "Unauthorized",
        message: "Invalid API key",
    }, { status: 401 })

    if (authorizationHeader == undefined || authorizationHeader !== `Bearer ${apiKey}`) {
        return errorResponse;
    } else if (authorizationHeader === `Bearer ${apiKey}`) {
        return NextResponse.next();
    }
    return errorResponse;
}

const config = {
    matcher: "/api/:path*",
}

export { config, middleware};

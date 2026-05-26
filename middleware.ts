const middleware = (request: Request) => {
    const apiKey = process.env.AUTH ?? "";
    const authorizationHeader = request.headers.get("authorization");

    const errorResponse = new Response(
        JSON.stringify({
            error: "Unauthorized",
            message: "Invalid API key",
        }),
        {
            status: 401,
            headers: {
                "content-type": "application/json",
            },
        }
    );

    if (authorizationHeader == undefined || authorizationHeader !== `Bearer ${apiKey}`) {
        return errorResponse;
    }
}

const config = {
    matcher: "/api/:path*"
}

export default middleware;
export { config };

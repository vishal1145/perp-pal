import { NextResponse, NextRequest } from "next/server";

export default function corsMiddleware(request: NextRequest, response?: NextResponse) {
    const headers = new Headers({
        "Access-Control-Allow-Origin": "*", // Replace '*' with specific origin(s) in production
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
    });

    // Handle CORS preflight (OPTIONS) request
    if (request.method === "OPTIONS") {
        return NextResponse.json(null, { headers, status: 204 });
    }

    // Add headers for other requests
    if (response) {
        headers.forEach((value, key) => {
            response.headers.set(key, value);
        });
    }

    return response;
}

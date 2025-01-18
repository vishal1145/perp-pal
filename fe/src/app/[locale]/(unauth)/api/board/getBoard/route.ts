import ConnectDB from "@/libs/DB";
import Board from "@/models/Board";
import { NextRequest, NextResponse } from "next/server";
import corsMiddleware from "@/libs/middleware/cors";

export async function GET(request: NextRequest) {
    try {
        const preflightResponse = corsMiddleware(request);
        if (preflightResponse) return preflightResponse;
        await ConnectDB();

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        let boards;

        if (id) {
            boards = await Board.findById(id);
            if (!boards) {
                return NextResponse.json({ error: "Board not found" }, { status: 404 });
            }
        } else {

            boards = await Board.find();
        }


        const response = NextResponse.json({ boards }, { status: 200 });
        return corsMiddleware(request, response);

    } catch (error: any) {
        const response = NextResponse.json({ error: error.message }, { status: 500 });
        return corsMiddleware(request, response);
    }
}

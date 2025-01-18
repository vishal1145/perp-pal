import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { unlink } from "fs/promises";
import ConnectDB from "@/libs/DB";
import Board from "@/models/Board";
import corsMiddleware from "@/libs/middleware/cors"
export const DELETE = async (request: NextRequest) => {
    try {
        const preflightResponse = corsMiddleware(request);
        if (preflightResponse) return preflightResponse;
        await ConnectDB();

        // Extracting ID from the URL
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();  // Get the ID from the URL path

        if (!id) {
            return NextResponse.json(
                { message: "Board ID is required" },
                { status: 400 }
            );
        }

        const board = await Board.findById(id);
        if (!board) {
            return NextResponse.json(
                { message: "Board not found" },
                { status: 404 }
            );
        }

        // Delete the image file if it exists
        if (board.image) {
            const imagePath = path.join(process.cwd(), "public", board.image);
            try {
                await unlink(imagePath); // Delete the image file
            } catch (error) {
                console.error("Error deleting image:", error);
            }
        }

        // Instead of `remove()`, use `deleteOne()`
        await Board.deleteOne({ _id: id });

        const response = NextResponse.json(
            { message: "Board deleted successfully" },
            { status: 200 }
        );
        return corsMiddleware(request, response);

    } catch (error: any) {
        console.error("Error deleting board:", error);
        const response = NextResponse.json(
            { message: "Server error", error: error.message },
            { status: 500 }
        );
        return corsMiddleware(request, response);

    }
};

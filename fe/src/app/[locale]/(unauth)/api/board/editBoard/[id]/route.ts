import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { mkdir, writeFile, unlink } from "fs/promises";
import ConnectDB from "@/libs/DB";
import Board from "@/models/Board";
import corsMiddleware from "@/libs/middleware/cors"
export const PUT = async (request: NextRequest) => {
    try {
        const preflightResponse = corsMiddleware(request);
        if (preflightResponse) return preflightResponse;
        await ConnectDB();

        // Extracting the board ID from the URL path
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop(); // Assuming the ID is in the path

        if (!id) {
            return NextResponse.json(
                { message: "Board ID is required" },
                { status: 400 }
            );
        }

        const formData = await request.formData();
        const name = formData.get("name");
        const color = formData.get("color");
        const file = formData.get("image");

        // Type assertion for name and color as strings
        if (typeof name !== 'string' || typeof color !== 'string') {
            return NextResponse.json(
                { message: "Board name and color must be strings" },
                { status: 400 }
            );
        }

        if (!name || !color) {
            return NextResponse.json(
                { message: "Board name and color are required" },
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

        // If a new file is provided, handle the file upload
        if (file && file instanceof Blob) {
            const dirPath = path.join(process.cwd(), "public/uploads");
            await mkdir(dirPath, { recursive: true });

            const imageFileName = `board_image_${Date.now()}_${file.name}`;
            const filePath = path.join(dirPath, imageFileName);

            const buffer = Buffer.from(await file.arrayBuffer());
            await writeFile(filePath, buffer);

            // Delete old image file from the server if it exists
            if (board.image) {
                const oldImagePath = path.join(process.cwd(), "public", board.image);
                try {
                    await unlink(oldImagePath); // Delete the old image file
                } catch (error) {
                    console.error("Error deleting old image:", error);
                }
            }

            board.image = `/uploads/${imageFileName}`;
        }

        // Update the board fields
        board.name = name;
        board.color = color;

        await board.save();

        const response = NextResponse.json(
            { message: "Board updated successfully", board },
            { status: 200 }
        );
               return corsMiddleware(request, response);
       
    } catch (error: any) {
        console.error("Error updating board:", error);
        const response = NextResponse.json(
            { message: "Server error", error: error.message },
            { status: 500 }
        );
        return corsMiddleware(request, response);

    }
};

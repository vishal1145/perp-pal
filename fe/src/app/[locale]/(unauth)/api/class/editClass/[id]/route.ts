import mongoose from "mongoose";
import ConnectDB from "@/libs/DB";
import { NextRequest, NextResponse } from "next/server";
import Class from "@/models/Class";
import Board from "@/models/Board";
import corsMiddleware from "@/libs/middleware/cors";
export const PUT = async (request: NextRequest) => {
    try {
        const preflightResponse = corsMiddleware(request);
        if (preflightResponse) return preflightResponse;
        await ConnectDB();

        // Extract class ID from URL
        const url = new URL(request.url);
        const classId = url.pathname.split('/').pop();

        if (!classId || !mongoose.Types.ObjectId.isValid(classId as string)) {
            return NextResponse.json(
                { message: "Invalid class ID" },
                { status: 400 }
            );
        }

        const { className, color, boardIds } = await request.json();

        // Validation
        if (!className || !color) {
            return NextResponse.json(
                { message: "Class name and color are required" },
                { status: 400 }
            );
        }

        if (boardIds && !Array.isArray(boardIds)) {
            return NextResponse.json(
                { message: "boardIds must be an array of ObjectId" },
                { status: 400 }
            );
        }

        // Validate board IDs
        if (boardIds && boardIds.length > 0) {
            const invalidBoardIds = [];
            for (let boardId of boardIds) {
                if (!mongoose.Types.ObjectId.isValid(boardId)) {
                    invalidBoardIds.push(boardId);
                    continue;
                }
                const boardExists = await Board.exists({ _id: boardId });
                if (!boardExists) invalidBoardIds.push(boardId);
            }
            if (invalidBoardIds.length > 0) {
                return NextResponse.json(
                    {
                        message: "Invalid boardId(s): " + invalidBoardIds.join(", "),
                    },
                    { status: 400 }
                );
            }
        }

        // Update class
        const updatedClass = await Class.findByIdAndUpdate(
            classId,
            { className, color, boardIds },
            { new: true }
        );

        if (!updatedClass) {
            return NextResponse.json(
                { message: "Class not found" },
                { status: 404 }
            );
        }

        const response = NextResponse.json(
            { message: "Class updated successfully", class: updatedClass },
            { status: 200 }
        );
        return corsMiddleware(request, response);
    } catch (error: any) {
        console.error("Error updating class:", error);
        return NextResponse.json(
            { message: "Server error", error: error.message },
            { status: 500 }
        );
    }
};


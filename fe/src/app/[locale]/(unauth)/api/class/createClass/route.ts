import mongoose from "mongoose";
import ConnectDB from "@/libs/DB";
import { NextRequest, NextResponse } from "next/server";
import Class from "@/models/Class";
import Board from "@/models/Board";

export const POST = async (request: NextRequest) => {
    try {
        await ConnectDB();
        const { className, color, boardIds } = await request.json();
        if (!className || !color) {
            return new Response(
                JSON.stringify({ message: "Class name and color are required" }),
                { status: 400 }
            );
        }

        if (boardIds && !Array.isArray(boardIds)) {
            return new Response(
                JSON.stringify({ message: "boardIds must be an array of ObjectId" }),
                { status: 400 }
            );
        }

        if (boardIds && boardIds.length > 0) {
            const invalidBoardIds = [];

            for (let boardId of boardIds) {
                if (!mongoose.Types.ObjectId.isValid(boardId)) {
                    invalidBoardIds.push(boardId);
                    continue;
                }

                const boardExists = await Board.exists({ _id: boardId });
                if (!boardExists) {
                    invalidBoardIds.push(boardId);
                }
            }

            if (invalidBoardIds.length > 0) {
                return new Response(
                    JSON.stringify({
                        message: "Invalid boardId(s): " + invalidBoardIds.join(", "),
                    }),
                    { status: 400 }
                );
            }
        }

        const newClass = new Class({
            className,
            color,
            boardIds,
        });


        await newClass.save();

        return new Response(
            JSON.stringify({ message: "Class created successfully", class: newClass }),
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating class:", error);
        return new Response(
            JSON.stringify({ message: "Server error", error: error.message }),
            { status: 500 }
        );
    }
}
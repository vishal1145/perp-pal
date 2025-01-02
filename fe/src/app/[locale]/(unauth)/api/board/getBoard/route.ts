import ConnectDB from "@/libs/DB";
import Board from "@/models/Board";
import { NextRequest,NextResponse } from "next/server";

export async function GET(request:NextRequest){
    try{
        await ConnectDB();
        const board = await Board.find();
        return NextResponse.json({ board }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
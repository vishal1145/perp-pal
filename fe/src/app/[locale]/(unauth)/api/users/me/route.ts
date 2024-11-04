

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/libs/DB";
import User from "@/models/user";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function GET(request:NextRequest){
    try {
        connectDB();
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}
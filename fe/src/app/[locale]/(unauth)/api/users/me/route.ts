

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/libs/DB";
import User from "@/models/user";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function GET(request:NextRequest){
    try {
        connectDB();
        const userId = await getDataFromToken(request);

        if(!userId){
        return NextResponse.json({error:"token is invalid"}, {status: 400});
        }

        const user = await User.findOne({_id: userId}).select("-password");

        if(!user){
            return NextResponse.json({message: "user not found"}, {status: 400});
        }

        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}
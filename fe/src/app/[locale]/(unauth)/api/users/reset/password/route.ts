import connectDB from "@/libs/DB";
 
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/user";
 

export async function POST(request: NextRequest){

    try {
        connectDB();
        
        const reqBody = await request.json()
        const {email, password} = reqBody
        if(!email || !password ){
            return NextResponse.json({error: "please put valid email and password"}, {status: 400})
        }
  
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const user = await User.findOneAndUpdate({email:email}, {
            password:hashedPassword
        });

        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 404})
        }

        return NextResponse.json({
            message: "reset password successfully",
            success: true,
            user
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}
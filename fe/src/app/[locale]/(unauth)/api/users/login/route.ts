import connectDB from "@/libs/DB";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/user";



export async function POST(request: NextRequest) {
    try {
        connectDB()
        const reqBody = await request.json()
        const { email, password } = reqBody;

        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }

        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 })
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, `${process.env.TOKEN_SECRET}`, { expiresIn: "7d" })

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            data: user
        })
        response.cookies.set("token", token, {
            httpOnly: true,

        })
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
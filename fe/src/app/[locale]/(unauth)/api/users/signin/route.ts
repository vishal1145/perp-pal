import connectDB from "@/libs/DB";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/user";

// Helper function: cookiesSet
const cookiesSet = async (user: any, username: string, email: string) => {
    const cookieData = {
        id: user._id,
        username: username,
        email: email,
    };

    const cookieToken = await jwt.sign(cookieData, `${process.env.TOKEN_SECRET}`, { expiresIn: "7d" });

    const response = NextResponse.json({
        message: "Login successful",
        success: true,
        data: user,
    });

    response.cookies.set("token", cookieToken, {
        httpOnly: true, // Security: prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === "production", // Ensure the cookie is only sent over HTTPS in production
        maxAge: 7 * 24 * 60 * 60, // Cookie expiration time in seconds (7 days)
        sameSite: "strict", // Use lowercase "strict" instead of "Strict"
        expires: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000),
    });

    return response;
};

// POST handler
export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const reqBody = await request.json();
        const { token } = reqBody;

        const decodedToken: any = jwt.decode(token, { complete: true });
        const email = decodedToken.payload.email;
        const username = decodedToken.payload.name;

        const alreadyuser = await User.findOne({ email: email });
        let response;

        if (alreadyuser) {
            response = await cookiesSet(alreadyuser, username, email);
            return response;
        } else {
            const profileImage = decodedToken.payload.picture;
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(email, salt);

            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                profileImage,
            });

            const savedUser = await newUser.save();
            response = await cookiesSet(savedUser, email, username);
            return response;
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

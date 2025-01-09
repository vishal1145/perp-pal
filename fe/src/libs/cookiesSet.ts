import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const cookiesSet = async (user: any, username: string, email: string) => {
    const cookieData = {
        id: user._id,
        username: username,
        email: email,
    };

    const cookieToken = jwt.sign(cookieData, `${process.env.TOKEN_SECRET}`, { expiresIn: "7d" });

    const response = NextResponse.json({
        message: "Login successful",
        success: true,
        data: user,
    });

    response.cookies.set("token", cookieToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
        sameSite: "strict",
    });

    return response;
};

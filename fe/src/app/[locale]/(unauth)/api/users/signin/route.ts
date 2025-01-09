import connectDB from "@/libs/DB";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/user";
import { cookiesSet } from "@/libs/cookiesSet"; // Import from the utility file

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const reqBody = await request.json();
        const { token } = reqBody;

        const decodedToken: any = jwt.decode(token, { complete: true });
        const email = decodedToken.payload.email;
        const username = decodedToken.payload.name;

        const alreadyUser = await User.findOne({ email: email });
        if (alreadyUser) {
            return cookiesSet(alreadyUser, username, email);
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
            return cookiesSet(savedUser, username, email);
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

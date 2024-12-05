import connectDB from "@/libs/DB";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/user";
 
const cookiesSet = async(user:any, username:string, email:string)=>{
    const cookieData = {
        id:user._id,
        username:username,
        email:email
    }

    const cookieToken = await jwt.sign(cookieData, `${process.env.TOKEN_SECRET}`, {expiresIn: "7d"})

    const response = NextResponse.json({
        message: "Login successful",
        success: true,
        data: user
    })

    response.cookies.set("token", cookieToken, {
        httpOnly: true, 
    })

    return response;
}


export async function POST(request: NextRequest){
    try {
        connectDB()
        const reqBody = await request.json()
        const {token} = reqBody; 

        const decodedToken:any = jwt.decode(token,{ complete: true });

        const email = decodedToken.payload.email;
        const username = decodedToken.payload.name;
        
        const alreadyuser = await User.findOne({email:email});
    
        let response;

        if(alreadyuser){
            response = cookiesSet(alreadyuser, username, email)
        }else{
            const profileImage = decodedToken.payload.picture;
            const salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(email, salt)
    
            const newUser = new User({
                username,
                email,
                password:hashedPassword,
                profileImage,
            })
    
            const savedUser = await newUser.save()
            response = cookiesSet(savedUser, email, username);
        }
    
        return response;
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
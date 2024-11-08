import { NextRequest,NextResponse } from "next/server";
import connectDB from "@/libs/DB";

export async function GET(request:NextRequest){
    try{
        await connectDB();
        const AboutData = {
            name: "Charles Robbie",
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia, non.",
            location: "New York, USA",
            class: "10",
            preparation: "IIT",
        }
        return NextResponse.json(AboutData,{status:200})
    }catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    
}
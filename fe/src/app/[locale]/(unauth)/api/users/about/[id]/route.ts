import connectDB from '@/libs/DB';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/user';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        // Connect to the database
        await connectDB();

        const { id } = params;

        // Attempt to parse the request body
        const body = await request.json().catch(() => ({}));  
        const { about,username,address } = body;

        // Find the user in the database
        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // If 'about' is missing, return the current user data
        if (!about && !username && !address) {
            return NextResponse.json(user, { status: 200 });
        }

        // If 'about' is provided, update the user
        if (about) user.about = about;
        if (username) user.username = username;
        if (address === undefined || address === null || address === '') {
            user.address = user.address || 'No address provided'; 
        } else {
            user.address = address;
        }
        const updatedUser = await user.save();
       

        // Return the updated user data
        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error: any) {
        console.error('Error handling user data:', error);
        return NextResponse.json({ message: 'Error handling user data', error: error.message }, { status: 500 });
    }
}

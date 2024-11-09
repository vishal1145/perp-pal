import connectDB from '@/libs/DB';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/user';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();

        const { id } = params;

       
        const updateData = { about: "This is a hardcoded about field update" };

       
        const updatedUser = await User.findByIdAndUpdate(
            new mongoose.Types.ObjectId(id), 
            updateData,
            { new: true }
        ).populate('userId'); 

       
        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error: any) {
        console.error('Error updating user:', error);
        return NextResponse.json({ message: 'Error updating user', error: error.message }, { status: 500 });
    }
}

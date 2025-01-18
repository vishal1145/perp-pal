import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { mkdir, writeFile, unlink } from "fs/promises";
import ConnectDB from "@/libs/DB";
import Subject from "@/models/Subject";
import mongoose from "mongoose";
import corsMiddleware from "@/libs/middleware/cors";

export const PUT = async (request: NextRequest) => {
    try {
         const preflightResponse = corsMiddleware(request);
          if (preflightResponse) return preflightResponse;
        await ConnectDB();

        // Extract the subject ID from the URL path
        const url = new URL(request.url);
        const subjectId = url.pathname.split('/').pop(); // Assuming the subject ID is at the end of the path

        if (!subjectId) {
            return NextResponse.json(
                { message: "Subject ID is required" },
                { status: 400 }
            );
        }

        const formData = await request.formData();
        const subjectName = formData.get("subjectName");
        const color = formData.get("color");
        const file = formData.get("image");
        let classIds = formData.getAll("classIds");

        // Log the received classIds for debugging
        console.log("Received classIds:", classIds);

        // If classIds is a string, parse it into an array
        if (typeof classIds[0] === 'string' && classIds[0].startsWith('[')) {
            classIds = JSON.parse(classIds[0]); // Parse the JSON string to an array
        }

        // Validate the input data
        if (!subjectName || !color || !classIds || !Array.isArray(classIds) || classIds.length === 0) {
            return NextResponse.json(
                { message: "subjectName, color, and classIds are required" },
                { status: 400 }
            );
        }

        // Ensure all classIds are strings and valid ObjectIds
        const invalidClassIds = classIds.filter((id: string) => {
            return !mongoose.Types.ObjectId.isValid(id);
        });

        // Log invalid classIds for debugging
        if (invalidClassIds.length > 0) {
            console.log("Invalid classIds:", invalidClassIds);
            return NextResponse.json(
                { message: `Invalid classId(s): ${invalidClassIds.join(", ")}` },
                { status: 400 }
            );
        }

        // Convert classIds to ObjectIds
        const objectIdClassIds = classIds.map((id: string) => new mongoose.Types.ObjectId(id));

        // Find the existing subject
        const existingSubject = await Subject.findById(subjectId);
        if (!existingSubject) {
            return NextResponse.json(
                { message: "Subject not found" },
                { status: 404 }
            );
        }

        // Handle image upload if a new file is provided
        let imageUrl = existingSubject.image; // Default to existing image if no new file
        if (file && file instanceof Blob) {
            // Validate the file (ensure it's an image file)
            if (
                !file.name ||
                !file.size ||
                !file.name.match(/\.(jpg|jpeg|png)$/i)
            ) {
                return NextResponse.json(
                    { message: "Invalid file upload. Please upload a valid image." },
                    { status: 400 }
                );
            }

            // Create the directory for storing images if it doesn't exist
            const dirPath = path.join(process.cwd(), "public/uploads");
            await mkdir(dirPath, { recursive: true });

            // Generate a new filename for the image
            const imageFileName = `subject_image_${Date.now()}.png`;
            const filePath = path.join(dirPath, imageFileName);

            // Save the file to disk
            const buffer = Buffer.from(await file.arrayBuffer());
            await writeFile(filePath, buffer);

            // Delete old image file if it exists
            if (existingSubject.image) {
                const oldImagePath = path.join(process.cwd(), "public", existingSubject.image);
                try {
                    await unlink(oldImagePath); // Delete the old image file
                } catch (error) {
                    console.error("Error deleting old image:", error);
                }
            }

            // Update the image URL
            imageUrl = `/uploads/${imageFileName}`;
        }

        // Update the subject with new details (including the image URL)
        const updatedSubject = await Subject.findByIdAndUpdate(
            subjectId,
            { subjectName, color, classIds: objectIdClassIds, image: imageUrl },
            { new: true }
        );

        if (!updatedSubject) {
            return NextResponse.json(
                { message: "Error updating subject" },
                { status: 500 }
            );
        }

        const response = NextResponse.json(
            { message: "Subject updated successfully", subject: updatedSubject },
            { status: 200 }
        );
         return corsMiddleware(request, response);
    } catch (error: any) {
        console.error("Error updating subject:", error);
        const response = NextResponse.json(
            { message: "Server error", error: error.message },
            { status: 500 }
        );
         return corsMiddleware(request, response);
    }
};

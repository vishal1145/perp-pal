import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { mkdir, writeFile } from "fs/promises";
import ConnectDB from "@/libs/DB";
import Subject from "@/models/Subject";
import Class from "@/models/Class";
import mongoose from "mongoose";

export const POST = async (request: NextRequest) => {
    try {
        await ConnectDB();

        const formData = await request.formData();
        const subjectName = formData.get("subjectName");
        const color = formData.get("color");
        const file = formData.get("image");
        const classIds = formData.getAll("classIds");

        // Handle case where classIds might be a stringified array
        let parsedClassIds: string[] = [];

        if (classIds && classIds.length > 0) {
            try {
                // Check if the classIds is already an array or a stringified array
                parsedClassIds = Array.isArray(classIds[0])
                    ? classIds[0]
                    : JSON.parse(classIds[0] as string);
            } catch (error) {
                return NextResponse.json(
                    { message: "Invalid classIds format" },
                    { status: 400 }
                );
            }
        }

        if (!subjectName || !file || !color || !parsedClassIds.length) {
            return NextResponse.json(
                { message: "subject name, image, color and classIds are required" },
                { status: 400 }
            );
        }

        // Validate classIds
        const invalidClassIds = parsedClassIds.filter((id: string) => !mongoose.Types.ObjectId.isValid(id));

        if (invalidClassIds.length > 0) {
            return NextResponse.json(
                { message: `Invalid classId(s): ${invalidClassIds.join(", ")}` },
                { status: 400 }
            );
        }

        // Convert classIds to ObjectIds
        const objectIdClassIds = parsedClassIds.map((id: string) => new mongoose.Types.ObjectId(id));

        const classes = await Class.find({ '_id': { $in: objectIdClassIds } });

        if (classes.length !== parsedClassIds.length) {
            return NextResponse.json(
                { message: "Some classIds are invalid" },
                { status: 400 }
            );
        }
        if (
            !file ||
            typeof file !== "object" ||
            !file.arrayBuffer ||
            !file.name ||
            !file.size
        ) {
            return NextResponse.json(
                { message: "Invalid file upload" },
                { status: 400 }
            );
        }

        const dirPath = path.join(process.cwd(), "public/uploads");
        await mkdir(dirPath, { recursive: true });

        const imageFileName = `subject_image${Date.now()}.png`;
        const filePath = path.join(dirPath, imageFileName);

        const buffer = Buffer.from(await file.arrayBuffer());
        await writeFile(filePath, buffer);

        const imageUrl = `/uploads/${imageFileName}`;

        const newSubject = new Subject({
            subjectName,
            image: imageUrl,
            color,
            classIds: objectIdClassIds, // Use ObjectId array here
        });

        await newSubject.save();

        return NextResponse.json(
            { message: "subject created successfully", subject: newSubject },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error creating subject:", error);
        return NextResponse.json(
            { message: "Server error", error: error.message },
            { status: 500 }
        );
    }
};

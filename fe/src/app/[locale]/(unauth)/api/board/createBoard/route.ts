import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { mkdir, writeFile } from "fs/promises";
import ConnectDB from "@/libs/DB";
import Board from "@/models/Board";

export const POST = async (request: NextRequest) => {
  try {
    await ConnectDB();

    const formData = await request.formData();
    const name = formData.get("name");
    const subjectsRaw = formData.get("subjects");
    const file = formData.get("image");

    if (!name || !file) {
      return NextResponse.json({ message: "Board name and image are required" }, { status: 400 });
    }

    // Parse subjects field
    const subjects = subjectsRaw ? JSON.parse(subjectsRaw as string) : [];

    if (!Array.isArray(subjects)) {
      return NextResponse.json({ message: "Subjects must be an array" }, { status: 400 });
    }

    const dirPath = path.join(process.cwd(), "public/uploads");
    await mkdir(dirPath, { recursive: true });

    const imageFileName = `board_image_${Date.now()}.png`;
    const filePath = path.join(dirPath, imageFileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    const imageUrl = `/uploads/${imageFileName}`;

    const newBoard = new Board({
      name,
      image: imageUrl,
      subjects,
    });

    await newBoard.save();

    return NextResponse.json({ message: "Board created successfully", board: newBoard }, { status: 201 });
  } catch (error) {
    console.error("Error creating board:", error);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
};

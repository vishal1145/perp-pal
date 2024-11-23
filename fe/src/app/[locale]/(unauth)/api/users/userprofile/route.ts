import { NextResponse } from "next/server";
import path from "path";
import { writeFile, readdir } from "fs/promises";

export const POST = async (req, res) => {
   
  const formData = await req.formData();

  const file = formData.get("file");
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const files = await readdir(path.join(process.cwd(), "public/assets/profileImage"));
    
    const imageFiles = files.filter((file) => file.startsWith("profileImage"));
    const nextIndex = imageFiles.length + 1;

    const filename = `profileImage${nextIndex}.png`;

    await writeFile(
      path.join(process.cwd(), "public/assets/profileImage", filename),
      buffer
    );

    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    console.log("Error occurred ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};

import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { createWriteStream, unlinkSync } from 'fs';

// Default image URL (points to a placeholder image in your `public` folder)
const DEFAULT_IMAGE_URL = '/assets/profileImage.jpg';

// Directory for image uploads
const uploadDir = path.join(process.cwd(), 'public/uploads');

// Function to handle existing image replacement
async function handleExistingImage(userId: string, newFilePath: string) {
  const metadataFile = path.join(uploadDir, `${userId}-image-metadata.json`);

  try {
    // Check if metadata file exists
    const metadata = JSON.parse(await fs.readFile(metadataFile, 'utf-8'));

    // Delete the old image file if it exists
    if (metadata?.imagePath && (await fs.stat(metadata.imagePath).catch(() => false))) {
      unlinkSync(metadata.imagePath);
    }
  } catch (error) {
    console.log('No existing image metadata found. Skipping deletion.');
  }

  // Save new metadata
  await fs.writeFile(metadataFile, JSON.stringify({ imagePath: newFilePath }), 'utf-8');
}

// Handle POST request for image upload
export async function POST(req: NextRequest) {
  try {
    // Extract `userId` from the URL (dynamic routing in Next.js)
    const { userId } = req.nextUrl.pathname.match(/\/api\/upload\/([a-zA-Z0-9_-]+)/)?.groups || {};
    
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const contentType = req.headers.get('content-type') || '';

    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Invalid content type. Must be multipart/form-data' },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('image') as File | null;

    if (file) {
      // Ensure upload directory exists
      await fs.mkdir(uploadDir, { recursive: true });

      // Generate a unique file path based on `userId`
      const filePath = path.join(uploadDir, `${userId}-${Date.now()}-${file.name}`);
      const writableStream = createWriteStream(filePath);
      writableStream.write(Buffer.from(await file.arrayBuffer()));

      // Replace existing image if necessary
      await handleExistingImage(userId, filePath);

      const uploadedImageUrl = `/uploads/${path.basename(filePath)}`;

      return NextResponse.json({
        success: true,
        message: 'Image uploaded successfully!',
        imageUrl: uploadedImageUrl,
      });
    } else {
      // Check for existing image metadata
      const metadataFile = path.join(uploadDir, `${userId}-image-metadata.json`);
      try {
        const metadata = JSON.parse(await fs.readFile(metadataFile, 'utf-8'));
        if (metadata?.imagePath) {
          return NextResponse.json({
            success: true,
            message: 'Using existing image.',
            imageUrl: `/uploads/${path.basename(metadata.imagePath)}`,
          });
        }
      } catch {
        // No existing image metadata
      }

      return NextResponse.json({
        success: true,
        message: 'Using default image.',
        imageUrl: DEFAULT_IMAGE_URL,
      });
    }
  } catch (error) {
    console.error('Error uploading or managing image:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

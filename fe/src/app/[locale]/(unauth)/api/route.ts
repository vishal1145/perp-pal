import { NextResponse } from 'next/server';

export async function GET() {
  console.log('Request Method: GET');
  return NextResponse.json({ message: "Hello, World!" });
}

export async function POST() {
  console.log('Request Method: POST');
  return NextResponse.json({ message: "Post received!" });
}

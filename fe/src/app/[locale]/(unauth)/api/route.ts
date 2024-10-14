// src/app/[locale]/(unauth)/api/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  console.log('Request Method: GET');
  return NextResponse.json({ message: "Hello, World!" });
}

export async function POST(req: NextRequest) {
  console.log('Request Method: POST');
  return NextResponse.json({ message: "Post received!" });
}

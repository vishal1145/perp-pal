// pages/api/history.js

import { NextResponse } from "next/server";
import connectDB from '@/libs/DB';

export async function GET(request) {
  try {
    await connectDB();
    const historyData = [
      {
        title: "Full Stack Developer",
        duration: "2020 - Present",
      },
      {
        title: "Frontend Developer",
        duration: "2018 - 2020",
      },
      
    ];

    return NextResponse.json(historyData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching history data" }, { status: 500 });
  }
}

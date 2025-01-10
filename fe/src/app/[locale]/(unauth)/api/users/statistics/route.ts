import { NextResponse } from "next/server";
import connectDB from '@/libs/DB';

export async function GET() {

  try {
    await connectDB();
    const statisticsData = {
      projectView: 20,
      totalInterview: 12,
      totalProblemSolved: 321,
    };

    return NextResponse.json(statisticsData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching statistics data" }, { status: 500 });
  }
}

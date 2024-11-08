
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/libs/DB';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const chartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [500, 600, 700, 800, 900, 1000],
    };

    return NextResponse.json(chartData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


import { NextResponse } from 'next/server';
import connectDB from '@/libs/DB';

export async function GET() {
  try {
    await connectDB();

    const chartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [50, 100, 150, 200, 250, 300],
    };

    return NextResponse.json(chartData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

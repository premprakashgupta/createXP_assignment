import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;// Destructure `id` from params

    // Create the application query in the database
    const application = await prisma.application.findMany({
      where: {
        jobId: Number(id),  // Convert the string ID to a number
      },
    });

    return NextResponse.json(application, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to get applications ${error}` },
      { status: 500 }
    );
  }
}

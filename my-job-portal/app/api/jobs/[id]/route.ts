import prisma from '@/lib/prisma'; // Make sure to import your Prisma client
import { NextResponse } from 'next/server';

// GET request to fetch a job by its ID
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;// Destructure `id` from params

  try {
    // Find the job by ID using Prisma
    const job = await prisma.job.findUnique({
      where: {
        id: parseInt(id), // Assuming the job ID is an integer
      },
    });

    if (!job) {
      // If no job is found, return a 404 response
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Return the job data as JSON
    return NextResponse.json(job);
  } catch (error) {
    // In case of an error, return a 500 status with the error message
    return NextResponse.json({ error: `Failed to fetch job: ${error}` }, { status: 500 });
  }
}

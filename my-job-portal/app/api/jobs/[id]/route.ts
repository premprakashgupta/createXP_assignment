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

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id; // Destructure `id` from params

  // Parse id to ensure it's an integer
  const parsedId = parseInt(id);

  // Handle case where the ID is not a valid number
  if (isNaN(parsedId)) {
    return NextResponse.json({ error: 'Invalid job ID' }, { status: 400 });
  }

  try {
    // First, delete all applications associated with the job
    await prisma.application.deleteMany({
      where: {
        jobId: parsedId, // Assuming the `jobId` is a foreign key in the Application model
      },
    });

    // Then, delete the job
    const job = await prisma.job.delete({
      where: {
        id: parsedId, // Ensure ID is parsed as integer
      },
    });

    // Return the deleted job data as JSON (optional)
    return NextResponse.json(job);
  } catch (error) {
    // Log error for debugging (optional)

    // If job deletion fails (e.g., job not found), return 500
    return NextResponse.json({ error: `Failed to delete job: ${error}` }, { status: 500 });
  }
}


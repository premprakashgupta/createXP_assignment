import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    // Fetch all jobs from the database
    const jobs = await prisma.job.findMany();
    
    // Return the jobs data as JSON
    return NextResponse.json(jobs);
  } catch (error) {
    // In case of an error, return a 500 status with the error message
    return NextResponse.json({ error: `Failed to fetch jobs ${error}` }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body=await req.json();
  const { title, description, company }=body;
  const data={ title, description, company }

  const newJob = await prisma.job.create({
    data:data,
  });

  return NextResponse.json(newJob, { status: 201 });
}

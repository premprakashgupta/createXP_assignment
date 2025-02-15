import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
  try {
    // Parse the incoming JSON body
    const body = await req.json();
    console.log('Request Body:', body); // Add this log to inspect the received data

    const { name, email, resumeLink, coverLetter, id } = body;

    // Ensure all required fields are present
    if (!name || !email || !id) {
      console.error('Missing required fields:', { name, email, id });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
   
    const data={
      name,
      email,
      resumeLink,
      coverLetter,
      jobId: Number(id),  // Ensure id is a number, in case it is a string
    }
    // Create the application in the database
    const application = await prisma.application.create({
      data: data,
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    
    return NextResponse.json({ error: `Failed to submit application: ${error}` }, { status: 500 });
  }
}

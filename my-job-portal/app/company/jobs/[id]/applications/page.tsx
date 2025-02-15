"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

interface Job {
  id: string;
  name: string;
  email: string;
  coverLetter: string;
  resumeLink: string;
}

const Page: FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const params = useParams<{ id: string }>();
  const id = params.id;

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await axios.get(`/api/company/jobs/${id}/applications`);
      setJobs(res.data);
    };
    fetchJobs();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Job Applications</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((application) => (
          <Card key={application.id} className="shadow-lg border rounded-lg bg-white">
            <CardHeader className="bg-blue-500 text-white p-4 rounded-t-lg">
              <h2 className="text-xl font-semibold">Application from {application.name}</h2>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-gray-700">Email: {application.email}</p>
              <p className="text-gray-700 mt-2">Cover Letter: {application.coverLetter}</p>
            </CardContent>
            <CardFooter className="p-4 bg-gray-100">
              <Link href={application.resumeLink} target="_blank">
                <Button className="bg-green-600 text-white hover:bg-green-700 w-full">
                  View Resume
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;

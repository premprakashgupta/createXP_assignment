"use client";
import { FC, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
}

const JobDetailsPage: FC = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;  // Extract id from URL params
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      if (id) {
        const res = await fetch(`/api/jobs/${id}`);
        const data = await res.json();
        setJob(data);
      }
    };
    fetchJob();
  }, [id]);

  if (!job) return <div className="container mx-auto p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <Card className="p-6 shadow-lg rounded-xl bg-white max-w-4xl mx-auto">
        <div className="text-3xl font-semibold mb-4">{job.title}</div>
        <div className="text-lg text-gray-700 mb-6">{job.description}</div>
        <div className="text-sm text-gray-500 mb-6">Company: {job.company}</div>
        <Link
        
          href={`/candidate/apply/${job.id}`}
          className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 transition-all py-2 px-6 rounded-md"
        >
          Apply Now
        </Link>
      </Card>
    </div>
  );
};

export default JobDetailsPage;

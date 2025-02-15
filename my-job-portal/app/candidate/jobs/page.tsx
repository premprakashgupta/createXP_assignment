"use client";
import { Card } from '@/components/ui/card';
import axios from 'axios';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
}

const JobsPage: FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await axios.get('/api/jobs');
      console.log("Response Status:", res); // Check the status code
      setJobs(res.data);
    };
    fetchJobs();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6"><span className='text-3xl font-bold mr-6'>Job Listings</span> <Link href="/company/jobs" >view as company</Link> </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card key={job.id} className="p-6 shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-all">
            <div className="text-xl font-semibold mb-4">
              {job.title}
            </div>
            <div className="text-gray-700 mb-4">
              {job.description.length > 150 ? `${job.description.slice(0, 150)}...` : job.description}
            </div>
            <div className="text-sm text-gray-500 mb-4">Company: {job.company}</div>
            <Link
        
              href={`/candidate/jobs/${job.id}`}
             
              className="w-full text-blue-600 hover:bg-blue-100 transition-all"
            >
              View Details
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobsPage;

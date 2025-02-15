"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import axios from 'axios';
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
      console.log("hii");
      const res = await axios.get('/api/jobs');
  
      console.log("Response Status:", res); // Check the status code

      setJobs(res.data);
    };
    fetchJobs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Job Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card key={job.id} className="shadow-lg border rounded-lg bg-white">
            <CardHeader className="bg-blue-500 text-white p-4 rounded-t-lg">
              <h2 className="text-xl font-semibold">{job.title}</h2>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-gray-700">{job.description}</p>
              <p className="text-gray-500 mt-2">Company: {job.company}</p>
            </CardContent>
            <CardFooter className="p-4 bg-gray-100">
              <a href={`/company/jobs/${job.id}/applications`}>
                <Button className="bg-blue-600 text-white hover:bg-blue-700 w-full">
                  View Applications
                </Button>
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobsPage;

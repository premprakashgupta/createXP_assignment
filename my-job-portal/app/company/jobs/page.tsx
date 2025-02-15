"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
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
      console.log("hii");
      const res = await axios.get('/api/jobs');
  
      console.log("Response Status:", res); // Check the status code

      setJobs(res.data);
    };
    fetchJobs();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      // Send delete request to the server
       await axios.delete(`/api/jobs/${id}`);
      
      // If deletion is successful, update the jobs state by removing the deleted job
      setJobs(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      // Handle error if the request fails
      alert(`Failed to delete the job. Please try again. error: ${error}`);
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <div className='flex justify-between items-center'>
      <h1 className="text-2xl font-bold text-center mb-8">Job Listings</h1>
      <Link href="/company/jobs/new" >create job</Link>

      </div>
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
            <CardFooter className="p-4 flex gap-3 bg-gray-100">
              <a href={`/company/jobs/${job.id}/applications`}>
                <Button className="bg-blue-600 text-white hover:bg-blue-700 w-full">
                  View Applications
                </Button>
              </a>
              <Button onClick={()=>handleDelete(job.id)} className="bg-red-600 text-white hover:bg-red-700 w-full">
                  Delete Job
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobsPage;

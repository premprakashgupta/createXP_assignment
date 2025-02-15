"use client";  // This ensures this is a client-side component

import { FC, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';


const ApplyPage: FC = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;  // Extract id from URL params
  console.log(id);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resumeLink: '',
    coverLetter: '',
  });

  // Ensure id is available before form submission
  useEffect(() => {
    if (id) {
      console.log('Job ID:', id);
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure that the id is present
    if (!id) {
      alert('Invalid job ID');
      return;
    }

    const res = await axios.post('/api/jobs/applications', { ...formData, id }, { // Assuming the endpoint is correct
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(res);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-lg mx-auto p-6 shadow-lg rounded-xl bg-white">
        <div className="text-center text-3xl font-semibold mb-6">
          Apply for Job
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
          />
          <Input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
          />
          <Input
            type="text"
            placeholder="Resume Link"
            value={formData.resumeLink}
            onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
          />
          <Textarea
            placeholder="Cover Letter"
            value={formData.coverLetter}
            onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
          />
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700 transition"
          >
            Submit Application
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ApplyPage;

"use client";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await axios.post("/api/jobs", {
        title,
        description,
        company,
      });

      if (res.status === 201) {
        setSuccess("Job post created successfully!");
        setTitle("");
        setDescription("");
        setCompany("");
      }
    } catch (error: unknown) {
      // Check if error is of type AxiosError
      if (error instanceof AxiosError) {
        setError(error.response?.data?.error || "Something went wrong!");
      } else {
        setError("An unknown error occurred!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Job Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <Label htmlFor="title">Job Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter job title"
            required
          />
        </div>

        {/* Description Textarea */}
        <div>
          <Label htmlFor="description">Job Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter job description"
            required
          />
        </div>

        {/* Company Input */}
        <div>
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Enter company name"
            required
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={loading} className="w-full mt-4">
          {loading ? "Creating..." : "Create Job Post"}
        </Button>
      </form>

      {error && <div className="mt-4 text-red-500">{error}</div>}
      {success && <div className="mt-4 text-green-500">{success}</div>}
    </div>
  );
};

export default Page;

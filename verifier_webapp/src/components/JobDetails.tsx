import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Building2, MapPin, DollarSign, Calendar, Briefcase } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  salary_range: string;
  deadline: string;
  domain: string;
  company_logo: string;
}

const SAMPLE_JOBS = {
  '123e4567-e89b-12d3-a456-426614174000': {
    id: '123e4567-e89b-12d3-a456-426614174000',
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Solutions',
    description: 'We are looking for an experienced Full Stack Developer...',
    location: 'San Francisco, CA',
    salary_range: '$120,000 - $180,000',
    deadline: '2024-02-15',
    domain: 'Software Development',
    company_logo: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=128&h=128&fit=crop'
  },
};

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasActiveApplication, setHasActiveApplication] = useState(false);

  useEffect(() => {
    async function fetchJobAndApplication() {
      if (!id) return;

      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(id)) {
        toast.error('Invalid job ID');
        navigate('/');
        return;
      }

      // Get the current session
      const { data: { session } } = await supabase.auth.getSession();
      
      // Fetch job details
      const { data: jobData, error: jobError } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .single();

      if (jobError) {
        console.error('Error loading job details:', jobError);
        const sampleJob = SAMPLE_JOBS[id as keyof typeof SAMPLE_JOBS];
        if (sampleJob) {
          setJob(sampleJob);
        } else {
          toast.error('Job not found');
          navigate('/');
        }
        return;
      }

      if (jobData) {
        setJob(jobData);

        // If user is logged in, check if they have an active application
        if (session?.user) {
          const { data: applicationData } = await supabase
            .from('applications')
            .select('id, status')
            .eq('job_id', id)
            .eq('user_id', session.user.id)
            .in('status', ['pending', 'accepted']);

          setHasActiveApplication(applicationData && applicationData.length > 0);
        }
      } else {
        toast.error('Job not found');
        navigate('/');
      }
    }

    fetchJobAndApplication();
  }, [id, navigate]);

  const handleApply = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast.error('Please login to apply');
      navigate('/login');
      return;
    }

    if (hasActiveApplication) {
      toast.error('You already have an active application for this position');
      return;
    }

    setLoading(true);

    // Double-check for existing active application
    const { data: existingApplications } = await supabase
      .from('applications')
      .select('id')
      .eq('job_id', id)
      .eq('user_id', session.user.id)
      .in('status', ['pending', 'accepted']);

    if (existingApplications && existingApplications.length > 0) {
      setLoading(false);
      setHasActiveApplication(true);
      toast.error('You already have an active application for this position');
      return;
    }

    const { data, error } = await supabase
      .from('applications')
      .insert([
        {
          job_id: id,
          user_id: session.user.id,
          status: 'pending'
        }
      ])
      .select()
      .single();

    setLoading(false);

    if (error) {
      toast.error('Error applying for job. Please try again.');
      return;
    }

    if (data) {
      setHasActiveApplication(true);
      toast.success('Application submitted successfully');
      navigate(`/upload/${data.upload_token}`);
    }
  };

  if (!job) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={job.company_logo}
                alt={`${job.company} logo`}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Building2 className="w-4 h-4" />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {job.domain}
              </span>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center space-x-2 text-gray-600 mb-4">
              <DollarSign className="w-5 h-5" />
              <span className="text-lg font-medium">{job.salary_range}</span>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-4">Job Description</h2>
              <div className="whitespace-pre-wrap text-gray-600">{job.description}</div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleApply}
              disabled={loading || hasActiveApplication}
              className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                'Applying...'
              ) : hasActiveApplication ? (
                'Already Applied'
              ) : (
                <>
                  <Briefcase className="w-5 h-5" />
                  <span>Apply Now</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
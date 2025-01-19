import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPinIcon, BuildingIcon, CurrencyIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [applying, setApplying] = React.useState(false);

  React.useEffect(() => {
    fetchJob();
  }, [id]);

  async function fetchJob() {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setJob(data);
    } catch (error) {
      console.error('Error fetching job:', error);
      toast.error('Failed to load job details');
    } finally {
      setLoading(false);
    }
  }

  async function handleApply() {
    try {
      setApplying(true);
      const user = (await supabase.auth.getUser()).data.user;
      
      if (!user) {
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase
        .from('applications')
        .insert([
          { job_id: id, user_id: user.id }
        ])
        .select()
        .single();

      if (error) throw error;

      toast.success('Application started! Please upload your documents.');
      navigate(`/upload/${data.upload_token}`);
    } catch (error) {
      console.error('Error applying:', error);
      toast.error('Failed to submit application');
    } finally {
      setApplying(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
      
      <div className="space-y-4 mb-8">
        <div className="flex items-center text-gray-600">
          <BuildingIcon className="h-5 w-5 mr-2" />
          <span>{job.company}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPinIcon className="h-5 w-5 mr-2" />
          <span>{job.location}</span>
        </div>
        {job.salary_range && (
          <div className="flex items-center text-gray-600">
            <CurrencyIcon className="h-5 w-5 mr-2" />
            <span>{job.salary_range}</span>
          </div>
        )}
      </div>

      <div className="prose max-w-none mb-8">
        <h2 className="text-xl font-semibold mb-4">Job Description</h2>
        <div className="whitespace-pre-wrap">{job.description}</div>
      </div>

      <button
        onClick={handleApply}
        disabled={applying}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {applying ? 'Submitting...' : 'Apply Now'}
      </button>
    </div>
  );
}
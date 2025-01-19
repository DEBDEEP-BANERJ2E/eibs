import React from 'react';
import { Link } from 'react-router-dom';
import { FileIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export default function MyApplications() {
  const [applications, setApplications] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          jobs (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
      
      <div className="space-y-4">
        {applications.map((application) => (
          <div
            key={application.id}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {application.jobs.title}
                </h2>
                <p className="text-gray-600">{application.jobs.company}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium
                ${application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'}`}>
                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2">
                <FileIcon className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">Resume:</span>
                {application.resume_url ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircleIcon className="h-5 w-5 text-red-500" />
                )}
              </div>

              <div className="flex items-center space-x-2">
                <FileIcon className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">Cover Letter:</span>
                {application.cover_letter_url ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircleIcon className="h-5 w-5 text-red-500" />
                )}
              </div>
            </div>

            {(!application.resume_url || !application.cover_letter_url) && (
              <div className="mt-4">
                <Link
                  to={`/upload/${application.upload_token}`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Upload Missing Documents →
                </Link>
              </div>
            )}
          </div>
        ))}

        {applications.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-600">You haven't applied to any jobs yet.</p>
            <Link
              to="/"
              className="mt-4 inline-block text-blue-600 hover:text-blue-800"
            >
              Browse Available Positions →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { FileText, Briefcase, QrCode, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode.react';
import toast from 'react-hot-toast';

interface Application {
  id: string;
  status: string;
  created_at: string;
  upload_token: string;
  jobs: {
    title: string;
    company: string;
  };
  resume_url: string | null;
  cover_letter_url: string | null;
}

export default function Applications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [withdrawingId, setWithdrawingId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }
    }

    async function fetchApplications() {
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          jobs:job_id(title, company)
        `)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setApplications(data);
      }
    }

    checkAuth();
    fetchApplications();
  }, [navigate]);

  const handleUploadClick = (uploadToken: string) => {
    navigate(`/upload/${uploadToken}`);
  };

  const handleWithdraw = async (applicationId: string) => {
    if (!confirm('Are you sure you want to withdraw this application? This action cannot be undone.')) {
      return;
    }

    setWithdrawingId(applicationId);

    try {
      // First, delete any associated files from storage if they exist
      const application = applications.find(app => app.id === applicationId);
      if (application) {
        if (application.resume_url) {
          const resumePath = application.resume_url.split('/').pop();
          if (resumePath) {
            await supabase.storage.from('resumes').remove([resumePath]);
          }
        }
        if (application.cover_letter_url) {
          const coverLetterPath = application.cover_letter_url.split('/').pop();
          if (coverLetterPath) {
            await supabase.storage.from('cover-letters').remove([coverLetterPath]);
          }
        }
      }

      // Then delete the application record
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', applicationId);

      if (error) {
        throw error;
      }

      setApplications(applications.filter(app => app.id !== applicationId));
      toast.success('Application withdrawn successfully');
    } catch (error) {
      console.error('Error withdrawing application:', error);
      toast.error('Failed to withdraw application. Please try again.');
    } finally {
      setWithdrawingId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Applications</h1>

      <div className="space-y-4">
        {applications.map((application) => (
          <div
            key={application.id}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    {application.jobs.title}
                  </h2>
                </div>
                <p className="text-gray-600">{application.jobs.company}</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  application.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : application.status === 'accepted'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </span>
                <button
                  onClick={() => handleWithdraw(application.id)}
                  disabled={withdrawingId === application.id}
                  className={`p-1.5 rounded-full transition-colors ${
                    withdrawingId === application.id
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
                  }`}
                  title="Withdraw Application"
                >
                  {withdrawingId === application.id ? (
                    <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                  ) : (
                    <Trash2 className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <div className="flex items-center space-x-4">
                {application.resume_url ? (
                  <a
                    href={application.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Resume</span>
                  </a>
                ) : (
                  <span className="text-gray-400">No resume uploaded</span>
                )}

                {application.cover_letter_url ? (
                  <a
                    href={application.cover_letter_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Cover Letter</span>
                  </a>
                ) : (
                  <span className="text-gray-400">No cover letter uploaded</span>
                )}
              </div>

              {application.status === 'pending' && (!application.resume_url || !application.cover_letter_url) && (
                <div className="border-t pt-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <button
                      onClick={() => handleUploadClick(application.upload_token)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Upload Documents</span>
                    </button>
                    
                    <button
                      onClick={() => setSelectedApp(selectedApp === application.id ? null : application.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <QrCode className="w-4 h-4" />
                      <span>Show QR Code</span>
                    </button>
                  </div>

                  {selectedApp === application.id && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex flex-col items-center space-y-3">
                        <QRCode 
                          value={`${window.location.origin}/upload/${application.upload_token}`}
                          size={200}
                          className="bg-white p-2 rounded-lg"
                        />
                        <p className="text-sm text-gray-600 text-center">
                          Scan this QR code with your mobile device to upload your documents
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {applications.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
            <p className="text-gray-500">Start applying for jobs to see your applications here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
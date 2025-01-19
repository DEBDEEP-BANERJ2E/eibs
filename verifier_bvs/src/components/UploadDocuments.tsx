import React from 'react';
import { useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export default function UploadDocuments() {
  const { token } = useParams();
  const [application, setApplication] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const uploadUrl = `${window.location.origin}/upload/${token}`;

  React.useEffect(() => {
    fetchApplication();
  }, [token]);

  async function fetchApplication() {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*, jobs(*)')
        .eq('upload_token', token)
        .single();

      if (error) throw error;
      setApplication(data);
    } catch (error) {
      console.error('Error fetching application:', error);
      toast.error('Failed to load application details');
    } finally {
      setLoading(false);
    }
  }

  async function handleFileUpload(event, fileType) {
    try {
      const file = event.target.files[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${token}-${fileType}.${fileExt}`;
      const filePath = `${application.user_id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('applications')
        .update({
          [`${fileType}_url`]: publicUrl
        })
        .eq('id', application.id);

      if (updateError) throw updateError;

      toast.success(`${fileType} uploaded successfully`);
      await fetchApplication();
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!application) {
    return <div>Application not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Upload Documents</h1>
      <p className="text-gray-600 mb-8">
        Position: {application.jobs.title} at {application.jobs.company}
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Resume</h2>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFileUpload(e, 'resume')}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            {application.resume_url && (
              <p className="mt-2 text-sm text-green-600">✓ Resume uploaded</p>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Cover Letter</h2>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFileUpload(e, 'cover_letter')}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            {application.cover_letter_url && (
              <p className="mt-2 text-sm text-green-600">✓ Cover Letter uploaded</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Upload Later via QR Code</h2>
          <p className="text-gray-600">
            Scan this QR code to upload your documents from another device
          </p>
          <div className="bg-white p-4 inline-block rounded-lg shadow-md">
            <QRCodeSVG value={uploadUrl} size={200} />
          </div>
        </div>
      </div>
    </div>
  );
}
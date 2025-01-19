import React from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';
import { FileText, CheckCircle, AlertCircle } from 'lucide-react';

interface RequiredDocument {
  id: string;
  name: string;
  description: string;
  required: boolean;
}

const REQUIRED_DOCUMENTS: RequiredDocument[] = [
  {
    id: 'resume',
    name: 'Resume',
    description: 'Your up-to-date professional resume',
    required: true
  },
  {
    id: 'cover_letter',
    name: 'Cover Letter',
    description: 'A personalized cover letter for this position',
    required: true
  },
  {
    id: 'tenth_marksheet',
    name: '10th Marksheet',
    description: 'Secondary school certificate and marksheet',
    required: true
  },
  {
    id: 'birth_certificate',
    name: 'Birth Certificate',
    description: 'Official birth certificate or age proof',
    required: true
  }
];

export default function UploadDocuments() {
  const { token } = useParams();
  const uploadUrl = `${window.location.origin}/api/upload/${token}`;
  const qrData = JSON.stringify({
    token,
    documents: REQUIRED_DOCUMENTS.map(doc => ({
      id: doc.id,
      name: doc.name,
      required: doc.required
    }))
  });

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Required Documents</h1>
      
      <div className="space-y-8">
        {/* Document List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Documents Checklist</h2>
          <div className="divide-y divide-gray-100">
            {REQUIRED_DOCUMENTS.map((doc) => (
              <div key={doc.id} className="py-4 flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {doc.required ? (
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900">
                    {doc.name}
                    {doc.required && (
                      <span className="ml-2 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                        Required
                      </span>
                    )}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">{doc.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QR Code Section */}
        <div className="text-center p-6 bg-gradient-to-b from-indigo-50 to-white rounded-lg">
          <div className="mb-4">
            <FileText className="w-8 h-8 text-indigo-600 mx-auto" />
          </div>
          <p className="text-gray-600 mb-6">
            Scan this QR code with your mobile device to upload the required documents
          </p>
          <div className="inline-block p-4 bg-white rounded-lg shadow-sm">
            <QRCode 
              value={qrData}
              size={256}
              level="H"
              includeMargin={true}
            />
          </div>
          <div className="mt-6 text-sm text-gray-500 space-y-2">
            <p>This QR code contains information about all required documents</p>
            <p>The upload link is unique to your application and can only be used once</p>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="font-semibold text-gray-900 mb-4">Upload Instructions</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium mr-3">1</span>
              <span>Scan the QR code using your mobile device's camera</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium mr-3">2</span>
              <span>Select or take photos of your documents</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium mr-3">3</span>
              <span>Review and confirm your uploads</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium mr-3">4</span>
              <span>Submit your documents to complete the application</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
import React, { createContext, useContext, useState } from 'react';
import { FileUploadState, FileUploadContextType } from '../types';

const FileUploadContext = createContext<FileUploadContextType | undefined>(undefined);

export function FileUploadProvider({ children }: { children: React.ReactNode }) {
  const [fileState, setFileState] = useState<FileUploadState>({
    file: null,
    hash: '',
    status: 'idle',
    error: null
  });

  const handleFileUpload = async (file: File) => {
    if (!file.type.match('application/pdf|application/msword|application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setFileState(prev => ({
        ...prev,
        error: 'Invalid file type. Please upload PDF or DOC files only.',
        status: 'error'
      }));
      return;
    }

    setFileState(prev => ({
      ...prev,
      file,
      status: 'uploading',
      error: null
    }));

    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFileState(prev => ({
        ...prev,
        status: 'complete'
      }));
    } catch (error) {
      setFileState(prev => ({
        ...prev,
        error: 'Failed to upload file',
        status: 'error'
      }));
    }
  };

  const generateHash = async () => {
    if (!fileState.file) {
      setFileState(prev => ({
        ...prev,
        error: 'No file selected',
        status: 'error'
      }));
      return;
    }

    setFileState(prev => ({
      ...prev,
      status: 'hashing',
      error: null
    }));

    try {
      const buffer = await fileState.file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      setFileState(prev => ({
        ...prev,
        hash: hashHex,
        status: 'complete'
      }));
    } catch (error) {
      setFileState(prev => ({
        ...prev,
        error: 'Failed to generate hash',
        status: 'error'
      }));
    }
  };

  return (
    <FileUploadContext.Provider value={{
      fileState,
      setFileState,
      handleFileUpload,
      generateHash
    }}>
      {children}
    </FileUploadContext.Provider>
  );
}

export function useFileUpload() {
  const context = useContext(FileUploadContext);
  if (context === undefined) {
    throw new Error('useFileUpload must be used within a FileUploadProvider');
  }
  return context;
}
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import JobList from './components/JobList';
import JobDetails from './components/JobDetails';
import MyApplications from './components/MyApplications';
import Auth from './components/Auth';
import UploadDocuments from './components/UploadDocuments';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<JobList />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/applications" element={<MyApplications />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/upload/:token" element={<UploadDocuments />} />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;
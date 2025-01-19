import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, BuildingIcon, CurrencyIcon, SearchIcon, BriefcaseIcon, TrendingUpIcon, UsersIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function JobList() {
  const [jobs, setJobs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  React.useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedCategory === 'all') return matchesSearch;
    return matchesSearch && job.category === selectedCategory;
  });

  const categories = ['Technology', 'Design', 'Marketing', 'Sales', 'Engineering'];
  const featuredCompanies = [
    'https://images.unsplash.com/photo-1496200186974-4293800e2c20?w=64&h=64&fit=crop',
    'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=64&h=64&fit=crop',
    'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=64&h=64&fit=crop',
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:16px_16px]"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find Your Dream Job Today
          </h1>
          <p className="text-blue-100 text-lg md:text-xl mb-8 max-w-2xl">
            Discover opportunities that match your skills and aspirations. Join thousands of professionals who've found their perfect role through JobHub.
          </p>
          <div className="relative max-w-2xl">
            <SearchIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs, companies, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white shadow-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <BriefcaseIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{jobs.length}+</p>
              <p className="text-gray-600">Active Jobs</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <BuildingIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">500+</p>
              <p className="text-gray-600">Companies</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <UsersIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">10k+</p>
              <p className="text-gray-600">Job Seekers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Companies */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Featured Companies</h2>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {featuredCompanies.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="Company logo"
              className="w-16 h-16 rounded-lg object-cover"
            />
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-2 overflow-x-auto pb-4">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Jobs
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Job Listings */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map((job) => (
          <Link
            key={job.id}
            to={`/jobs/${job.id}`}
            className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {job.title}
                  </h2>
                  <p className="text-gray-600">{job.company}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium
                  ${job.category === 'Technology' ? 'bg-blue-100 text-blue-800' :
                    job.category === 'Design' ? 'bg-purple-100 text-purple-800' :
                    job.category === 'Marketing' ? 'bg-green-100 text-green-800' :
                    job.category === 'Sales' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'}`}>
                  {job.category}
                </span>
              </div>
              <div className="space-y-2">
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
            </div>
          </Link>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
          <TrendingUpIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600">No jobs found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
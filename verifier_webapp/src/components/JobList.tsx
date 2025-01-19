import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, MapPin, Building2, Clock, Sparkles, Search, Filter,
  TrendingUp, Users, Globe2, Rocket, BookOpen, Award, Target, Zap
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary_range: string;
  deadline: string;
  domain: string;
  company_logo: string;
  featured: boolean;
}

const SAMPLE_JOBS: Job[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    salary_range: '$120,000 - $180,000',
    deadline: '2024-02-15',
    domain: 'Software Development',
    company_logo: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=128&h=128&fit=crop',
    featured: true
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    title: 'AI Research Scientist',
    company: 'Neural Dynamics',
    location: 'Boston, MA',
    salary_range: '$150,000 - $200,000',
    deadline: '2024-02-20',
    domain: 'Artificial Intelligence',
    company_logo: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=128&h=128&fit=crop',
    featured: true
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174002',
    title: 'UX/UI Designer',
    company: 'Creative Minds Inc',
    location: 'Remote',
    salary_range: '$90,000 - $130,000',
    deadline: '2024-02-18',
    domain: 'Design',
    company_logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=128&h=128&fit=crop',
    featured: false
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174003',
    title: 'DevOps Engineer',
    company: 'Cloud Systems Pro',
    location: 'Seattle, WA',
    salary_range: '$130,000 - $170,000',
    deadline: '2024-02-25',
    domain: 'DevOps',
    company_logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=128&h=128&fit=crop',
    featured: false
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174004',
    title: 'Product Manager',
    company: 'Innovation Hub',
    location: 'New York, NY',
    salary_range: '$110,000 - $160,000',
    deadline: '2024-02-22',
    domain: 'Product Management',
    company_logo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=128&h=128&fit=crop',
    featured: true
  }
];

const STATS = [
  {
    icon: <Users className="w-6 h-6 text-purple-100" />,
    value: '10K+',
    label: 'Active Job Seekers'
  },
  {
    icon: <Briefcase className="w-6 h-6 text-purple-100" />,
    value: '5K+',
    label: 'Open Positions'
  },
  {
    icon: <Building2 className="w-6 h-6 text-purple-100" />,
    value: '2K+',
    label: 'Companies'
  }
];

const FEATURED_COMPANIES = [
  {
    name: 'TechCorp Solutions',
    logo: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=128&h=128&fit=crop',
    openPositions: 15,
    rating: 4.8
  },
  {
    name: 'Neural Dynamics',
    logo: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=128&h=128&fit=crop',
    openPositions: 8,
    rating: 4.6
  },
  {
    name: 'Innovation Hub',
    logo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=128&h=128&fit=crop',
    openPositions: 12,
    rating: 4.9
  }
];

const CAREER_TIPS = [
  {
    icon: <Rocket className="w-6 h-6 text-indigo-600" />,
    title: 'Career Growth',
    description: 'Tips for advancing your career and achieving your goals'
  },
  {
    icon: <BookOpen className="w-6 h-6 text-indigo-600" />,
    title: 'Interview Prep',
    description: 'Ace your interviews with our comprehensive guides'
  },
  {
    icon: <Award className="w-6 h-6 text-indigo-600" />,
    title: 'Skill Building',
    description: 'Stay competitive with in-demand skills and certifications'
  },
  {
    icon: <Target className="w-6 h-6 text-indigo-600" />,
    title: 'Job Search',
    description: 'Strategies to find and land your dream job'
  }
];

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>(SAMPLE_JOBS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          setJobs(data);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        // Keep using sample jobs if there's an error
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  const domains = Array.from(new Set(jobs.map(job => job.domain)));

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = !selectedDomain || job.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  const featuredJobs = filteredJobs.filter(job => job.featured);
  const regularJobs = filteredJobs.filter(job => !job.featured);

  // Rest of the component remains the same...
  return (
    <div className="space-y-8">
      {/* Hero Section with Stats */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Find Your Dream Job Today</h1>
          <p className="text-lg text-purple-100">Discover thousands of job opportunities with the best companies</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATS.map((stat, index) => (
            <div key={index} className="bg-white/10 rounded-lg p-6 backdrop-blur-lg">
              <div className="flex items-center justify-center mb-4">
                {stat.icon}
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-purple-100">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search jobs or companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="md:w-64">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white"
              >
                <option value="">All Domains</option>
                {domains.map(domain => (
                  <option key={domain} value={domain}>{domain}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Companies Section */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Companies</h2>
          <Link to="/" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center">
            View all <TrendingUp className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_COMPANIES.map((company, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <img src={company.logo} alt={company.name} className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <h3 className="font-semibold text-gray-900">{company.name}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <Briefcase className="w-4 h-4 mr-1" />
                    <span>{company.openPositions} open positions</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Rating: {company.rating}/5.0</span>
                <Link to="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
                  View jobs
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Career Resources Section */}
      <div className="bg-white rounded-xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Career Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAREER_TIPS.map((tip, index) => (
            <div key={index} className="p-6 rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-indigo-200 transition-colors">
              <div className="bg-indigo-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                {tip.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
              <p className="text-sm text-gray-600">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading jobs...</p>
        </div>
      ) : (
        <>
          {/* Featured Jobs Section */}
          {featuredJobs.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h2 className="text-2xl font-bold text-gray-900">Featured Positions</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredJobs.map((job) => (
                  <Link
                    key={job.id}
                    to={`/jobs/${job.id}`}
                    className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-all border-2 border-amber-100 hover:border-amber-200"
                  >
                    <div className="p-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src={job.company_logo}
                          alt={`${job.company} logo`}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
                            {job.title}
                          </h3>
                          <div className="mt-1 flex items-center text-sm text-gray-600">
                            <Building2 className="w-4 h-4 mr-1" />
                            <span className="truncate">{job.company}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {job.domain}
                        </span>
                        <span className="text-sm font-medium text-gray-900">{job.salary_range}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Regular Jobs Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">All Positions</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {regularJobs.map((job) => (
                <Link
                  key={job.id}
                  to={`/jobs/${job.id}`}
                  className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-indigo-200"
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={job.company_logo}
                        alt={`${job.company} logo`}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
                          {job.title}
                        </h3>
                        <div className="mt-1 flex items-center text-sm text-gray-600">
                          <Building2 className="w-4 h-4 mr-1" />
                          <span className="truncate">{job.company}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {job.domain}
                      </span>
                      <span className="text-sm font-medium text-gray-900">{job.salary_range}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg">
              <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
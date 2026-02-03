import { useState } from 'react';
import JobCard from '../components/JobCard';
import JobFilter from '../components/JobFilter';
import { useJobs } from '../context/JobContext';
import { FiSearch, FiMapPin, FiBriefcase, FiUsers } from 'react-icons/fi';

const HomePage = () => {
    const { jobs, loading, error, fetchJobs } = useJobs();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        fetchJobs({ search: searchTerm });
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white pt-20 pb-24 relative overflow-hidden">
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
                    <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-blue-300 blur-3xl"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
                        Find Your <span className="text-blue-200">Dream Job</span>
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                        Discover thousands of job opportunities from top companies worldwide. Your next career move starts here.
                    </p>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="max-w-3xl mx-auto bg-white p-2 rounded-2xl shadow-xl flex flex-col md:flex-row gap-2">
                        <div className="flex-1 flex items-center px-4 h-14 bg-gray-50 rounded-xl border border-transparent focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all">
                            <FiSearch className="text-gray-400 text-xl mr-3" />
                            <input 
                                type="text" 
                                placeholder="Search jobs, companies, keywords..." 
                                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button 
                            type="submit"
                            className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
                        >
                            Search
                        </button>
                    </form>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center gap-8 mt-12 text-blue-100 font-medium">
                        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                            <div className="bg-blue-500 p-1.5 rounded-full">
                                <FiBriefcase className="text-white text-sm" />
                            </div>
                            <span>{jobs.length > 0 ? jobs.length : '8+'} Active Jobs</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                             <div className="bg-purple-500 p-1.5 rounded-full">
                                <FiMapPin className="text-white text-sm" />
                            </div>
                            <span>50+ Locations</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                             <div className="bg-green-500 p-1.5 rounded-full">
                                <FiUsers className="text-white text-sm" />
                            </div>
                            <span>10k+ Hired</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Main Content */}
            <div className="container mx-auto px-6 py-12 -mt-10 relative z-20">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full lg:w-1/4">
                        <JobFilter />
                    </div>
                    
                    {/* Job List */}
                    <div className="w-full lg:w-3/4">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">
                                Showing <span className="text-blue-600">{jobs.length}</span> jobs
                            </h2>
                            <div className="text-sm text-gray-500">
                                Sort by: <span className="font-semibold text-gray-800 cursor-pointer">Newest</span>
                            </div>
                        </div>

                        {loading && (
                            <div className="flex justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            </div>
                        )}
                        
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl mb-6">
                                {error}
                            </div>
                        )}
                        
                        {!loading && !error && jobs.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FiSearch className="text-gray-400 text-2xl" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">No jobs found</h3>
                                <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
                            </div>
                        )}

                        <div className="space-y-4">
                            {jobs.map(job => (
                                <JobCard key={job.id} job={job} />
                            ))}
                        </div>
                        
                        {!loading && jobs.length > 0 && (
                             <div className="mt-10 text-center">
                                <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                                    Load More Jobs
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

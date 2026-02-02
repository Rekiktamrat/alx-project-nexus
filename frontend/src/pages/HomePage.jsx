import JobCard from '../components/JobCard';
import JobFilter from '../components/JobFilter';
import { useJobs } from '../context/JobContext';

const HomePage = () => {
    const { jobs, loading, error } = useJobs();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Find Your Dream Job</h1>
            
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/4">
                    <JobFilter />
                </div>
                
                <div className="w-full md:w-3/4">
                    {loading && <p className="text-center text-gray-500">Loading jobs...</p>}
                    {error && <p className="text-center text-red-500">{error}</p>}
                    
                    {!loading && !error && jobs.length === 0 && (
                        <p className="text-center text-gray-500">No jobs found matching your criteria.</p>
                    )}

                    <div className="grid grid-cols-1 gap-6">
                        {jobs.map(job => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

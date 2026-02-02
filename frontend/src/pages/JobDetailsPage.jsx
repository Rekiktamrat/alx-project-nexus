import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobContext';

const JobDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { applyForJob } = useJobs();
    
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [coverLetter, setCoverLetter] = useState('');
    const [applying, setApplying] = useState(false);
    const [applySuccess, setApplySuccess] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await jobsAPI.getById(id);
                setJob(response.data);
            } catch (err) {
                setError("Failed to load job details.");
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    const handleApply = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }

        setApplying(true);
        const result = await applyForJob(id, { cover_letter: coverLetter });
        setApplying(false);

        if (result.success) {
            setApplySuccess("Application submitted successfully!");
            setCoverLetter('');
        } else {
            setApplySuccess(`Error: ${result.message}`);
        }
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
    if (!job) return <div className="text-center py-10">Job not found.</div>;

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{job.title}</h1>
                <div className="flex items-center text-gray-600 mb-6">
                    <span className="mr-4 font-semibold">{job.company}</span>
                    <span className="mr-4">•</span>
                    <span className="mr-4">{job.location}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{job.job_type.replace('_', ' ')}</span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">{job.category_name}</span>
                     {job.experience_level && (
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">{job.experience_level}</span>
                    )}
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2">Job Description</h2>
                    <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4">Apply for this Position</h2>
                    {user ? (
                        <form onSubmit={handleApply}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter</label>
                                <textarea 
                                    className="w-full border-gray-300 rounded-md shadow-sm p-3 border focus:ring-blue-500 focus:border-blue-500 h-32"
                                    placeholder="Tell us why you're a good fit..."
                                    value={coverLetter}
                                    onChange={(e) => setCoverLetter(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            
                            {applySuccess && (
                                <div className={`mb-4 p-3 rounded ${applySuccess.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                    {applySuccess}
                                </div>
                            )}

                            <button 
                                type="submit" 
                                disabled={applying}
                                className={`w-full py-3 rounded text-white font-semibold transition-colors ${applying ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                            >
                                {applying ? 'Submitting...' : 'Submit Application'}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center">
                            <p className="mb-4 text-gray-600">You must be logged in to apply.</p>
                            <button onClick={() => navigate('/login')} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
                                Login to Apply
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobDetailsPage;

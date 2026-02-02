import { useState, useEffect } from 'react';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminDashboardPage = () => {
    const { user } = useAuth();
    const { jobs, deleteJob, fetchApplications } = useJobs();
    const [applications, setApplications] = useState([]);
    const [activeTab, setActiveTab] = useState('jobs');

    useEffect(() => {
        const loadData = async () => {
            if (activeTab === 'applications') {
                const data = await fetchApplications();
                setApplications(data);
            }
        };
        loadData();
    }, [activeTab]);

    if (!user || user.role !== 'admin') {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
                <p className="mt-2">You must be an admin to view this page.</p>
            </div>
        );
    }

    const handleDeleteJob = async (id) => {
        if (window.confirm("Are you sure you want to delete this job?")) {
            await deleteJob(id);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

            <div className="flex space-x-4 mb-6 border-b">
                <button
                    className={`py-2 px-4 font-semibold ${activeTab === 'jobs' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('jobs')}
                >
                    Manage Jobs
                </button>
                <button
                    className={`py-2 px-4 font-semibold ${activeTab === 'applications' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('applications')}
                >
                    View Applications
                </button>
            </div>

            {activeTab === 'jobs' && (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">All Jobs ({jobs.length})</h2>
                        <Link to="/jobs/create" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                            + Post New Job
                        </Link>
                    </div>
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {jobs.map(job => (
                                    <tr key={job.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link to={`/jobs/${job.id}`} className="text-blue-600 hover:underline">{job.title}</Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{job.company}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{new Date(job.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button onClick={() => handleDeleteJob(job.id)} className="text-red-600 hover:text-red-900 ml-4">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'applications' && (
                <div>
                    <h2 className="text-xl font-bold mb-4">All Applications ({applications.length})</h2>
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied At</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {applications.map(app => (
                                    <tr key={app.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{app.applicant_username}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{app.job_title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                app.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                                                app.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{new Date(app.applied_at).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                                {applications.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No applications found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboardPage;

import { useState, useEffect } from 'react';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiTrash2, FiClock, FiUsers, FiBriefcase, FiAlertCircle } from 'react-icons/fi';

const AdminDashboardPage = () => {
    const { user } = useAuth();
    const { jobs, deleteJob, approveJob, fetchApplications } = useJobs();
    const [applications, setApplications] = useState([]);
    const [activeTab, setActiveTab] = useState('pending');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            if (activeTab === 'applications') {
                setIsLoading(true);
                const data = await fetchApplications();
                setApplications(data);
                setIsLoading(false);
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

    const pendingJobs = jobs.filter(job => !job.is_approved);
    const liveJobs = jobs.filter(job => job.is_approved);

    const handleApproveJob = async (id) => {
        if (window.confirm("Approve this job for public listing?")) {
            await approveJob(id);
        }
    };

    const handleDeleteJob = async (id) => {
        if (window.confirm("Are you sure you want to delete this job?")) {
            await deleteJob(id);
        }
    };

    const StatsCard = ({ title, value, icon: Icon, color }) => (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-4 rounded-lg ${color}`}>
                <Icon size={24} className="text-white" />
            </div>
            <div>
                <p className="text-gray-500 text-sm font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-500 mt-1">Manage jobs, approvals, and applications</p>
                </div>
                <Link 
                    to="/jobs/create" 
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-sm flex items-center gap-2"
                >
                    <FiBriefcase /> Post New Job
                </Link>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatsCard 
                    title="Pending Approval" 
                    value={pendingJobs.length} 
                    icon={FiAlertCircle} 
                    color="bg-orange-500" 
                />
                <StatsCard 
                    title="Live Jobs" 
                    value={liveJobs.length} 
                    icon={FiCheckCircle} 
                    color="bg-green-500" 
                />
                <StatsCard 
                    title="Total Applications" 
                    value={applications.length || '-'} 
                    icon={FiUsers} 
                    color="bg-blue-500" 
                />
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div className="flex border-b border-gray-200">
                    <button
                        className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'pending' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('pending')}
                    >
                        Pending Approval ({pendingJobs.length})
                    </button>
                    <button
                        className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'live' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('live')}
                    >
                        Live Jobs ({liveJobs.length})
                    </button>
                    <button
                        className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'applications' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('applications')}
                    >
                        Applications
                    </button>
                </div>

                <div className="p-6">
                    {/* Pending Jobs Tab */}
                    {activeTab === 'pending' && (
                        <div>
                            {pendingJobs.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    <FiCheckCircle size={48} className="mx-auto mb-4 text-green-200" />
                                    <p className="text-lg">No jobs pending approval.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-gray-100 text-gray-500 text-sm uppercase">
                                                <th className="pb-4 font-semibold">Job Title</th>
                                                <th className="pb-4 font-semibold">Company</th>
                                                <th className="pb-4 font-semibold">Posted By</th>
                                                <th className="pb-4 font-semibold">Date</th>
                                                <th className="pb-4 font-semibold text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {pendingJobs.map(job => (
                                                <tr key={job.id} className="group hover:bg-gray-50 transition-colors">
                                                    <td className="py-4">
                                                        <Link to={`/jobs/${job.id}`} className="font-semibold text-gray-900 hover:text-blue-600">
                                                            {job.title}
                                                        </Link>
                                                        <div className="text-xs text-gray-500 mt-1">{job.job_type} • {job.location}</div>
                                                    </td>
                                                    <td className="py-4 text-gray-700">{job.company}</td>
                                                    <td className="py-4 text-gray-600">@{job.posted_by_username || 'Unknown'}</td>
                                                    <td className="py-4 text-gray-500 text-sm">{new Date(job.created_at).toLocaleDateString()}</td>
                                                    <td className="py-4 text-right">
                                                        <div className="flex items-center justify-end gap-3">
                                                            <button 
                                                                onClick={() => handleApproveJob(job.id)}
                                                                className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                                                            >
                                                                <FiCheckCircle /> Approve
                                                            </button>
                                                            <button 
                                                                onClick={() => handleDeleteJob(job.id)}
                                                                className="flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                                                            >
                                                                <FiTrash2 /> Reject
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Live Jobs Tab */}
                    {activeTab === 'live' && (
                        <div>
                            {liveJobs.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    <p className="text-lg">No live jobs found.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-gray-100 text-gray-500 text-sm uppercase">
                                                <th className="pb-4 font-semibold">Job Title</th>
                                                <th className="pb-4 font-semibold">Company</th>
                                                <th className="pb-4 font-semibold">Posted Date</th>
                                                <th className="pb-4 font-semibold text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {liveJobs.map(job => (
                                                <tr key={job.id} className="group hover:bg-gray-50 transition-colors">
                                                    <td className="py-4">
                                                        <Link to={`/jobs/${job.id}`} className="font-semibold text-gray-900 hover:text-blue-600">
                                                            {job.title}
                                                        </Link>
                                                    </td>
                                                    <td className="py-4 text-gray-700">{job.company}</td>
                                                    <td className="py-4 text-gray-500 text-sm">{new Date(job.created_at).toLocaleDateString()}</td>
                                                    <td className="py-4 text-right">
                                                        <button 
                                                            onClick={() => handleDeleteJob(job.id)}
                                                            className="text-gray-400 hover:text-red-600 transition-colors p-2"
                                                            title="Delete Job"
                                                        >
                                                            <FiTrash2 size={18} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Applications Tab */}
                    {activeTab === 'applications' && (
                        <div>
                            {isLoading ? (
                                <div className="text-center py-8">Loading applications...</div>
                            ) : applications.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    <FiUsers size={48} className="mx-auto mb-4 text-blue-200" />
                                    <p className="text-lg">No applications received yet.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-gray-100 text-gray-500 text-sm uppercase">
                                                <th className="pb-4 font-semibold">Applicant</th>
                                                <th className="pb-4 font-semibold">Job Title</th>
                                                <th className="pb-4 font-semibold">Status</th>
                                                <th className="pb-4 font-semibold">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {applications.map(app => (
                                                <tr key={app.id} className="group hover:bg-gray-50 transition-colors">
                                                    <td className="py-4 font-medium text-gray-900">
                                                        {app.applicant_username}
                                                    </td>
                                                    <td className="py-4 text-blue-600">{app.job_title}</td>
                                                    <td className="py-4">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                            app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                                                            app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                            'bg-yellow-100 text-yellow-700'
                                                        }`}>
                                                            {app.status.toUpperCase()}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 text-gray-500 text-sm">{new Date(app.applied_at).toLocaleDateString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;

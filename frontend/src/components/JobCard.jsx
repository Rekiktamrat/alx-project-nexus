import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
            <p className="text-gray-600 mb-2">{job.company}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{job.job_type.replace('_', ' ')}</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">{job.location}</span>
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">{job.category_name}</span>
                {job.experience_level && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">{job.experience_level}</span>
                )}
            </div>
            <Link to={`/jobs/${job.id}`} className="block text-center w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
                View Details
            </Link>
        </div>
    );
};

export default JobCard;

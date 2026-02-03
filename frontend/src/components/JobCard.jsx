import { Link } from 'react-router-dom';
import { FiMapPin, FiClock, FiDollarSign, FiStar } from 'react-icons/fi';

const JobCard = ({ job }) => {
    // Generate a consistent color based on company name
    const getLogoColor = (name) => {
        const colors = ['bg-red-100 text-red-600', 'bg-blue-100 text-blue-600', 'bg-green-100 text-green-600', 'bg-purple-100 text-purple-600', 'bg-orange-100 text-orange-600'];
        const index = name.length % colors.length;
        return colors[index];
    };

    const logoColor = getLogoColor(job.company);
    const initials = job.company.substring(0, 2).toUpperCase();

    // Calculate time ago (mock logic if created_at is standard)
    const timeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
        if (diffInDays === 0) return 'Today';
        return `${diffInDays}d ago`;
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 relative group">
            {/* Featured Badge - Mocking randomly or based on a field if it existed */}
            {job.id % 2 === 0 && (
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <FiStar className="fill-current" /> Featured
                </div>
            )}

            <div className="flex items-start gap-4">
                {/* Company Logo Placeholder */}
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center text-xl font-bold ${logoColor}`}>
                    {initials}
                </div>

                <div className="flex-1">
                    <div className="mb-1">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {job.title}
                        </h3>
                        <p className="text-gray-500 font-medium text-sm">{job.company}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mt-3 mb-4">
                        <div className="flex items-center gap-1">
                            <FiMapPin /> {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                            <FiClock /> {timeAgo(job.created_at)}
                        </div>
                        <div className="flex items-center gap-1">
                            <FiDollarSign /> $60k - $120k {/* Mock salary if not in DB */}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full">
                            {job.job_type.replace('_', ' ')}
                        </span>
                        <span className="bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full">
                            {job.category_name || 'Engineering'}
                        </span>
                        {job.experience_level && (
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                job.experience_level === 'senior' ? 'bg-purple-50 text-purple-600' :
                                job.experience_level === 'mid' ? 'bg-orange-50 text-orange-600' :
                                'bg-green-50 text-green-600'
                            }`}>
                                {job.experience_level}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <Link 
                to={`/jobs/${job.id}`} 
                className="absolute inset-0"
                aria-label={`View details for ${job.title}`}
            ></Link>
        </div>
    );
};

export default JobCard;

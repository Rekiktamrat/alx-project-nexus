import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiBriefcase } from 'react-icons/fi';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="container mx-auto px-6 h-20 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
                    <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                        <FiBriefcase size={24} />
                    </div>
                    JobBoard
                </Link>

                {/* Center Navigation */}
                <div className="hidden md:flex items-center space-x-8 text-gray-600 font-medium">
                    <Link to="/" className="hover:text-blue-600 transition-colors">Find Jobs</Link>
                    <Link to="#" className="hover:text-blue-600 transition-colors">Companies</Link>
                    <Link to="#" className="hover:text-blue-600 transition-colors">Salary Guide</Link>
                    {user?.role === 'admin' && (
                        <Link to="/admin" className="hover:text-blue-600 transition-colors">Dashboard</Link>
                    )}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600 hidden sm:block">Hi, {user.username}</span>
                            <button 
                                onClick={logout} 
                                className="text-gray-600 hover:text-red-500 font-medium transition-colors"
                            >
                                Sign Out
                            </button>
                            <Link 
                                to="/jobs/create" 
                                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
                            >
                                Post a Job
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="text-gray-700 font-bold hover:text-blue-600 transition-colors">
                                Sign In
                            </Link>
                            <Link 
                                to="/register" 
                                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
                            >
                                Post a Job
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

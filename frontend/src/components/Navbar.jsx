import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">JobBoard</Link>
                <div className="space-x-4">
                    <Link to="/" className="hover:text-blue-200">Jobs</Link>
                    {user?.role === 'admin' && (
                        <>
                            <Link to="/admin" className="hover:text-blue-200">Dashboard</Link>
                            <Link to="/jobs/create" className="hover:text-blue-200">Post Job</Link>
                        </>
                    )}
                    {user ? (
                        <>
                            <span className="font-semibold">Hi, {user.username}</span>
                            <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-blue-200">Login</Link>
                            <Link to="/register" className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

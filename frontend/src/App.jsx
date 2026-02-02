import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import JobDetailsPage from './pages/JobDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateJobPage from './pages/CreateJobPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import { AuthProvider } from './context/AuthContext';
import { JobProvider } from './context/JobContext';

function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/jobs/create" element={<CreateJobPage />} />
              <Route path="/jobs/:id" element={<JobDetailsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
          <footer className="bg-gray-800 text-white py-6 text-center">
            <p>&copy; 2026 Job Board Platform. All rights reserved.</p>
          </footer>
        </div>
      </JobProvider>
    </AuthProvider>
  );
}

export default App;

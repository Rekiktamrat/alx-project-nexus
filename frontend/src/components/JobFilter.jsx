import { useState } from 'react';
import { useJobs } from '../context/JobContext';

const JobFilter = () => {
    const { categories, fetchJobs } = useJobs();
    const [filters, setFilters] = useState({
        category: '',
        location: '',
        type: '',
        level: ''
    });

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleApplyFilters = () => {
        // Remove empty filters
        const activeFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, v]) => v !== '')
        );
        fetchJobs(activeFilters);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Filter Jobs</h3>
            
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select name="category" onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border">
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input type="text" name="location" onChange={handleChange} placeholder="e.g. New York" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border" />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                <select name="type" onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border">
                    <option value="">All Types</option>
                    <option value="full_time">Full Time</option>
                    <option value="part_time">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="freelance">Freelance</option>
                    <option value="internship">Internship</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                <select name="level" onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border">
                    <option value="">All Levels</option>
                    <option value="entry">Entry-Level</option>
                    <option value="mid">Mid-Level</option>
                    <option value="senior">Senior</option>
                </select>
            </div>

            <button onClick={handleApplyFilters} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
                Apply Filters
            </button>
        </div>
    );
};

export default JobFilter;

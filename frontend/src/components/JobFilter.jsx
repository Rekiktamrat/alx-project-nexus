import { useState } from 'react';
import { useJobs } from '../context/JobContext';
import { FiFilter, FiSearch, FiMapPin } from 'react-icons/fi';

const JobFilter = () => {
    const { categories, fetchJobs } = useJobs();
    const [filters, setFilters] = useState({
        category: '',
        location: '',
        type: '',
        level: ''
    });

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value === filters[key] ? '' : value };
        setFilters(newFilters);
        applyFilters(newFilters);
    };

    const handleLocationChange = (e) => {
        setFilters({ ...filters, location: e.target.value });
    };

    const handleLocationSubmit = (e) => {
        if (e.key === 'Enter') {
            applyFilters(filters);
        }
    };

    const applyFilters = (currentFilters) => {
        const activeFilters = Object.fromEntries(
            Object.entries(currentFilters).filter(([_, v]) => v !== '')
        );
        fetchJobs(activeFilters);
    };

    const FilterSection = ({ title, options, filterKey }) => (
        <div className="mb-8">
            <h4 className="text-sm font-bold text-gray-900 mb-3">{title}</h4>
            <div className="flex flex-wrap gap-2">
                {options.map((opt) => (
                    <button
                        key={opt.value}
                        onClick={() => handleFilterChange(filterKey, opt.value)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                            filters[filterKey] === opt.value
                                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                        }`}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
        </div>
    );

    const jobTypes = [
        { label: 'Full Time', value: 'full_time' },
        { label: 'Part Time', value: 'part_time' },
        { label: 'Contract', value: 'contract' },
        { label: 'Freelance', value: 'freelance' },
        { label: 'Internship', value: 'internship' },
    ];

    const experienceLevels = [
        { label: 'Entry Level', value: 'entry' },
        { label: 'Mid Level', value: 'mid' },
        { label: 'Senior', value: 'senior' },
    ];

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-24">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                <FiFilter className="text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900">Filters</h3>
            </div>
            
            <div className="mb-8">
                <h4 className="text-sm font-bold text-gray-900 mb-3">Location</h4>
                <div className="relative">
                    <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text" 
                        name="location" 
                        value={filters.location}
                        onChange={handleLocationChange} 
                        onKeyDown={handleLocationSubmit}
                        placeholder="San Francisco, CA" 
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none text-sm" 
                    />
                </div>
            </div>

            <FilterSection 
                title="Category" 
                filterKey="category"
                options={categories.map(c => ({ label: c.name, value: c.name }))} 
            />

            <FilterSection 
                title="Job Type" 
                filterKey="type"
                options={jobTypes} 
            />

            <FilterSection 
                title="Experience Level" 
                filterKey="level"
                options={experienceLevels} 
            />

            <button 
                onClick={() => applyFilters(filters)} 
                className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200"
            >
                Update Results
            </button>
        </div>
    );
};

export default JobFilter;

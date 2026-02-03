import { createContext, useState, useEffect, useContext } from 'react';
import { jobsAPI, categoriesAPI } from '../services/api';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [jobs, setJobs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchJobs = async (filters = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await jobsAPI.getAll(filters);
            setJobs(response.data);
        } catch (err) {
            setError("Failed to fetch jobs");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await categoriesAPI.getAll();
            setCategories(response.data);
        } catch (err) {
            console.error("Failed to fetch categories", err);
        }
    };

    const applyForJob = async (jobId, data) => {
        try {
            await jobsAPI.apply(jobId, data);
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.detail || "Application failed" };
        }
    };

    const createJob = async (jobData) => {
        try {
            await jobsAPI.create(jobData);
            await fetchJobs(); // Refresh list
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.detail || "Failed to create job" };
        }
    };

    const deleteJob = async (id) => {
        try {
            await jobsAPI.delete(id);
            await fetchJobs();
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.detail || "Failed to delete job" };
        }
    };

    const fetchApplications = async () => {
        try {
            const response = await applicationsAPI.getAll();
            return response.data;
        } catch (err) {
            console.error("Failed to fetch applications", err);
            return [];
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchJobs();
    }, []);

    return (
        <JobContext.Provider value={{ 
            jobs, 
            categories, 
            loading, 
            error, 
            fetchJobs, 
            applyForJob, 
            createJob, 
            deleteJob, 
            fetchApplications 
        }}>
            {children}
        </JobContext.Provider>
    );
};

export const useJobs = () => useContext(JobContext);

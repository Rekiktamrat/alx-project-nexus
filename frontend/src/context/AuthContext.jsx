import { createContext, useState, useEffect, useContext } from 'react';
import { authAPI } from '../services/api';
import { useNavigate } from 'react-router-dom'; // Requires Router context

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('access_token'));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) {
            // Ideally fetch user profile here if endpoint exists
            // For now, we assume token means logged in.
            // You might want to decode JWT to get user role/username
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUser({ username: payload.username, role: payload.role });
            } catch (e) {
                logout();
            }
        }
    }, [token]);

    const login = async (username, password) => {
        setLoading(true);
        try {
            const response = await authAPI.login(username, password);
            const { access, refresh } = response.data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            setToken(access);
            return true;
        } catch (error) {
            console.error("Login failed", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        try {
            await authAPI.register(userData);
            return true;
        } catch (error) {
            console.error("Registration failed", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

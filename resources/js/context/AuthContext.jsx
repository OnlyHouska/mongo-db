import { createContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../services/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadUser = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await authApi.me();
            setUser(response.data.user);
        } catch (err) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    const login = async (credentials) => {
        setError(null);
        try {
            const response = await authApi.login(credentials);
            const { access_token, user } = response.data;
            localStorage.setItem('token', access_token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            return user;
        } catch (err) {
            const message = err.response?.data?.message || 'Prihlaseni selhalo';
            setError(message);
            throw new Error(message);
        }
    };

    const register = async (data) => {
        setError(null);
        try {
            const response = await authApi.register(data);
            const { access_token, user } = response.data;
            localStorage.setItem('token', access_token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            return user;
        } catch (err) {
            const message = err.response?.data?.message || 'Registrace selhala';
            setError(message);
            throw new Error(message);
        }
    };

    const logout = async () => {
        try {
            await authApi.logout();
        } catch (err) {
            // Ignore errors on logout
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
        }
    };

    const isAdmin = user?.role === 'admin';
    const isLibrarian = user?.role === 'librarian';
    const isReader = user?.role === 'reader';
    const canManageLoans = isAdmin || isLibrarian;

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAdmin,
        isLibrarian,
        isReader,
        canManageLoans,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

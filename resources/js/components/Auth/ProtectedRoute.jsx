import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function ProtectedRoute({ children, requiredRoles = [] }) {
    const { isAuthenticated, loading, user, isAdmin, isLibrarian, isReader } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRoles.length > 0) {
        const hasRequiredRole = requiredRoles.some((role) => {
            if (role === 'admin') return isAdmin;
            if (role === 'librarian') return isLibrarian;
            if (role === 'reader') return isReader;
            return false;
        });

        if (!hasRequiredRole) {
            return <Navigate to="/" replace />;
        }
    }

    return children;
}

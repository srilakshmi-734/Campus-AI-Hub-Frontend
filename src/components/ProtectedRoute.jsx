import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute
 *  requiredRole: 'admin' | 'student' | undefined (just needs to be logged in)
 *  redirectPath: where to go if access denied
 */
export default function ProtectedRoute({ children, requiredRole }) {
    const { isLoggedIn, role } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    if (requiredRole && role !== requiredRole) {
        // Role mismatch → send to correct dashboard
        const correct = role === 'admin' ? '/admin/dashboard' : '/student/dashboard';
        return <Navigate to={correct} replace />;
    }

    return children;
}

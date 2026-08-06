import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute({ allowedRoles = [] }) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const role = typeof window !== 'undefined' ? (localStorage.getItem('role')) : null;

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        return <Navigate to={role === 'admin' ? '/admin' : '/dashboard'} replace />;
    }

    return <Outlet />;
}

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-brand-background">
        <Loader2 className="h-10 w-10 animate-spin text-brand-purple" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/biblioteca/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;

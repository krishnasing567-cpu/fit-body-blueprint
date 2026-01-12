import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { loading, user, session } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check URL for error parameters
    const params = new URLSearchParams(window.location.search);
    const errorCode = params.get('error');
    const errorDescription = params.get('error_description');

    if (errorCode) {
      console.error('OAuth error:', errorCode, errorDescription);
      setError(errorDescription || 'Authentication failed. Please try again.');
      // Redirect to login after 3 seconds
      setTimeout(() => navigate('/auth/login'), 3000);
      return;
    }

    // Wait for auth to complete
    if (!loading) {
      if (session && user) {
        console.log('Authentication successful, redirecting to profile');
        navigate('/profile');
      } else {
        console.log('No session found, redirecting to login');
        navigate('/auth/login');
      }
    }
  }, [loading, user, session, navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <p className="text-sm text-gray-500">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing your authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;

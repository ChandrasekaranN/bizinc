'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const checkAuth = (WrappedComponent) => {
  return (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await axios.get('/api/auth/check', { withCredentials: true });
          if (response.data.isAuthenticated) {
            setIsAuthenticated(true);
          } else {
            router.push('/login');
          }
        } catch (error) {
          router.push('/login'); // Redirect to login if not authenticated
        } finally {
          setLoading(false);
        }
      };

      checkAuth();
    }, [router]);

    if (loading) return <div>Loading...</div>;

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
};

export default checkAuth;

import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/auth/')({
  loader: () => {
    return 'Hello World'
  },
  component: () => {
    const navigate = useNavigate();

    useEffect(() => {
      navigate({ 
        to: '/auth/login', replace: true });
    }, [navigate]);

    return <div>Redirecting...</div>;
  },
  
});
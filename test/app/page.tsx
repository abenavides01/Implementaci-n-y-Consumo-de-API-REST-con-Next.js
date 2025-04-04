'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/globals.css';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/posts');
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirigiendo a la página de posts...</p>
    </div>
  );
} 
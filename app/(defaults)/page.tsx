'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { Metadata } from 'next';

const Home: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        router.replace('/auth/login');
    }, [router]);

    return null;
};

export default Home;

"use client";
import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
/* add loading  */

function Page() {
    const { data: session, status: SessionStatus } = useSession();
    const router = useRouter();

    useEffect(() => {
        if(session) router.push('/home');

    }, [router, session])

    if(SessionStatus === 'loading') return (<h1>Loading</h1>)
    return (
        <div className='container mx-auto text-center h-screen flex flex-col items-center justify-center gap-5'>
            <h1 className='text-6xl font-bold'>Welcome To Blogger</h1>
            <h4 className='text-4xl w-83'>Register or Login to Get the Full Experience</h4>
        </div>
    );
}

export default Page;
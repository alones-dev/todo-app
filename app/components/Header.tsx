"use client"

import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import { FiLogOut } from 'react-icons/fi'

const Header = () => {
    const { data: session } = useSession()

    return (
        <div className='w-full bg-[#1f2937] top-0 left-0 z-50 border-b border-white/10'>
            <div className='flex items-center justify-between max-w-7xl mx-auto py-4'>
                <div className='text-[#60a5fa] text-2xl font-bold'>
                    <a href="/dashboard">TaskManager</a>
                </div>
                
                <div className='flex items-center space-x-8'>
                    <span className="text-gray-300">Welcome, {session?.user?.name || "invité"} !</span>
                    <button 
                        onClick={() => signOut()}
                        className='flex items-center gap-2 bg-[#ef4444] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-600 transition duration-200'
                    >
                        <FiLogOut size={18} />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header
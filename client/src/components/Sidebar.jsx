import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LayoutDashboard, BookMarked, ViewIcon } from 'lucide-react';

export const Sidebar = () => {
    const sideBarData = [
        {
            name: 'Homepage',
            link: '/',
            icon: Home,
        },
        {
            name: 'Attendance',
            link: '/mark-absentees',
            icon: BookMarked
        },
        {
            name: 'Dashboard',
            link: '/dashboard',
            icon: LayoutDashboard
        },
        {
            name: 'Students',
            link: '/attendance',
            icon: ViewIcon
        }
    ]

    return (
        <div className='h-full flex flex-col bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700 shadow-2xl'>
            {/* Logo/Brand Section */}
            <div className='px-6 py-8 border-b border-slate-700/50'>
                <h2 className='text-center text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
                    EduAgentX
                </h2>
                <div className='mt-2 h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto'></div>
            </div>

            {/* Navigation Section */}
            <nav className='flex-1 px-4 py-6'>
                <ul className='space-y-2'>
                    {sideBarData.map((data, index) => (
                        <li key={index}>
                            <NavLink 
                                to={data.link}
                                className={({ isActive }) => `
                                    group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out
                                    ${isActive 
                                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30 shadow-lg shadow-blue-500/10' 
                                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white hover:translate-x-1'
                                    }
                                `}
                            >
                                {({ isActive }) => (
                                    <>
                                        <div className={`
                                            transition-all duration-300
                                            ${isActive 
                                                ? 'text-blue-400 scale-110' 
                                                : 'text-slate-400 group-hover:text-blue-400 group-hover:scale-105'
                                            }
                                        `}>
                                            {React.createElement(data.icon, { size: 20 })}
                                        </div>
                                        <span className={`
                                            font-medium transition-all duration-300
                                            ${isActive ? 'text-white font-semibold' : 'group-hover:text-white'}
                                        `}>
                                            {data.name}
                                        </span>
                                        {isActive && (
                                            <div className='ml-auto w-2 h-2 bg-blue-400 rounded-full animate-pulse'></div>
                                        )}
                                    </>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className='px-6 py-4 border-t border-slate-700/50'>
                <div className='text-xs text-slate-500 text-center'>
                    © 2025 EduAgentX
                </div>
            </div>
        </div>
    )
}
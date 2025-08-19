import React from 'react';

import { NavLink } from 'react-router-dom';
import {Home, LayoutDashboard, BookMarked} from 'lucide-react'
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
        }
    ]
    return (
        <div className='h-full flex flex-col gap-10 bg-blue-600'>

            <h2 className='text-center mt-10 text-3xl font-bold text-white'>
                EduAgentX
            </h2>


            <div className='w-full'>
                <ul className='flex flex-col gap-2 px-3'>
                    {
                        sideBarData.map((data) => (
                            <li className='rounded-md bg-white shadow border text-black cursor-pointer pl-3 border-white'>
                                <NavLink to={data.link}  className='inline-flex gap-3 py-3 w-full h-full' > {React.createElement(data.icon)} {data.name} </NavLink>
                            </li>
                        ))
                    }
                </ul>
            </div>


        </div>
    )
}

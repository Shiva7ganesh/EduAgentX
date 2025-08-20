import React, { useEffect, useState } from 'react'
import { Calendar, Users, UserCheck, UserX, TrendingUp, Filter } from 'lucide-react'
import StudentAttendanceTable from '../components/StudentAttendanceTable'
import Loading from '../components/Loading';

const StudentAttendance = () => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [studentData, setStudentData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/student-attendance?date=${date}`);
                const result = await response.json();
                setStudentData(result?.data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchDetails();
    }, [date]);

    // Calculate statistics
    const totalStudents = studentData?.length || 0;
    const presentStudents = studentData?.filter(student => student.isPresent === true)?.length || 0;
    const absentStudents = totalStudents - presentStudents;
    const attendanceRate = totalStudents > 0 ? ((presentStudents / totalStudents) * 100).toFixed(1) : 0;

    if(isLoading) return (
        <div className='w-full h-screen'>
            <Loading />
        </div>
    )

    return (
        <section className='w-full min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6'>
            {/* Header Section */}
            <div className='mb-8'>
                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                    <div>
                        <h1 className='text-3xl font-bold text-slate-800 mb-2'>Student Attendance</h1>
                        <p className='text-slate-600'>Monitor and track student attendance records</p>
                    </div>
                    
                    {/* Date Picker */}
                    <div className='flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-slate-200'>
                        <Calendar className='w-5 h-5 text-slate-500' />
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => {
                                setDate(e.target.value);
                                console.log(e.target.value)
                            }}
                            className='border-none outline-none text-slate-700 font-medium bg-transparent'
                        />
                    </div>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                {/* Total Students Card */}
                <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300'>
                    <div className='flex items-center justify-between mb-4'>
                        <div className='p-3 bg-blue-100 rounded-xl'>
                            <Users className='w-6 h-6 text-blue-600' />
                        </div>
                        <div className='text-right'>
                            <p className='text-2xl font-bold text-slate-800'>{totalStudents}</p>
                            <p className='text-sm text-slate-500'>Total Students</p>
                        </div>
                    </div>
                    <div className='h-2 bg-blue-100 rounded-full overflow-hidden'>
                        <div className='h-full bg-blue-500 rounded-full animate-pulse'></div>
                    </div>
                </div>

                {/* Present Students Card */}
                <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300'>
                    <div className='flex items-center justify-between mb-4'>
                        <div className='p-3 bg-green-100 rounded-xl'>
                            <UserCheck className='w-6 h-6 text-green-600' />
                        </div>
                        <div className='text-right'>
                            <p className='text-2xl font-bold text-slate-800'>{presentStudents}</p>
                            <p className='text-sm text-slate-500'>Present Today</p>
                        </div>
                    </div>
                    <div className='h-2 bg-green-100 rounded-full overflow-hidden'>
                        <div 
                            className='h-full bg-green-500 rounded-full transition-all duration-700'
                            style={{ width: `${totalStudents > 0 ? (presentStudents / totalStudents) * 100 : 0}%` }}
                        ></div>
                    </div>
                </div>

                {/* Absent Students Card */}
                <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300'>
                    <div className='flex items-center justify-between mb-4'>
                        <div className='p-3 bg-red-100 rounded-xl'>
                            <UserX className='w-6 h-6 text-red-600' />
                        </div>
                        <div className='text-right'>
                            <p className='text-2xl font-bold text-slate-800'>{absentStudents}</p>
                            <p className='text-sm text-slate-500'>Absent Today</p>
                        </div>
                    </div>
                    <div className='h-2 bg-red-100 rounded-full overflow-hidden'>
                        <div 
                            className='h-full bg-red-500 rounded-full transition-all duration-700'
                            style={{ width: `${totalStudents > 0 ? (absentStudents / totalStudents) * 100 : 0}%` }}
                        ></div>
                    </div>
                </div>

                {/* Attendance Rate Card */}
                <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300'>
                    <div className='flex items-center justify-between mb-4'>
                        <div className='p-3 bg-purple-100 rounded-xl'>
                            <TrendingUp className='w-6 h-6 text-purple-600' />
                        </div>
                        <div className='text-right'>
                            <p className='text-2xl font-bold text-slate-800'>{attendanceRate}%</p>
                            <p className='text-sm text-slate-500'>Attendance Rate</p>
                        </div>
                    </div>
                    <div className='h-2 bg-purple-100 rounded-full overflow-hidden'>
                        <div 
                            className='h-full bg-purple-500 rounded-full transition-all duration-700'
                            style={{ width: `${attendanceRate}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className='bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden'>
                <div className='p-6 border-b border-slate-100'>
                    <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                        <div>
                            <h3 className='text-xl font-semibold text-slate-800 mb-1'>Attendance Records</h3>
                            <p className='text-slate-500'>Detailed view of student attendance for {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                        
                        
                    </div>
                </div>
                
                <div className='overflow-x-auto'>
                    <StudentAttendanceTable studentData={studentData} />
                </div>
            </div>

            {/* Empty State */}
            {totalStudents === 0 && (
                <div className='text-center py-12'>
                    <Users className='w-16 h-16 text-slate-300 mx-auto mb-4' />
                    <h3 className='text-lg font-medium text-slate-600 mb-2'>No attendance records found</h3>
                    <p className='text-slate-500'>Try selecting a different date or check if data is available.</p>
                </div>
            )}
        </section>
    )
}

export default StudentAttendance
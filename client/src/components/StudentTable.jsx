import React, { useEffect, useState } from "react";
import { useRef } from "react";
import {toast} from 'react-hot-toast';

const StudentTable = () => {
  const [studentDetails, setStudentDetails] = useState([]);
  const [absentees, setAbsentees] = useState([]);
  const [showAbsentees, setShowAbsentees] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const formRef = useRef();

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/student-details",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setStudentDetails(result.studentData);
      setAbsentees(
        result.studentData.map((stud) => ({
          stdid: stud.studentId,
          attdate: selectedDate,
          isPresent: false,
        }))
      );
    };
    fetchDetails();
  }, [selectedDate]);

  // Update absentees when date changes
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    // Update all absentees records with the new date
    setAbsentees(prev => 
      prev.map(student => ({
        ...student,
        attdate: newDate
      }))
    );
  };

  const handleSubmit = async () => {
    setShowAbsentees(true);
  };

  const sendStudentDetails = async () => {
    try {
      // Submit attendance data to backend
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/submit-attendance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            attendanceData: absentees,
            date: selectedDate,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        if(result.status == 'success'){
          toast.success(result.message)
        }else{
          toast.error(result.message)
        }
      } else {
        console.error("Failed to submit attendance");
        alert("Failed to submit attendance. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
    } finally {
      setIsSubmitting(false);
      setShowAbsentees(false);
    }
  };

  const getAbsentStudents = () => {
    return absentees.filter((student) => !student.isPresent);
  };

  const getPresentStudents = () => {
    return absentees.filter((student) => student.isPresent);
  };

  return (
    <section className="min-h-screen relative bg-gray-100 p-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Mark Students Attendance
      </h1>

      {/* Date Picker */}
      <div className="w-full max-w-5xl mb-6">
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <label htmlFor="attendance-date" className="text-xl font-bold text-gray-800">
                Select Attendance Date
              </label>
            </div>
            
            <div className="relative">
              <input
                type="date"
                id="attendance-date"
                value={selectedDate}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => handleDateChange(e.target.value)}
                className="px-6 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-gray-700 text-lg font-medium bg-gray-50 hover:bg-white transition-all duration-200 cursor-pointer shadow-sm"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            
          </div>
          
          <div className="mt-4 flex justify-center">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-3 rounded-xl border border-blue-100">
              <p className="text-sm font-semibold text-gray-700">
                Selected Date: <span className="text-blue-600">{new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div ref={formRef} className="w-full max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl mb-8">
          {studentDetails.length > 0 ? (
            studentDetails.map((std) => (
              <div
                key={std.studentId}
                className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition duration-300 cursor-pointer"
              >
                <label
                  htmlFor={std.studentId}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      {std.studentName}
                    </h2>
                    <p className="text-sm text-gray-500">{std.studentId}</p>
                  </div>
                  <input
                    type="checkbox"
                    id={std.studentId}
                    className="w-5 h-5 accent-green-500"
                    onChange={(e) => {
                      setAbsentees((prev) =>
                        prev.map((student) =>
                          student.stdid === std.studentId
                            ? { ...student, isPresent: e.target.checked }
                            : student
                        )
                      );
                    }}
                  />
                </label>
              </div>
            ))
          ) : (
            <p className="text-gray-600 col-span-full text-center">
              No student found
            </p>
          )}
        </div>

        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
          >
            {isSubmitting ? "Submitting..." : "Submit Attendance"}
          </button>
        </div>
      </div>

      {/* Absentees Display Overlay */}
      {showAbsentees && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold text-2xl text-gray-800">
                Attendance Summary
              </h2>
              <button
                onClick={() => {
                  setShowAbsentees(false);
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg text-red-600 mb-3">
                  Absent Students ({getAbsentStudents().length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {getAbsentStudents().length > 0 ? (
                    getAbsentStudents().map((student) => (
                      <span
                        key={student.stdid}
                        className="inline-block text-white bg-red-500 rounded-full px-4 py-2 text-sm font-medium"
                      >
                        {student.stdid}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-600 italic">
                      All students are present!
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-green-600 mb-3">
                  Present Students ({getPresentStudents().length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {getPresentStudents().map((student) => (
                    <span
                      key={student.stdid}
                      className="inline-block text-white bg-green-500 rounded-full px-4 py-2 text-sm font-medium"
                    >
                      {student.stdid}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-sm text-gray-600 pt-4 border-t">
                <p>Date: {new Date(selectedDate).toLocaleDateString()}</p>
                <p>Total Students: {absentees.length}</p>
              </div>

              <div className="w-full flex items-center justify-center">
                <button
                  className="bg-blue-500 rounded px-16 py-2 text-white cursor-pointer"
                  onClick={() => {
                    sendStudentDetails();
                  }}
                >
                  Mark
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default StudentTable;
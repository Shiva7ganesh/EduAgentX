import React from 'react';
import { Mail, Calendar, CheckCircle, XCircle } from 'lucide-react';


const mockData= [
  { id: 1, email: 'john.doe@company.com', leaveStatus: 'approved', leaveType: 'Annual Leave', startDate: '2025-01-15', endDate: '2025-01-20' },
  { id: 2, email: 'jane.smith@company.com', leaveStatus: 'pending', leaveType: 'Sick Leave', startDate: '2025-01-18', endDate: '2025-01-19' },
  { id: 3, email: 'mike.johnson@company.com', leaveStatus: 'approved', leaveType: 'Personal Leave', startDate: '2025-01-22', endDate: '2025-01-25' },
  { id: 4, email: 'sarah.wilson@company.com', leaveStatus: 'denied', leaveType: 'Annual Leave', startDate: '2025-01-20', endDate: '2025-01-28' },
  { id: 5, email: 'david.brown@company.com', leaveStatus: 'approved', leaveType: 'Sick Leave', startDate: '2025-01-16', endDate: '2025-01-17' },
];

export default function ResultsTable({ isVisible }) {
  if (!isVisible) return null;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'denied':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Calendar className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'denied':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <div className="w-full animate-slideUp">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10 bg-[#007ACC]/10">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <Mail className="w-6 h-6 mr-2 text-[#007ACC]" />
            Processing Results
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {mockData.length} employees processed
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Employee Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Leave Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Duration</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((employee, index) => (
                <tr
                  key={employee.id}
                  className={`
                    transition-all duration-200 hover:bg-white/20
                    ${index % 2 === 0 ? 'bg-white/5' : 'bg-transparent'}
                    border-b border-gray-200/30
                  `}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-[#007ACC] mr-2" />
                      <span className="text-gray-800 font-medium">{employee.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-700">{employee.leaveType}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">
                      <div>{employee.startDate}</div>
                      <div className="text-xs text-gray-500">to {employee.endDate}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {getStatusIcon(employee.leaveStatus)}
                      <span className={`
                        ml-2 px-3 py-1 rounded-full text-xs font-medium border
                        ${getStatusColor(employee.leaveStatus)}
                      `}>
                        {employee.leaveStatus.charAt(0).toUpperCase() + employee.leaveStatus.slice(1)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 bg-gray-50/30 border-t border-gray-200/30">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Total: {mockData.length} records processed</span>
            <span>
              {mockData.filter(e => e.leaveStatus === 'approved').length} approved, 
              {mockData.filter(e => e.leaveStatus === 'pending').length} pending, 
              {mockData.filter(e => e.leaveStatus === 'denied').length} denied
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
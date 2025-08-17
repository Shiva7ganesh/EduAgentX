import React from 'react';
import { CheckCircle, Download } from 'lucide-react';


function ResultsTable({ isVisible }) {
  if (!isVisible) return null;

  const sampleResults = [
    { id: 1, task: 'Document Analysis', status: 'Completed', result: 'Summary Generated' },
    { id: 2, task: 'Data Extraction', status: 'Completed', result: 'Key Points Identified' },
    { id: 3, task: 'Report Generation', status: 'Completed', result: 'Final Report Ready' },
  ];

  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Processing Results</h3>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#007ACC] to-blue-600 text-white rounded-xl hover:from-[#005a99] hover:to-blue-700 transition-all duration-300">
          <Download className="w-4 h-4" />
          <span>Download Report</span>
        </button>
      </div>
      
      <div className="overflow-hidden rounded-xl border border-white/20">
        <table className="w-full">
          <thead>
            <tr className="bg-white/10">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Task</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Result</th>
            </tr>
          </thead>
          <tbody>
            {sampleResults.map((result, index) => (
              <tr key={result.id} className={`${index % 2 === 0 ? 'bg-white/5' : 'bg-white/10'}`}>
                <td className="px-6 py-4 text-sm text-gray-800">{result.task}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-800">{result.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">{result.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResultsTable;
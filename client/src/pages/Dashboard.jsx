import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function EmailDashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalemails: 100.0,
    leavemails: 50.0,
    feemails: 30.0,
    leaveapproved: 20.0,
    leaverejected: 30.0,
    feeextended: 10.0,
    feerejected: 20.0,
    datedash: "2025-08-15",
    Id: "DFAAF77B-BB79-F011-B481-0022489D4A06",
  });

  const others =
    dashboardData.totalemails -
    dashboardData.leavemails -
    dashboardData.feemails;

  const pieData = [
    { name: "Leave Mails", value: dashboardData.leavemails, color: "#2563eb" },
    { name: "Fee Mails", value: dashboardData.feemails, color: "#059669" },
    { name: "Others", value: others, color: "#dc2626" },
  ];

  const barData = [
    {
      category: "Leave Data",
      Accepted: dashboardData.leaveapproved,
      Rejected: dashboardData.leaverejected,
    },
    {
      category: "Fee Data",
      Extended: dashboardData.feeextended,
      Rejected: dashboardData.feerejected,
    },
  ];

  const fetchDashboardDetails = async() => {

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/dashboard-data`, {
        method : "GET",
        headers: {
          'Content-Type' : 'application/json',
        }
      })
      const result = await response.json();
      console.log(result)
      setDashboardData(result?.data?.value[0])
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    const interval = setInterval(() =>  fetchDashboardDetails(), 5000);
    fetchDashboardDetails();
    return () => {
      clearInterval(interval)
    }
   
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Email Dashboard
          </h1>
          <p className="text-slate-600 text-lg">
            Monitor and analyze your email communications
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-lg">
            <div className="text-center pb-2 pt-6 px-6">
              <h3 className="text-xl text-slate-700 font-semibold">
                Total Mails Received
              </h3>
            </div>
            <div className="text-center pt-2 pb-6 px-6">
              <div className="text-5xl font-bold text-blue-600 mb-2">
                {dashboardData.totalemails}
              </div>
              <div className="text-sm text-slate-500 uppercase tracking-wide">
                Messages
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm group rounded-lg">
            <div className="h-1 bg-blue-600 rounded-t-lg"></div>
            <div className="pb-2 pt-6 px-6">
              <h3 className="text-lg text-slate-700 font-semibold">
                Leave Mails
              </h3>
            </div>
            <div className="pt-2 pb-6 px-6">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {dashboardData.leavemails}
              </div>
              <div className="text-sm text-slate-500">Leave requests</div>
            </div>
          </div>

          <div className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm group rounded-lg">
            <div className="h-1 bg-emerald-600 rounded-t-lg"></div>
            <div className="pb-2 pt-6 px-6">
              <h3 className="text-lg text-slate-700 font-semibold">
                Fee Mails
              </h3>
            </div>
            <div className="pt-2 pb-6 px-6">
              <div className="text-3xl font-bold text-emerald-600 mb-1">
                {dashboardData.feemails}
              </div>
              <div className="text-sm text-slate-500">Fee inquiries</div>
            </div>
          </div>

          <div className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm group rounded-lg">
            <div className="h-1 bg-red-600 rounded-t-lg"></div>
            <div className="pb-2 pt-6 px-6">
              <h3 className="text-lg text-slate-700 font-semibold">Others</h3>
            </div>
            <div className="pt-2 pb-6 px-6">
              <div className="text-3xl font-bold text-red-600 mb-1">
                {others}
              </div>
              <div className="text-sm text-slate-500">Miscellaneous</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-slate-800">Leave Data</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-lg">
              <div className="h-1 bg-emerald-500 rounded-t-lg"></div>
              <div className="pb-2 pt-6 px-6">
                <h3 className="text-lg text-slate-700 font-semibold flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  Accepted
                </h3>
              </div>
              <div className="pt-2 pb-6 px-6">
                <div className="text-3xl font-bold text-emerald-600 mb-1">
                  {dashboardData.leaveapproved}
                </div>
                <div className="text-sm text-slate-500">Approved requests</div>
              </div>
            </div>

            <div className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-lg">
              <div className="h-1 bg-red-500 rounded-t-lg"></div>
              <div className="pb-2 pt-6 px-6">
                <h3 className="text-lg text-slate-700 font-semibold flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  Rejected
                </h3>
              </div>
              <div className="pt-2 pb-6 px-6">
                <div className="text-3xl font-bold text-red-600 mb-1">
                  {dashboardData.leaverejected}
                </div>
                <div className="text-sm text-slate-500">Declined requests</div>
              </div>
            </div>
          </div>
        </div>

        {/* Fee Data Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-emerald-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-slate-800">Fee Data</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-lg">
              <div className="h-1 bg-blue-500 rounded-t-lg"></div>
              <div className="pb-2 pt-6 px-6">
                <h3 className="text-lg text-slate-700 font-semibold flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  Extended
                </h3>
              </div>
              <div className="pt-2 pb-6 px-6">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {dashboardData.feeextended}
                </div>
                <div className="text-sm text-slate-500">Extended deadlines</div>
              </div>
            </div>

            <div className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-lg">
              <div className="h-1 bg-red-500 rounded-t-lg"></div>
              <div className="pb-2 pt-6 px-6">
                <h3 className="text-lg text-slate-700 font-semibold flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  Rejected
                </h3>
              </div>
              <div className="pt-2 pb-6 px-6">
                <div className="text-3xl font-bold text-red-600 mb-1">
                  {dashboardData.feerejected}
                </div>
                <div className="text-sm text-slate-500">Declined requests</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-slate-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-slate-800">
              Analytics Overview
            </h2>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Pie Chart */}
            <div className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-lg">
              <div className="pb-4 pt-6 px-6">
                <h3 className="text-xl text-slate-700 font-semibold">
                  Email Distribution
                </h3>
                <p className="text-sm text-slate-500">Breakdown by category</p>
              </div>
              <div className="px-6 pb-6">
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      strokeWidth={2}
                      stroke="#fff"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-lg">
              <div className="pb-4 pt-6 px-6">
                <h3 className="text-xl text-slate-700 font-semibold">
                  Status Comparison
                </h3>
                <p className="text-sm text-slate-500">
                  Approved vs rejected breakdown
                </p>
              </div>
              <div className="px-6 pb-6">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={barData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="category"
                      tick={{ fill: "#64748b", fontSize: 12 }}
                      axisLine={{ stroke: "#e2e8f0" }}
                    />
                    <YAxis
                      tick={{ fill: "#64748b", fontSize: 12 }}
                      axisLine={{ stroke: "#e2e8f0" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="Accepted"
                      fill="#059669"
                      name="Accepted"
                      radius={[2, 2, 0, 0]}
                    />
                    <Bar
                      dataKey="Rejected"
                      fill="#dc2626"
                      name="Rejected"
                      radius={[2, 2, 0, 0]}
                    />
                    <Bar
                      dataKey="Extended"
                      fill="#2563eb"
                      name="Extended"
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { TrendingUp, TrendingDown, Users, DollarSign, FileText, AlertCircle, Download, Filter } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const monthlyData = [
  { month: "Jan", disbursed: 850000, collected: 720000, applications: 245 },
  { month: "Feb", disbursed: 920000, collected: 780000, applications: 268 },
  { month: "Mar", disbursed: 1050000, collected: 850000, applications: 312 },
  { month: "Apr", disbursed: 1180000, collected: 920000, applications: 356 },
  { month: "May", disbursed: 1250000, collected: 1050000, applications: 389 },
  { month: "Jun", disbursed: 1420000, collected: 1180000, applications: 428 },
];

const loanTypeData = [
  { name: "Business Loans", value: 45, color: "#0A2540" },
  { name: "Personal Loans", value: 30, color: "#C9A227" },
  { name: "Equipment Loans", value: 15, color: "#16A34A" },
  { name: "Mortgages", value: 10, color: "#334155" },
];

const performanceData = [
  { metric: "Approval Rate", value: 94.5, target: 90, status: "up" },
  { metric: "Disbursement Time", value: 1.2, target: 2, status: "up", unit: "hours" },
  { metric: "Default Rate", value: 1.8, target: 2.5, status: "up", unit: "%" },
  { metric: "Customer Satisfaction", value: 98.2, target: 95, status: "up", unit: "%" },
];

const recentApplications = [
  { id: "APP-2426-1245", applicant: "Acme Corp", type: "Business", amount: 850000, status: "approved", date: "2 hours ago" },
  { id: "APP-2426-1244", applicant: "John Smith", type: "Personal", amount: 125000, status: "pending", date: "4 hours ago" },
  { id: "APP-2426-1243", applicant: "Tech Solutions", type: "Equipment", amount: 450000, status: "approved", date: "6 hours ago" },
  { id: "APP-2426-1242", applicant: "Jane Doe", type: "Personal", amount: 85000, status: "review", date: "8 hours ago" },
  { id: "APP-2426-1241", applicant: "Global Ventures", type: "Business", amount: 2500000, status: "approved", date: "12 hours ago" },
];

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-[#0A2540] mb-2">Admin Analytics Dashboard</h1>
            <p className="text-[#64748B]">Real-time insights and performance metrics</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white text-[#0A2540] rounded-lg hover:bg-[#F8FAFC] transition-all border border-[#E2E8F0]">
              <Filter className="w-5 h-5" />
              <span>Filter</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#0A2540] text-white rounded-lg hover:bg-[#0D2F52] transition-all">
              <Download className="w-5 h-5" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[#0A2540] to-[#0D2F52] text-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-[#16A34A] text-sm bg-white/20 px-2 py-1 rounded-full">
                <TrendingUp className="w-4 h-4" />
                <span>+18.5%</span>
              </div>
            </div>
            <div className="text-3xl font-semibold mb-1">$1.42M</div>
            <div className="text-sm text-white/80">Total Disbursed (MTD)</div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#C9A227]/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-[#C9A227]" />
              </div>
              <div className="flex items-center gap-1 text-[#16A34A] text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+12.3%</span>
              </div>
            </div>
            <div className="text-3xl font-semibold text-[#0A2540] mb-1">428</div>
            <div className="text-sm text-[#64748B]">New Applications</div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#16A34A]/10 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#16A34A]" />
              </div>
              <div className="flex items-center gap-1 text-[#16A34A] text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+4.2%</span>
              </div>
            </div>
            <div className="text-3xl font-semibold text-[#0A2540] mb-1">94.5%</div>
            <div className="text-sm text-[#64748B]">Approval Rate</div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#DC2626]/10 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-[#DC2626]" />
              </div>
              <div className="flex items-center gap-1 text-[#16A34A] text-sm">
                <TrendingDown className="w-4 h-4" />
                <span>-0.3%</span>
              </div>
            </div>
            <div className="text-3xl font-semibold text-[#0A2540] mb-1">1.8%</div>
            <div className="text-sm text-[#64748B]">Default Rate</div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Disbursement vs Collection */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-[#0A2540] mb-1">Disbursement vs Collection</h3>
                <p className="text-sm text-[#64748B]">Monthly trends (USD)</p>
              </div>
              <button className="text-[#0A2540] p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorDisbursed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0A2540" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0A2540" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C9A227" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#C9A227" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" style={{ fontSize: '12px' }} />
                <YAxis stroke="#64748B" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(value) => `$${Number(value).toLocaleString()}`}
                />
                <Legend />
                <Area type="monotone" dataKey="disbursed" stroke="#0A2540" strokeWidth={2} fillOpacity={1} fill="url(#colorDisbursed)" name="Disbursed" />
                <Area type="monotone" dataKey="collected" stroke="#C9A227" strokeWidth={2} fillOpacity={1} fill="url(#colorCollected)" name="Collected" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Loan Distribution */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0]">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#0A2540] mb-1">Loan Distribution</h3>
              <p className="text-sm text-[#64748B]">By loan type</p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={loanTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {loanTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {loanTypeData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-[#64748B]">{item.name}</span>
                  </div>
                  <span className="font-medium text-[#0A2540]">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Application Trends */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0]">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#0A2540] mb-1">Application Trends</h3>
              <p className="text-sm text-[#64748B]">Monthly application volume</p>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" style={{ fontSize: '12px' }} />
                <YAxis stroke="#64748B" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Bar dataKey="applications" fill="#0A2540" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0]">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#0A2540] mb-1">Performance Metrics</h3>
              <p className="text-sm text-[#64748B]">Current vs Target</p>
            </div>
            <div className="space-y-6">
              {performanceData.map((metric, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#0A2540]">{metric.metric}</span>
                    <span className="text-sm font-semibold text-[#0A2540]">
                      {metric.value}{metric.unit || "%"}
                    </span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#C9A227] to-[#B89120] h-2 rounded-full transition-all"
                      style={{ width: `${(metric.value / metric.target) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-[#64748B]">Target: {metric.target}{metric.unit || "%"}</span>
                    <div className="flex items-center gap-1 text-xs text-[#16A34A]">
                      <TrendingUp className="w-3 h-3" />
                      <span>On Track</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Applications Table */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-[#0A2540] mb-1">Recent Applications</h3>
              <p className="text-sm text-[#64748B]">Latest loan requests</p>
            </div>
            <button className="text-[#0A2540] text-sm hover:text-[#C9A227] transition-colors">View All</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E2E8F0]">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-[#0A2540]">Application ID</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-[#0A2540]">Applicant</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-[#0A2540]">Type</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-[#0A2540]">Amount</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-[#0A2540]">Status</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-[#0A2540]">Submitted</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-[#0A2540]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((app) => (
                  <tr key={app.id} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-4 px-4 text-sm text-[#0A2540] font-medium">{app.id}</td>
                    <td className="py-4 px-4 text-sm text-[#64748B]">{app.applicant}</td>
                    <td className="py-4 px-4 text-sm text-[#64748B]">{app.type}</td>
                    <td className="py-4 px-4 text-sm text-[#64748B]">${app.amount.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${
                          app.status === "approved"
                            ? "bg-[#16A34A]/10 text-[#16A34A]"
                            : app.status === "pending"
                            ? "bg-[#C9A227]/10 text-[#C9A227]"
                            : "bg-[#64748B]/10 text-[#64748B]"
                        }`}
                      >
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-[#64748B]">{app.date}</td>
                    <td className="py-4 px-4">
                      <button className="text-[#0A2540] hover:text-[#C9A227] text-sm font-medium transition-colors">
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

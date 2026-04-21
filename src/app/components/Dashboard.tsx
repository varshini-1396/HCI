import { Link } from "react-router";
import {
  ChevronRight,
  Download,
  Calendar,
  DollarSign,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  CircleDollarSign,
  MessageSquare,
  XCircle
} from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const emiProgressData = [
  { month: "Jan", paid: 58500, pending: 41500 },
  { month: "Feb", paid: 62000, pending: 38000 },
  { month: "Mar", paid: 65200, pending: 34800 },
  { month: "Apr", paid: 68800, pending: 31200 },
  { month: "May", paid: 72100, pending: 27900 },
  { month: "Jun", paid: 75600, pending: 24400 },
];

const recentTransactions = [
  { id: "TXN2401245", date: "Apr 18, 2026", description: "EMI Payment - Business Loan", amount: -28500, status: "success" },
  { id: "TXN2401230", date: "Apr 15, 2026", description: "EMI Payment - Personal Loan", amount: -12800, status: "success" },
  { id: "TXN2401215", date: "Apr 10, 2026", description: "Part Payment - Equipment Loan", amount: -50000, status: "success" },
  { id: "TXN2401198", date: "Apr 05, 2026", description: "Processing Fee Refund", amount: 2500, status: "success" },
  { id: "TXN2401180", date: "Apr 02, 2026", description: "EMI Payment - Equipment Loan", amount: -21700, status: "success" },
];

export function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto px-6 lg:px-12 max-w-[1400px] py-8">
          <div className="bg-gradient-to-r from-[#0A2540] to-[#0D2F52] rounded-xl p-8 text-white mb-8 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, Rajesh!</h1>
                <p className="text-white/80 text-lg">Here's your financial overview for April 2026</p>
              </div>
              <div className="mt-4 md:mt-0 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-xs text-white/70">Active Loans</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-xs text-white/70">On-time Payments</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">805</div>
                  <div className="text-xs text-white/70">Credit Score</div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics - Section 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Outstanding Loan Amount */}
            <div className="bg-white rounded-xl p-6 border border-[#E5E7EB] shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-[#0A2540]/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-[#0A2540]" />
                </div>
                <span className="text-xs text-[#64748B] bg-[#F8FAFC] px-2 py-1 rounded">Total</span>
              </div>
              <div className="text-3xl font-bold text-[#0A2540] mb-2">₹91,31,000</div>
              <div className="text-sm text-[#64748B] mb-3">Outstanding Loan Amount</div>
              <div className="flex items-center gap-2 text-sm">
                <ArrowDownRight className="w-4 h-4 text-[#16A34A]" />
                <span className="text-[#16A34A] font-medium">12% reduction this quarter</span>
              </div>
            </div>

            {/* Next EMI Due */}
            <div className="bg-white rounded-xl p-6 border border-[#E5E7EB] shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-[#0A2540]/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-[#0A2540]" />
                </div>
                <span className="text-xs text-[#16A34A] bg-[#16A34A]/10 px-2 py-1 rounded font-medium">Due in 5 days</span>
              </div>
              <div className="text-3xl font-bold text-[#0A2540] mb-2">Jun 25, 2026</div>
              <div className="text-sm text-[#64748B] mb-3">Next EMI Due Date</div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[#0A2540] font-medium">Amount: ₹63,000</span>
              </div>
            </div>

            {/* Credit Score */}
            <div className="bg-white rounded-xl p-6 border border-[#E5E7EB] shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-[#16A34A]/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[#16A34A]" />
                </div>
                <span className="text-xs text-[#16A34A] bg-[#16A34A]/10 px-2 py-1 rounded font-medium">Excellent</span>
              </div>
              <div className="text-3xl font-bold text-[#16A34A] mb-2">805</div>
              <div className="text-sm text-[#64748B] mb-3">Credit Score</div>
              <div className="flex items-center gap-2 text-sm">
                <ArrowUpRight className="w-4 h-4 text-[#16A34A]" />
                <span className="text-[#16A34A] font-medium">+85 points from last year</span>
              </div>
            </div>
          </div>

          {/* Quick Actions - Section 3 */}
          <div className="bg-white rounded-xl p-6 border border-[#E5E7EB] shadow-sm mb-8">
            <h2 className="text-lg font-bold text-[#0A2540] mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                to="/repayment"
                className="group flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#0A2540] to-[#0D2F52] text-white rounded-xl hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <CircleDollarSign className="w-6 h-6" />
                </div>
                <span className="font-bold text-center">Pay EMI</span>
                <span className="text-xs text-white/70 mt-1">Make payment</span>
              </Link>

              <button className="group flex flex-col items-center justify-center p-6 bg-[#F8FAFC] hover:bg-white border-2 border-[#E5E7EB] hover:border-[#0A2540] rounded-xl transition-all">
                <div className="w-12 h-12 bg-[#0A2540]/10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Download className="w-6 h-6 text-[#0A2540]" />
                </div>
                <span className="font-bold text-[#0A2540] text-center">Download Statement</span>
                <span className="text-xs text-[#64748B] mt-1">View records</span>
              </button>

              <button className="group flex flex-col items-center justify-center p-6 bg-[#F8FAFC] hover:bg-white border-2 border-[#E5E7EB] hover:border-[#0A2540] rounded-xl transition-all">
                <div className="w-12 h-12 bg-[#0A2540]/10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <XCircle className="w-6 h-6 text-[#0A2540]" />
                </div>
                <span className="font-bold text-[#0A2540] text-center">Foreclose Loan</span>
                <span className="text-xs text-[#64748B] mt-1">Close account</span>
              </button>

              <Link
                to="/support"
                className="group flex flex-col items-center justify-center p-6 bg-[#F8FAFC] hover:bg-white border-2 border-[#E5E7EB] hover:border-[#0A2540] rounded-xl transition-all"
              >
                <div className="w-12 h-12 bg-[#0A2540]/10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6 text-[#0A2540]" />
                </div>
                <span className="font-bold text-[#0A2540] text-center">Raise Request</span>
                <span className="text-xs text-[#64748B] mt-1">Get support</span>
              </Link>
            </div>
          </div>

          {/* Recent Transactions & EMI Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Recent Transactions - Section 4 */}
            <div className="bg-white rounded-xl p-6 border border-[#E5E7EB] shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[#0A2540]">Recent Transactions</h2>
                <button className="text-sm text-[#0A2540] font-medium hover:underline flex items-center gap-1">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {recentTransactions.map((txn) => (
                  <div
                    key={txn.id}
                    className="flex items-center justify-between p-4 rounded-lg hover:bg-[#F8FAFC] transition-colors border border-[#E5E7EB]"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        txn.amount > 0 ? "bg-[#16A34A]/10" : "bg-[#0A2540]/10"
                      }`}>
                        {txn.amount > 0 ? (
                          <ArrowDownRight className="w-5 h-5 text-[#16A34A]" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 text-[#0A2540]" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-[#0A2540] text-sm">{txn.description}</div>
                        <div className="text-xs text-[#64748B]">{txn.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${txn.amount > 0 ? "text-[#16A34A]" : "text-[#0A2540]"}`}>
                        {txn.amount > 0 ? "+" : ""}₹{Math.abs(txn.amount).toLocaleString('en-IN')}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-[#16A34A] justify-end mt-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Success</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* EMI Repayment Progress - Section 5 */}
            <div className="bg-white rounded-xl p-6 border border-[#E5E7EB] shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-[#0A2540]">EMI Repayment Progress</h2>
                  <p className="text-sm text-[#64748B]">Last 6 months</p>
                </div>
                <button className="text-[#0A2540] p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors">
                  <Download className="w-5 h-5" />
                </button>
              </div>

              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={emiProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis
                    dataKey="month"
                    stroke="#64748B"
                    style={{ fontSize: '12px' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#64748B"
                    style={{ fontSize: '12px' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                    formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`}
                  />
                  <Bar dataKey="paid" stackId="a" fill="#16A34A" radius={[0, 0, 4, 4]} name="Paid" />
                  <Bar dataKey="pending" stackId="a" fill="#E5E7EB" radius={[4, 4, 0, 0]} name="Pending" />
                </BarChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-[#E5E7EB]">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#16A34A] rounded"></div>
                  <div>
                    <div className="text-xs text-[#64748B]">Total Paid</div>
                    <div className="font-bold text-[#0A2540]">₹4,02,700</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#E5E7EB] rounded"></div>
                  <div>
                    <div className="text-xs text-[#64748B]">Remaining</div>
                    <div className="font-bold text-[#0A2540]">₹1,97,800</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Loans Overview */}
          <div className="bg-white rounded-xl p-6 border border-[#E5E7EB] shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-[#0A2540]">Active Loans</h2>
              <Link
                to="/loan-application"
                className="text-sm text-[#0A2540] font-medium hover:underline flex items-center gap-1"
              >
                View Details
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E5E7EB]">
                    <th className="text-left py-4 px-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Loan ID</th>
                    <th className="text-left py-4 px-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Type</th>
                    <th className="text-left py-4 px-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Amount</th>
                    <th className="text-left py-4 px-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Outstanding</th>
                    <th className="text-left py-4 px-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">EMI</th>
                    <th className="text-left py-4 px-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#E5E7EB] hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-bold text-[#0A2540] text-sm">NF-2024-001</div>
                      <div className="text-xs text-[#64748B]">Business</div>
                    </td>
                    <td className="py-4 px-4 text-sm text-[#64748B]">Business Loan</td>
                    <td className="py-4 px-4 text-sm font-medium text-[#0A2540]">₹85,00,000</td>
                    <td className="py-4 px-4 text-sm font-medium text-[#0A2540]">₹62,54,000</td>
                    <td className="py-4 px-4 text-sm text-[#64748B]">₹28,500</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-[#16A34A]/10 text-[#16A34A] font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        Active
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB] hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-bold text-[#0A2540] text-sm">NF-2024-002</div>
                      <div className="text-xs text-[#64748B]">Personal</div>
                    </td>
                    <td className="py-4 px-4 text-sm text-[#64748B]">Personal Loan</td>
                    <td className="py-4 px-4 text-sm font-medium text-[#0A2540]">₹12,50,000</td>
                    <td className="py-4 px-4 text-sm font-medium text-[#0A2540]">₹8,92,000</td>
                    <td className="py-4 px-4 text-sm text-[#64748B]">₹12,800</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-[#16A34A]/10 text-[#16A34A] font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        Active
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-bold text-[#0A2540] text-sm">NF-2023-087</div>
                      <div className="text-xs text-[#64748B]">Equipment</div>
                    </td>
                    <td className="py-4 px-4 text-sm text-[#64748B]">Equipment Loan</td>
                    <td className="py-4 px-4 text-sm font-medium text-[#0A2540]">₹45,00,000</td>
                    <td className="py-4 px-4 text-sm font-medium text-[#0A2540]">₹19,85,000</td>
                    <td className="py-4 px-4 text-sm text-[#64748B]">₹21,700</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-[#16A34A]/10 text-[#16A34A] font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        Active
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router";
import {
  User,
  CreditCard,
  Bell,
  HelpCircle,
  Settings,
  Shield,
  Mail,
  Phone,
  Edit,
  CheckCircle2,
  Clock,
  Download,
  Calendar,
  DollarSign,
} from "lucide-react";

export function Profile() {
  const [activeSection, setActiveSection] = useState("profile");

  const sidebarItems = [
    { id: "profile", name: "My Profile", icon: User },
    { id: "loans", name: "My Loans", icon: CreditCard },
    { id: "reminders", name: "Payment Reminders", icon: Bell },
    { id: "help", name: "Help & Support", icon: HelpCircle },
    { id: "settings", name: "Account Settings", icon: Settings },
  ];

  const loans = [
    {
      id: "NF-2024-001",
      type: "Business Loan",
      amount: 3500000,
      outstanding: 2185000,
      emi: 28500,
      nextDue: "Jun 25, 2026",
      status: "active",
    },
    {
      id: "NF-2024-002",
      type: "Personal Loan",
      amount: 800000,
      outstanding: 460000,
      emi: 12800,
      nextDue: "Jun 25, 2026",
      status: "active",
    },
    {
      id: "NF-2023-087",
      type: "Equipment Loan",
      amount: 4500000,
      outstanding: 1985000,
      emi: 21700,
      nextDue: "Jun 25, 2026",
      status: "active",
    },
  ];

  const reminders = [
    {
      id: 1,
      title: "EMI Payment Due",
      description: "Your EMI of ₹63,000 is due on Jun 25, 2026",
      date: "Jun 25, 2026",
      type: "payment",
      priority: "high",
    },
    {
      id: 2,
      title: "Document Renewal",
      description: "Update your address proof document",
      date: "Jul 15, 2026",
      type: "document",
      priority: "medium",
    },
    {
      id: 3,
      title: "Credit Score Update",
      description: "Your credit score has been updated to 805",
      date: "Apr 20, 2026",
      type: "notification",
      priority: "low",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto px-6 lg:px-12 max-w-[1400px] py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl border-2 border-[#E5E7EB] overflow-hidden sticky top-24">
              {/* User Info */}
              <div className="p-6 bg-gradient-to-br from-[#0A2540] to-[#0D2F52] text-white">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[#0A2540] text-2xl font-bold mb-3">
                    RK
                  </div>
                  <h3 className="text-xl font-bold mb-1">Rajesh Kumar</h3>
                  <p className="text-sm text-blue-200 mb-3">
                    rajesh.kumar@email.com
                  </p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs">
                      Premium Member
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="p-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                        isActive
                          ? "bg-[#0A2540] text-white"
                          : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0A2540]"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Quick Stats */}
              <div className="p-4 border-t border-[#E5E7EB]">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-900">
                      Credit Score
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-green-900">805</div>
                  <div className="text-xs text-green-700">Excellent</div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {activeSection === "profile" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl text-[#0A2540]">My Profile</h1>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#0A2540] text-white rounded-lg hover:bg-[#0D2F52] transition-all">
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </button>
                </div>

                {/* Personal Information */}
                <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
                  <h2 className="text-xl text-[#0A2540] mb-6 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-[#64748B] mb-1 block">
                        Full Name
                      </label>
                      <div className="text-[#0A2540] font-medium">
                        Rajesh Kumar
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-[#64748B] mb-1 block">
                        Date of Birth
                      </label>
                      <div className="text-[#0A2540] font-medium">
                        March 15, 1985
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-[#64748B] mb-1 block">
                        PAN Number
                      </label>
                      <div className="text-[#0A2540] font-medium">
                        ABCDE1234F
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-[#64748B] mb-1 block">
                        Aadhaar Number
                      </label>
                      <div className="text-[#0A2540] font-medium">
                        •••• •••• 4567
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
                  <h2 className="text-xl text-[#0A2540] mb-6 flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Contact Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-[#64748B] mb-1 block">
                        Email Address
                      </label>
                      <div className="text-[#0A2540] font-medium flex items-center gap-2">
                        rajesh.kumar@email.com
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-[#64748B] mb-1 block">
                        Phone Number
                      </label>
                      <div className="text-[#0A2540] font-medium flex items-center gap-2">
                        +91 98765 43210
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm text-[#64748B] mb-1 block">
                        Address
                      </label>
                      <div className="text-[#0A2540] font-medium">
                        123 MG Road, Bengaluru, Karnataka 560001
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Security */}
                <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
                  <h2 className="text-xl text-[#0A2540] mb-6 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Account Security
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
                      <div>
                        <div className="text-[#0A2540] font-medium mb-1">
                          Password
                        </div>
                        <div className="text-sm text-[#64748B]">
                          Last changed 2 months ago
                        </div>
                      </div>
                      <button className="px-4 py-2 text-[#0A2540] border-2 border-[#E5E7EB] rounded-lg hover:border-[#0A2540] transition-all">
                        Change
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
                      <div>
                        <div className="text-[#0A2540] font-medium mb-1">
                          Two-Factor Authentication
                        </div>
                        <div className="text-sm text-[#64748B]">
                          Add extra security to your account
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-[#0A2540] text-white rounded-lg hover:bg-[#0D2F52] transition-all">
                        Enable
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "loans" && (
              <div className="space-y-6">
                <h1 className="text-3xl text-[#0A2540]">My Loans</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="text-sm text-[#64748B]">Active Loans</div>
                    </div>
                    <div className="text-3xl font-bold text-[#0A2540]">3</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="text-sm text-[#64748B]">
                        Total Outstanding
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-[#0A2540]">
                      ₹46.3L
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="text-sm text-[#64748B]">Next EMI Due</div>
                    </div>
                    <div className="text-3xl font-bold text-[#0A2540]">
                      Jun 25
                    </div>
                  </div>
                </div>

                {/* Loan Cards */}
                <div className="space-y-4">
                  {loans.map((loan) => (
                    <div
                      key={loan.id}
                      className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB] hover:border-[#0A2540] transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl text-[#0A2540] font-bold">
                              {loan.type}
                            </h3>
                            <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                              Active
                            </span>
                          </div>
                          <div className="text-sm text-[#64748B]">
                            Loan ID: {loan.id}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            to="/repayment"
                            className="px-4 py-2 bg-[#0A2540] text-white rounded-lg hover:bg-[#0D2F52] transition-all text-sm"
                          >
                            Pay EMI
                          </Link>
                          <button className="px-4 py-2 border-2 border-[#E5E7EB] text-[#0A2540] rounded-lg hover:border-[#0A2540] transition-all text-sm">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-xs text-[#64748B] mb-1">
                            Loan Amount
                          </div>
                          <div className="text-[#0A2540] font-bold">
                            ₹{(loan.amount / 100000).toFixed(1)}L
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-[#64748B] mb-1">
                            Outstanding
                          </div>
                          <div className="text-[#0A2540] font-bold">
                            ₹{(loan.outstanding / 100000).toFixed(1)}L
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-[#64748B] mb-1">
                            Monthly EMI
                          </div>
                          <div className="text-[#0A2540] font-bold">
                            ₹{loan.emi.toLocaleString("en-IN")}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-[#64748B] mb-1">
                            Next Due Date
                          </div>
                          <div className="text-[#0A2540] font-bold">
                            {loan.nextDue}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "reminders" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl text-[#0A2540]">Payment Reminders</h1>
                  <button className="px-4 py-2 bg-[#0A2540] text-white rounded-lg hover:bg-[#0D2F52] transition-all">
                    Add Reminder
                  </button>
                </div>

                <div className="space-y-4">
                  {reminders.map((reminder) => (
                    <div
                      key={reminder.id}
                      className={`bg-white rounded-xl p-6 border-2 transition-all ${
                        reminder.priority === "high"
                          ? "border-red-200 bg-red-50/30"
                          : reminder.priority === "medium"
                          ? "border-yellow-200 bg-yellow-50/30"
                          : "border-[#E5E7EB]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              reminder.type === "payment"
                                ? "bg-red-100"
                                : reminder.type === "document"
                                ? "bg-yellow-100"
                                : "bg-blue-100"
                            }`}
                          >
                            {reminder.type === "payment" ? (
                              <DollarSign
                                className={`w-6 h-6 ${
                                  reminder.priority === "high"
                                    ? "text-red-600"
                                    : "text-red-500"
                                }`}
                              />
                            ) : reminder.type === "document" ? (
                              <Clock className="w-6 h-6 text-yellow-600" />
                            ) : (
                              <Bell className="w-6 h-6 text-blue-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-[#0A2540] mb-1">
                              {reminder.title}
                            </h3>
                            <p className="text-[#64748B] mb-2">
                              {reminder.description}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-[#64748B]">
                              <Calendar className="w-4 h-4" />
                              {reminder.date}
                            </div>
                          </div>
                        </div>
                        {reminder.priority === "high" && (
                          <Link
                            to="/repayment"
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all text-sm"
                          >
                            Pay Now
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "help" && (
              <div className="space-y-6">
                <h1 className="text-3xl text-[#0A2540]">Help & Support</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Link
                    to="/support"
                    className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB] hover:border-[#0A2540] transition-all"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <HelpCircle className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0A2540] mb-2">
                      FAQ
                    </h3>
                    <p className="text-sm text-[#64748B]">
                      Find answers to commonly asked questions
                    </p>
                  </Link>
                  <Link
                    to="/support"
                    className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB] hover:border-[#0A2540] transition-all"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0A2540] mb-2">
                      Call Support
                    </h3>
                    <p className="text-sm text-[#64748B]">
                      Speak with our support team 24/7
                    </p>
                  </Link>
                  <Link
                    to="/support"
                    className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB] hover:border-[#0A2540] transition-all"
                  >
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <Mail className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0A2540] mb-2">
                      Email Us
                    </h3>
                    <p className="text-sm text-[#64748B]">
                      Get response within 4-6 hours
                    </p>
                  </Link>
                </div>
              </div>
            )}

            {activeSection === "settings" && (
              <div className="space-y-6">
                <h1 className="text-3xl text-[#0A2540]">Account Settings</h1>

                <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
                  <h2 className="text-xl text-[#0A2540] mb-6">Preferences</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
                      <div>
                        <div className="text-[#0A2540] font-medium mb-1">
                          Email Notifications
                        </div>
                        <div className="text-sm text-[#64748B]">
                          Receive updates via email
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-14 h-7 bg-[#E5E7EB] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
                      <div>
                        <div className="text-[#0A2540] font-medium mb-1">
                          SMS Alerts
                        </div>
                        <div className="text-sm text-[#64748B]">
                          Get payment reminders via SMS
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-14 h-7 bg-[#E5E7EB] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

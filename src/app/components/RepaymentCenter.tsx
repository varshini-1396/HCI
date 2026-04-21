import { useState } from "react";
import { CreditCard, Building2, Smartphone, Check, Calendar, AlertCircle, Clock, Download, Shield, CheckCircle2, XCircle, Play, FileText, DollarSign, Zap } from "lucide-react";

export function RepaymentCenter() {
  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [selectedLoan, setSelectedLoan] = useState("NF-2024-001");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [autoPayEnabled, setAutoPayEnabled] = useState(false);

  const currentDue = 63000;
  const dueDate = "Jun 25, 2026";
  const daysUntilDue = 5;
  const isOverdue = false;
  const penaltyAmount = 0;

  const paymentMethods = [
    { id: "upi", name: "UPI", icon: Smartphone, description: "Pay using UPI ID or QR", recommended: true },
    { id: "netbanking", name: "Net Banking", icon: Building2, description: "Pay via your bank account" },
    { id: "card", name: "Debit/Credit Card", icon: CreditCard, description: "Visa, Mastercard, RuPay" },
  ];

  const paymentHistory = [
    { id: 1, date: "May 25, 2026", loanId: "NF-2024-001", amount: 63000, status: "success", method: "UPI", transactionId: "TXN240525001" },
    { id: 2, date: "Apr 25, 2026", loanId: "NF-2024-001", amount: 63000, status: "success", method: "Net Banking", transactionId: "TXN240425001" },
    { id: 3, date: "Mar 25, 2026", loanId: "NF-2024-001", amount: 63000, status: "success", method: "Debit Card", transactionId: "TXN240325001" },
    { id: 4, date: "Feb 25, 2026", loanId: "NF-2024-001", amount: 63000, status: "success", method: "UPI", transactionId: "TXN240225001" },
    { id: 5, date: "Jan 25, 2026", loanId: "NF-2024-001", amount: 63000, status: "success", method: "UPI", transactionId: "TXN240125001" },
  ];

  const handlePayNow = () => {
    setShowConfirmDialog(true);
  };

  const confirmPayment = () => {
    setShowConfirmDialog(false);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setShowReceipt(true);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="mx-auto px-6 lg:px-12 max-w-[1400px]">
        {/* Header with Security Badge */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-8 h-8 text-[#16A34A]" />
            <div>
              <h1 className="text-3xl font-bold text-[#0A2540]">Repayment Center</h1>
              <p className="text-sm text-[#64748B]">Secure payment gateway with 256-bit SSL encryption</p>
            </div>
          </div>
        </div>

        {/* Top Summary - 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Current Due EMI */}
          <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#64748B]">Current Due EMI</span>
              <DollarSign className="w-5 h-5 text-[#0A2540]" />
            </div>
            <div className="text-3xl font-bold text-[#0A2540] mb-1">₹{currentDue.toLocaleString('en-IN')}</div>
            <div className="text-xs text-[#64748B]">Loan ID: {selectedLoan}</div>
          </div>

          {/* Due Date */}
          <div className={`rounded-xl p-6 border-2 shadow-sm ${
            isOverdue
              ? "bg-red-50 border-red-200"
              : daysUntilDue <= 7
              ? "bg-orange-50 border-orange-200"
              : "bg-white border-[#E5E7EB]"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#64748B]">Due Date</span>
              <Calendar className={`w-5 h-5 ${isOverdue ? "text-red-600" : "text-[#0A2540]"}`} />
            </div>
            <div className={`text-2xl font-bold mb-1 ${isOverdue ? "text-red-600" : "text-[#0A2540]"}`}>
              {dueDate}
            </div>
            <div className={`text-xs font-medium ${isOverdue ? "text-red-600" : daysUntilDue <= 7 ? "text-orange-600" : "text-[#16A34A]"}`}>
              {isOverdue ? "OVERDUE!" : `${daysUntilDue} days remaining`}
            </div>
          </div>

          {/* Penalty Status */}
          <div className={`rounded-xl p-6 border-2 shadow-sm ${
            penaltyAmount > 0 ? "bg-red-50 border-red-200" : "bg-[#16A34A]/5 border-[#16A34A]/30"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#64748B]">Penalty Status</span>
              {penaltyAmount > 0 ? (
                <AlertCircle className="w-5 h-5 text-red-600" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
              )}
            </div>
            <div className={`text-3xl font-bold mb-1 ${penaltyAmount > 0 ? "text-red-600" : "text-[#16A34A]"}`}>
              {penaltyAmount > 0 ? `₹${penaltyAmount}` : "₹0"}
            </div>
            <div className={`text-xs font-medium ${penaltyAmount > 0 ? "text-red-600" : "text-[#16A34A]"}`}>
              {penaltyAmount > 0 ? "Penalty charges" : "No penalties"}
            </div>
          </div>

          {/* AutoPay Status */}
          <div className={`rounded-xl p-6 border-2 shadow-sm ${
            autoPayEnabled ? "bg-blue-50 border-blue-200" : "bg-white border-[#E5E7EB]"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#64748B]">AutoPay Status</span>
              <Zap className={`w-5 h-5 ${autoPayEnabled ? "text-blue-600" : "text-[#64748B]"}`} />
            </div>
            <div className={`text-2xl font-bold mb-2 ${autoPayEnabled ? "text-blue-600" : "text-[#64748B]"}`}>
              {autoPayEnabled ? "Active" : "Inactive"}
            </div>
            <button
              onClick={() => setAutoPayEnabled(!autoPayEnabled)}
              className={`text-xs font-medium ${autoPayEnabled ? "text-blue-600" : "text-[#0A2540]"} hover:underline`}
            >
              {autoPayEnabled ? "Disable" : "Enable Now"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 border border-[#E5E7EB] shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-[#0A2540] mb-6">Payment Options</h2>

              {/* Payment Methods */}
              <div className="space-y-4 mb-8">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  const isSelected = selectedMethod === method.id;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`w-full p-5 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? "border-[#0A2540] bg-[#0A2540]/5 shadow-md"
                          : "border-[#E5E7EB] hover:border-[#0A2540]/50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          isSelected ? "bg-[#0A2540]" : "bg-[#F8FAFC]"
                        }`}>
                          <Icon className={`w-6 h-6 ${isSelected ? "text-white" : "text-[#64748B]"}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`font-bold ${isSelected ? "text-[#0A2540]" : "text-[#64748B]"}`}>
                              {method.name}
                            </span>
                            {method.recommended && (
                              <span className="px-2 py-1 bg-[#16A34A]/10 text-[#16A34A] text-xs font-medium rounded-full">
                                Recommended
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-[#64748B] mt-1">{method.description}</div>
                        </div>
                        {isSelected && <CheckCircle2 className="w-6 h-6 text-[#16A34A]" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* UPI Details */}
              {selectedMethod === "upi" && (
                <div className="bg-[#F8FAFC] rounded-xl p-6 mb-8 border border-[#E5E7EB]">
                  <label className="block text-sm font-bold text-[#0A2540] mb-3">Enter UPI ID</label>
                  <input
                    type="text"
                    placeholder="yourname@upi"
                    className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2540] focus:border-transparent"
                  />
                </div>
              )}

              {/* Net Banking Details */}
              {selectedMethod === "netbanking" && (
                <div className="bg-[#F8FAFC] rounded-xl p-6 mb-8 border border-[#E5E7EB]">
                  <label className="block text-sm font-bold text-[#0A2540] mb-3">Select Your Bank</label>
                  <select className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2540] focus:border-transparent">
                    <option>State Bank of India</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                    <option>Kotak Mahindra Bank</option>
                  </select>
                </div>
              )}

              {/* Card Details */}
              {selectedMethod === "card" && (
                <div className="bg-[#F8FAFC] rounded-xl p-6 mb-8 border border-[#E5E7EB]">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-[#0A2540] mb-2">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2540] focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-[#0A2540] mb-2">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2540] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-[#0A2540] mb-2">CVV</label>
                        <input
                          type="password"
                          placeholder="123"
                          maxLength={3}
                          className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2540] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Main CTA - Pay Now */}
              <button
                onClick={handlePayNow}
                className="w-full py-5 bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white rounded-xl hover:from-[#15803D] hover:to-[#16A34A] transition-all shadow-xl font-bold text-lg flex items-center justify-center gap-3"
              >
                <Shield className="w-6 h-6" />
                Pay ₹{currentDue.toLocaleString('en-IN')} Securely
              </button>

              {/* Security Note */}
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[#64748B]">
                <Shield className="w-4 h-4 text-[#16A34A]" />
                <span>Your payment is secured with 256-bit SSL encryption</span>
              </div>
            </div>

            {/* Secondary Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border-2 border-[#E5E7EB] hover:border-[#0A2540] transition-all group">
                <DollarSign className="w-8 h-8 text-[#0A2540] mb-3 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-[#0A2540] mb-1">Part Payment</span>
                <span className="text-xs text-[#64748B] text-center">Pay any amount you wish</span>
              </button>

              <button className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border-2 border-[#E5E7EB] hover:border-[#0A2540] transition-all group">
                <FileText className="w-8 h-8 text-[#0A2540] mb-3 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-[#0A2540] mb-1">Foreclosure Quote</span>
                <span className="text-xs text-[#64748B] text-center">Close your loan early</span>
              </button>

              <button className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border-2 border-[#E5E7EB] hover:border-[#0A2540] transition-all group">
                <Download className="w-8 h-8 text-[#0A2540] mb-3 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-[#0A2540] mb-1">Download Schedule</span>
                <span className="text-xs text-[#64748B] text-center">View payment calendar</span>
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#0A2540] to-[#0D2F52] rounded-2xl p-6 text-white mb-6 sticky top-24">
              <h3 className="text-lg font-bold mb-4">Payment Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-white/20">
                  <span className="text-white/80">EMI Amount</span>
                  <span className="font-bold">₹{currentDue.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-white/20">
                  <span className="text-white/80">Late Fee</span>
                  <span className="font-bold text-[#16A34A]">₹0</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-white/20">
                  <span className="text-white/80">Processing Fee</span>
                  <span className="font-bold text-[#16A34A]">₹0</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="font-bold">Total Payable</span>
                  <span className="text-2xl font-bold">₹{currentDue.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="text-sm text-white/80 mb-2">Next EMI after this:</div>
                <div className="font-bold">Jul 25, 2026</div>
                <div className="text-sm text-white/80 mt-1">₹{currentDue.toLocaleString('en-IN')}</div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-[#0A2540] mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                Enable AutoPay
              </h3>
              <p className="text-sm text-[#64748B] mb-4 leading-relaxed">
                Never miss a payment! Auto-deduct EMI from your account on due date.
              </p>
              <button
                onClick={() => setAutoPayEnabled(!autoPayEnabled)}
                className={`w-full py-3 rounded-lg font-medium transition-all ${
                  autoPayEnabled
                    ? "bg-[#16A34A] text-white"
                    : "bg-[#0A2540] text-white hover:bg-[#0D2F52]"
                }`}
              >
                {autoPayEnabled ? "AutoPay Enabled ✓" : "Setup AutoPay"}
              </button>
            </div>
          </div>
        </div>

        {/* Payment History Section */}
        <div className="mt-12">
          <div className="bg-white rounded-2xl p-8 border border-[#E5E7EB] shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#0A2540]">Payment History</h2>
              <button className="flex items-center gap-2 px-4 py-2 text-[#0A2540] hover:bg-[#F8FAFC] rounded-lg transition-colors">
                <Download className="w-5 h-5" />
                <span className="text-sm font-medium">Download Statement</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-[#E5E7EB]">
                    <th className="text-left py-4 px-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Date</th>
                    <th className="text-left py-4 px-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Transaction ID</th>
                    <th className="text-left py-4 px-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Amount</th>
                    <th className="text-left py-4 px-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Method</th>
                    <th className="text-left py-4 px-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Status</th>
                    <th className="text-left py-4 px-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment) => (
                    <tr key={payment.id} className="border-b border-[#E5E7EB] hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-medium text-[#0A2540]">{payment.date}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-[#64748B] font-mono">{payment.transactionId}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-[#0A2540]">₹{payment.amount.toLocaleString('en-IN')}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-[#64748B]">{payment.method}</div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#16A34A]/10 text-[#16A34A]">
                          <CheckCircle2 className="w-3 h-3" />
                          Success
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button className="text-[#0A2540] hover:text-[#0D2F52] font-medium text-sm">
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Confirmation Dialog */}
        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#0A2540] mb-2">Confirm Payment</h3>
                <p className="text-[#64748B]">Please review your payment details before proceeding</p>
              </div>

              <div className="bg-[#F8FAFC] rounded-xl p-6 mb-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B]">Amount</span>
                  <span className="font-bold text-[#0A2540]">₹{currentDue.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B]">Payment Method</span>
                  <span className="font-medium text-[#0A2540]">{paymentMethods.find(m => m.id === selectedMethod)?.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B]">Loan ID</span>
                  <span className="font-medium text-[#0A2540]">{selectedLoan}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  className="flex-1 py-3 px-6 bg-[#F8FAFC] text-[#0A2540] rounded-lg hover:bg-[#E5E7EB] transition-all font-medium border border-[#E5E7EB]"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmPayment}
                  className="flex-1 py-3 px-6 bg-[#16A34A] text-white rounded-lg hover:bg-[#15803D] transition-all font-bold"
                >
                  Confirm & Pay
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Processing Dialog */}
        {isProcessing && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center">
              <div className="w-16 h-16 border-4 border-[#0A2540] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <h3 className="text-2xl font-bold text-[#0A2540] mb-2">Processing Payment...</h3>
              <p className="text-[#64748B]">Please wait while we securely process your transaction</p>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[#64748B]">
                <Shield className="w-4 h-4 text-[#16A34A]" />
                <span>Secured with SSL encryption</span>
              </div>
            </div>
          </div>
        )}

        {/* Receipt Dialog */}
        {showReceipt && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#16A34A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-[#16A34A]" />
                </div>
                <h3 className="text-2xl font-bold text-[#16A34A] mb-2">Payment Successful!</h3>
                <p className="text-[#64748B]">Your EMI payment has been processed successfully</p>
              </div>

              <div className="bg-[#F8FAFC] rounded-xl p-6 mb-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B]">Amount Paid</span>
                  <span className="font-bold text-[#16A34A]">₹{currentDue.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B]">Transaction ID</span>
                  <span className="font-medium text-[#0A2540] font-mono text-sm">TXN240620001</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B]">Date & Time</span>
                  <span className="font-medium text-[#0A2540]">Jun 20, 2026 14:35</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B]">Payment Method</span>
                  <span className="font-medium text-[#0A2540]">{paymentMethods.find(m => m.id === selectedMethod)?.name}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-3 px-6 bg-[#F8FAFC] text-[#0A2540] rounded-lg hover:bg-[#E5E7EB] transition-all font-medium border border-[#E5E7EB] flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Receipt
                </button>
                <button
                  onClick={() => setShowReceipt(false)}
                  className="flex-1 py-3 px-6 bg-[#0A2540] text-white rounded-lg hover:bg-[#0D2F52] transition-all font-bold"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

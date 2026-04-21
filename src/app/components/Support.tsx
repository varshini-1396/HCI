import { useState } from "react";
import {
  Search,
  CreditCard,
  FileText,
  Smartphone,
  DollarSign,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Phone,
  Mail,
  Clock,
  X,
  Send,
  Bot,
  Headphones,
} from "lucide-react";

export function Support() {
  const [searchQuery, setSearchQuery] = useState("");
  const [ticketId, setTicketId] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      type: "bot",
      message: "Hi! I'm here to help you. How can I assist you today?",
      time: new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [chatInput, setChatInput] = useState("");

  const popularIssues = [
    {
      icon: CreditCard,
      title: "EMI Failed",
      description: "Payment failed or bounced",
      color: "text-red-600",
      bgColor: "bg-red-50",
      link: "#emi-failed",
    },
    {
      icon: FileText,
      title: "Need Statement",
      description: "Download loan statement",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      link: "#statement",
    },
    {
      icon: Smartphone,
      title: "Update Mobile",
      description: "Change registered number",
      color: "text-green-600",
      bgColor: "bg-green-50",
      link: "#update-mobile",
    },
    {
      icon: DollarSign,
      title: "Loan Closure",
      description: "Foreclose your loan",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      link: "#loan-closure",
    },
    {
      icon: RefreshCw,
      title: "Refund Status",
      description: "Track your refund",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      link: "#refund",
    },
  ];

  const faqs = [
    {
      question: "How do I check my EMI due date?",
      answer:
        "You can check your EMI due date by logging into your dashboard and navigating to the 'My Loans' section. Your next due date is displayed prominently on your loan card. You can also download your repayment schedule from the Repayment Center.",
    },
    {
      question: "What happens if I miss an EMI payment?",
      answer:
        "If you miss an EMI payment, a late payment fee of ₹500 will be charged. Additionally, this may impact your credit score. We recommend setting up AutoPay to avoid missing payments. If you're facing financial difficulties, please contact our support team immediately to discuss alternative arrangements.",
    },
    {
      question: "How can I prepay my loan?",
      answer:
        "You can prepay your loan partially or fully by visiting the Repayment Center. Click on 'Part Payment' for partial prepayment or 'Foreclosure Quote' for full closure. Note that prepayment charges may apply based on your loan agreement. You'll receive an instant quote before confirming the payment.",
    },
    {
      question: "How do I update my contact details?",
      answer:
        "To update your mobile number, email, or address, go to Dashboard → Profile Settings → Contact Information. For mobile number changes, you'll need to verify the new number via OTP. For security reasons, PAN and Aadhaar details cannot be modified online.",
    },
    {
      question: "What documents do I need for a loan application?",
      answer:
        "For salaried individuals: PAN card, Aadhaar card, last 3 months' salary slips, and 6 months' bank statements. For self-employed: PAN card, Aadhaar card, business proof, ITR for last 2 years, and bank statements for 12 months. All documents can be uploaded directly during the application process.",
    },
    {
      question: "How long does loan approval take?",
      answer:
        "Loan approval typically takes 24-48 hours after all documents are submitted and verified. In some cases, instant approval is available for eligible customers. You'll receive SMS and email notifications at each stage of the approval process.",
    },
    {
      question: "Can I increase my loan amount after approval?",
      answer:
        "Yes, you can apply for a top-up loan after completing at least 6 EMI payments on your current loan with a good repayment track record. The top-up amount will be subject to fresh eligibility assessment based on your current income and credit profile.",
    },
    {
      question: "How do I download my loan statement?",
      answer:
        "Login to your dashboard, go to 'My Loans', select the loan account, and click 'Download Statement'. You can choose the date range and format (PDF or Excel). Statements are generated instantly and sent to your registered email as well.",
    },
  ];

  const contactOptions = [
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with our support team",
      availability: "Available 24x7",
      action: "Start Chat",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
    },
    {
      icon: Phone,
      title: "Request Call Back",
      description: "We'll call you within 30 mins",
      availability: "9 AM - 9 PM, All days",
      action: "Request Call",
      color: "bg-green-600",
      hoverColor: "hover:bg-green-700",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "support@neofinance.in",
      availability: "Response in 4-6 hours",
      action: "Send Email",
      color: "bg-purple-600",
      hoverColor: "hover:bg-purple-700",
    },
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;

    const newMessage = {
      type: "user",
      message: chatInput,
      time: new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChatMessages([...chatMessages, newMessage]);
    setChatInput("");

    setTimeout(() => {
      const botResponse = {
        type: "bot",
        message:
          "Thank you for your message. Our support team will assist you shortly. In the meantime, you can check our FAQ section above for instant answers to common questions.",
        time: new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setChatMessages((prev) => [...prev, botResponse]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0A2540] to-[#0D2F52] text-white">
        <div className="mx-auto px-6 lg:px-12 max-w-[1400px] py-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Headphones className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl mb-4">
              How can we help you today?
            </h1>
            <p className="text-blue-100 text-lg mb-8">
              We're here to help. Search our knowledge base or reach out to our
              support team.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
              <input
                type="text"
                placeholder="Search help articles, FAQs, or enter keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-white/20 bg-white text-[#0A2540] placeholder:text-[#64748B] focus:outline-none focus:border-white shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto px-6 lg:px-12 max-w-[1400px] py-12">
        {/* Popular Issues */}
        <section className="mb-16">
          <h2 className="text-2xl mb-6 text-[#0A2540]">Popular Issues</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {popularIssues.map((issue, index) => {
              const Icon = issue.icon;
              return (
                <button
                  key={index}
                  className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB] hover:border-[#0A2540] hover:shadow-lg transition-all text-left group"
                >
                  <div
                    className={`w-12 h-12 ${issue.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`w-6 h-6 ${issue.color}`} />
                  </div>
                  <h3 className="text-[#0A2540] mb-1">{issue.title}</h3>
                  <p className="text-sm text-[#64748B]">{issue.description}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Ticket Tracker */}
        <section className="mb-16">
          <div className="bg-white rounded-xl p-8 border-2 border-[#E5E7EB] shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl text-[#0A2540] mb-2">
                  Track Your Support Ticket
                </h2>
                <p className="text-[#64748B]">
                  Enter your request ID to check the status of your support
                  ticket
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter Request ID (e.g., REQ202600123)"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border-2 border-[#E5E7EB] focus:outline-none focus:border-[#0A2540]"
              />
              <button className="px-8 py-3 bg-[#0A2540] text-white rounded-lg hover:bg-[#0D2F52] transition-colors">
                Track Status
              </button>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="mb-16">
          <h2 className="text-2xl mb-6 text-[#0A2540]">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isExpanded = expandedFAQ === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border-2 border-[#E5E7EB] overflow-hidden hover:border-[#0A2540]/30 transition-all"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#F8FAFC] transition-colors"
                  >
                    <span className="text-[#0A2540] pr-4">{faq.question}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-[#64748B] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#64748B] flex-shrink-0" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="px-6 pb-5 pt-2 border-t border-[#E5E7EB] bg-[#F8FAFC]">
                      <p className="text-[#64748B] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact Options */}
        <section className="mb-16">
          <h2 className="text-2xl mb-6 text-[#0A2540]">Other Ways to Reach Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB] hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-12 h-12 ${option.color} rounded-lg flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#0A2540] mb-1">{option.title}</h3>
                      <p className="text-sm text-[#64748B] mb-1">
                        {option.description}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <Clock className="w-3 h-3" />
                        <span>{option.availability}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    className={`w-full py-2.5 ${option.color} ${option.hoverColor} text-white rounded-lg transition-colors`}
                  >
                    {option.action}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Additional Help Section */}
        <section>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 border-2 border-blue-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h2 className="text-2xl text-[#0A2540] mb-2">
                  Still need help?
                </h2>
                <p className="text-[#64748B]">
                  Our dedicated support team is available to assist you with any
                  questions or concerns.
                </p>
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-3 bg-white text-[#0A2540] border-2 border-[#0A2540] rounded-lg hover:bg-[#F8FAFC] transition-colors">
                  Browse All Articles
                </button>
                <button className="px-6 py-3 bg-[#0A2540] text-white rounded-lg hover:bg-[#0D2F52] transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Floating AI Chat Assistant */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group z-40"
          aria-label="Open AI Chat Assistant"
        >
          <Bot className="w-8 h-8" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>
      )}

      {chatOpen && (
        <div className="fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl border-2 border-[#E5E7EB] overflow-hidden z-40 flex flex-col max-h-[600px]">
          {/* Chat Header */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-medium">AI Assistant</h3>
                <div className="flex items-center gap-1 text-xs text-blue-100">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="hover:bg-white/20 p-1 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-[#F8FAFC]">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] ${
                    msg.type === "user"
                      ? "bg-[#0A2540] text-white"
                      : "bg-white text-[#0A2540] border border-[#E5E7EB]"
                  } rounded-2xl px-4 py-3`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <span
                    className={`text-xs mt-1 block ${
                      msg.type === "user" ? "text-blue-200" : "text-[#64748B]"
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-[#E5E7EB] bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendChatMessage()}
                className="flex-1 px-4 py-2 rounded-lg border-2 border-[#E5E7EB] focus:outline-none focus:border-[#0A2540] text-sm"
              />
              <button
                onClick={sendChatMessage}
                className="px-4 py-2 bg-[#0A2540] text-white rounded-lg hover:bg-[#0D2F52] transition-colors"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

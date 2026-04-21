import { useState } from "react";
import { ChevronRight, ChevronLeft, Check, User, Briefcase, FileCheck, Shield, Clock, CheckCircle2, Edit2, Save, AlertCircle } from "lucide-react";

export function LoanApplication() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    pan: "",
    email: "",
    city: "",
    monthlyIncome: "",
    employmentType: "",
    companyName: "",
    loanAmount: 500000,
    tenure: 36,
  });

  const [validation, setValidation] = useState({
    fullName: true,
    phone: true,
    pan: true,
    email: true,
    city: true,
    monthlyIncome: true,
    employmentType: true,
    companyName: true,
  });

  const steps = [
    { number: 1, title: "Personal Details", icon: User },
    { number: 2, title: "Income & Eligibility", icon: Briefcase },
    { number: 3, title: "Review & Submit", icon: FileCheck },
  ];

  const validateField = (field: string, value: string) => {
    switch (field) {
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case "phone":
        return /^[6-9]\d{9}$/.test(value);
      case "pan":
        return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value);
      default:
        return value.trim().length > 0;
    }
  };

  const handleFieldChange = (field: string, value: string | number) => {
    setFormData({ ...formData, [field]: value });
    if (typeof value === "string") {
      setValidation({ ...validation, [field]: validateField(field, value) });
    }
  };

  const calculateEligibility = () => {
    const income = Number(formData.monthlyIncome) || 0;
    const maxLoan = income * 60;
    const requestedLoan = formData.loanAmount;

    if (income === 0) return 0;
    if (requestedLoan <= maxLoan * 0.5) return 95;
    if (requestedLoan <= maxLoan * 0.7) return 80;
    if (requestedLoan <= maxLoan) return 65;
    return 40;
  };

  const calculateEMI = () => {
    const rate = 10.5 / 12 / 100;
    const emi = (formData.loanAmount * rate * Math.pow(1 + rate, formData.tenure)) / (Math.pow(1 + rate, formData.tenure) - 1);
    return Math.round(emi);
  };

  const eligibilityScore = calculateEligibility();

  const canProceedStep1 = () => {
    return (
      formData.fullName &&
      formData.phone &&
      formData.pan &&
      formData.email &&
      formData.city &&
      validation.fullName &&
      validation.phone &&
      validation.pan &&
      validation.email &&
      validation.city
    );
  };

  const canProceedStep2 = () => {
    return (
      formData.monthlyIncome &&
      formData.employmentType &&
      formData.companyName &&
      validation.monthlyIncome &&
      validation.employmentType &&
      validation.companyName
    );
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSaveDraft = () => {
    alert("Application saved as draft! You can continue anytime.");
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Application submitted successfully! You'll receive approval status within 5 minutes via SMS and Email.");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white py-12">
      <div className="mx-auto px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#16A34A]/10 rounded-full mb-4">
            <Shield className="w-4 h-4 text-[#16A34A]" />
            <span className="text-sm text-[#16A34A] font-medium">100% Secure & Confidential</span>
          </div>
          <h1 className="text-4xl font-bold text-[#0A2540] mb-3">Loan Application</h1>
          <p className="text-lg text-[#64748B]">Complete your application in 3 simple steps</p>
          <div className="flex items-center justify-center gap-2 mt-3 text-sm text-[#64748B]">
            <Clock className="w-4 h-4" />
            <span>Approval in as little as 5 minutes</span>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-10">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = currentStep > step.number;
              const isCurrent = currentStep === step.number;

              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-all mb-3 shadow-md ${
                        isCompleted
                          ? "bg-[#16A34A] text-white scale-100"
                          : isCurrent
                          ? "bg-[#0A2540] text-white scale-110"
                          : "bg-white border-2 border-[#E5E7EB] text-[#94A3B8]"
                      }`}
                    >
                      {isCompleted ? <Check className="w-7 h-7" /> : <Icon className="w-7 h-7" />}
                    </div>
                    <div className={`text-sm font-bold text-center ${isCurrent ? "text-[#0A2540]" : "text-[#64748B]"}`}>
                      Step {step.number}
                    </div>
                    <div className={`text-xs text-center mt-1 ${isCurrent ? "text-[#0A2540]" : "text-[#94A3B8]"}`}>
                      {step.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-1 flex-1 -mt-12 rounded-full transition-all ${
                      isCompleted ? "bg-[#16A34A]" : "bg-[#E5E7EB]"
                    }`}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-[#E5E7EB]">
          <div className="p-8 lg:p-12">
            {/* Step 1: Personal Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#0A2540] mb-2">Personal Details</h2>
                  <p className="text-[#64748B]">Please provide your basic information</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[#0A2540] mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleFieldChange("fullName", e.target.value)}
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                        !validation.fullName && formData.fullName
                          ? "border-red-500 focus:ring-2 focus:ring-red-500"
                          : validation.fullName && formData.fullName
                          ? "border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]"
                          : "border-[#E5E7EB] focus:ring-2 focus:ring-[#0A2540]"
                      }`}
                    />
                    {formData.fullName && validation.fullName && (
                      <div className="flex items-center gap-1 mt-2 text-sm text-[#16A34A]">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Looks good!</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#0A2540] mb-2">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleFieldChange("phone", e.target.value)}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                        !validation.phone && formData.phone
                          ? "border-red-500 focus:ring-2 focus:ring-red-500"
                          : validation.phone && formData.phone
                          ? "border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]"
                          : "border-[#E5E7EB] focus:ring-2 focus:ring-[#0A2540]"
                      }`}
                    />
                    {!validation.phone && formData.phone && (
                      <div className="flex items-center gap-1 mt-2 text-sm text-red-500">
                        <AlertCircle className="w-4 h-4" />
                        <span>Please enter a valid 10-digit mobile number</span>
                      </div>
                    )}
                    {formData.phone && validation.phone && (
                      <div className="flex items-center gap-1 mt-2 text-sm text-[#16A34A]">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Verified!</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#0A2540] mb-2">
                      PAN Card Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.pan}
                      onChange={(e) => handleFieldChange("pan", e.target.value.toUpperCase())}
                      placeholder="ABCDE1234F"
                      maxLength={10}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all uppercase ${
                        !validation.pan && formData.pan
                          ? "border-red-500 focus:ring-2 focus:ring-red-500"
                          : validation.pan && formData.pan
                          ? "border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]"
                          : "border-[#E5E7EB] focus:ring-2 focus:ring-[#0A2540]"
                      }`}
                    />
                    {!validation.pan && formData.pan && (
                      <div className="flex items-center gap-1 mt-2 text-sm text-red-500">
                        <AlertCircle className="w-4 h-4" />
                        <span>Invalid PAN format. Example: ABCDE1234F</span>
                      </div>
                    )}
                    {formData.pan && validation.pan && (
                      <div className="flex items-center gap-1 mt-2 text-sm text-[#16A34A]">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Valid PAN</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#0A2540] mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleFieldChange("email", e.target.value)}
                      placeholder="your@email.com"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                        !validation.email && formData.email
                          ? "border-red-500 focus:ring-2 focus:ring-red-500"
                          : validation.email && formData.email
                          ? "border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]"
                          : "border-[#E5E7EB] focus:ring-2 focus:ring-[#0A2540]"
                      }`}
                    />
                    {!validation.email && formData.email && (
                      <div className="flex items-center gap-1 mt-2 text-sm text-red-500">
                        <AlertCircle className="w-4 h-4" />
                        <span>Please enter a valid email address</span>
                      </div>
                    )}
                    {formData.email && validation.email && (
                      <div className="flex items-center gap-1 mt-2 text-sm text-[#16A34A]">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Valid email</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#0A2540] mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => handleFieldChange("city", e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                      formData.city
                        ? "border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]"
                        : "border-[#E5E7EB] focus:ring-2 focus:ring-[#0A2540]"
                    }`}
                  >
                    <option value="">Select your city</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Pune">Pune</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                  </select>
                </div>

                <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E5E7EB]">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#0A2540] mt-0.5" />
                    <div className="text-sm text-[#64748B]">
                      <span className="font-bold text-[#0A2540]">Your data is safe.</span> We use bank-grade 256-bit encryption to protect your personal information. We will never share your details with third parties.
                    </div>
                  </div>
                </div>
              </div>
            )}

          {/* Step 2: Income & Eligibility */}
          {currentStep === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#0A2540] mb-2">Income & Eligibility</h2>
                  <p className="text-[#64748B]">Help us understand your financial situation</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[#0A2540] mb-2">
                      Monthly Income (₹) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.monthlyIncome}
                      onChange={(e) => handleFieldChange("monthlyIncome", e.target.value)}
                      placeholder="Enter monthly income"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                        formData.monthlyIncome && validation.monthlyIncome
                          ? "border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]"
                          : "border-[#E5E7EB] focus:ring-2 focus:ring-[#0A2540]"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#0A2540] mb-2">
                      Employment Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.employmentType}
                      onChange={(e) => handleFieldChange("employmentType", e.target.value)}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                        formData.employmentType && validation.employmentType
                          ? "border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]"
                          : "border-[#E5E7EB] focus:ring-2 focus:ring-[#0A2540]"
                      }`}
                    >
                      <option value="">Select employment type</option>
                      <option value="Salaried">Salaried</option>
                      <option value="Self-Employed">Self-Employed</option>
                      <option value="Business Owner">Business Owner</option>
                      <option value="Professional">Professional</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#0A2540] mb-2">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleFieldChange("companyName", e.target.value)}
                    placeholder="Enter company/business name"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                      formData.companyName && validation.companyName
                        ? "border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]"
                        : "border-[#E5E7EB] focus:ring-2 focus:ring-[#0A2540]"
                    }`}
                  />
                </div>

                <div>
                  <label className="flex items-center justify-between text-sm font-bold text-[#0A2540] mb-3">
                    <span>Loan Amount</span>
                    <span className="text-xl text-[#0A2540]">₹{formData.loanAmount.toLocaleString('en-IN')}</span>
                  </label>
                  <input
                    type="range"
                    min="100000"
                    max="5000000"
                    step="50000"
                    value={formData.loanAmount}
                    onChange={(e) => handleFieldChange("loanAmount", Number(e.target.value))}
                    className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#0A2540]"
                  />
                  <div className="flex justify-between text-xs text-[#64748B] mt-2">
                    <span>₹1L</span>
                    <span>₹50L</span>
                  </div>
                </div>

                <div>
                  <label className="flex items-center justify-between text-sm font-bold text-[#0A2540] mb-3">
                    <span>Loan Tenure</span>
                    <span className="text-xl text-[#0A2540]">{formData.tenure} months</span>
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {[12, 24, 36, 48, 60].map((months) => (
                      <button
                        key={months}
                        onClick={() => handleFieldChange("tenure", months)}
                        className={`py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                          formData.tenure === months
                            ? "bg-[#0A2540] border-[#0A2540] text-white"
                            : "bg-white border-[#E5E7EB] text-[#64748B] hover:border-[#0A2540]"
                        }`}
                      >
                        {months}m
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E5E7EB]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#64748B]">Monthly EMI</span>
                    <span className="text-2xl font-bold text-[#0A2540]">₹{calculateEMI().toLocaleString('en-IN')}</span>
                  </div>
                  <div className="text-xs text-[#64748B]">
                    @ 10.5% p.a. for {formData.tenure} months
                  </div>
                </div>
              </div>

              {/* Live Eligibility Meter */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-[#0A2540] to-[#0D2F52] rounded-xl p-6 text-white sticky top-24">
                  <h3 className="text-lg font-bold mb-4">Eligibility Meter</h3>

                  <div className="relative pt-1 mb-6">
                    <div className="flex mb-2 items-center justify-between">
                      <div className="text-sm">Approval Probability</div>
                      <div className="text-2xl font-bold">{eligibilityScore}%</div>
                    </div>
                    <div className="overflow-hidden h-4 text-xs flex rounded-full bg-white/20">
                      <div
                        style={{ width: `${eligibilityScore}%` }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ${
                          eligibilityScore >= 80
                            ? "bg-[#16A34A]"
                            : eligibilityScore >= 60
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/80">Income Check</span>
                      {formData.monthlyIncome ? (
                        <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-white/40"></div>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/80">Employment</span>
                      {formData.employmentType ? (
                        <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-white/40"></div>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/80">Loan-to-Income</span>
                      {eligibilityScore >= 65 ? (
                        <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-white/40"></div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/20">
                    {eligibilityScore >= 80 ? (
                      <div className="bg-[#16A34A]/20 rounded-lg p-4 border border-[#16A34A]/30">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                          <span className="font-bold">Excellent!</span>
                        </div>
                        <p className="text-xs text-white/90">
                          You have high chances of approval with best interest rates.
                        </p>
                      </div>
                    ) : eligibilityScore >= 60 ? (
                      <div className="bg-yellow-500/20 rounded-lg p-4 border border-yellow-500/30">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="w-5 h-5 text-yellow-500" />
                          <span className="font-bold">Good Chance</span>
                        </div>
                        <p className="text-xs text-white/90">
                          Consider adjusting loan amount for better approval odds.
                        </p>
                      </div>
                    ) : (
                      <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                        <p className="text-xs text-white/80">
                          Fill in all details to check your eligibility score
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review & Submit */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#0A2540] mb-2">Review & Submit</h2>
                <p className="text-[#64748B]">Please review your application details before submission</p>
              </div>

              {/* Personal Details Summary */}
              <div className="bg-white rounded-xl border-2 border-[#E5E7EB] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#0A2540] flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Details
                  </h3>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-[#0A2540] hover:text-[#0D2F52] flex items-center gap-1 text-sm font-medium"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-[#64748B] mb-1">Full Name</div>
                    <div className="font-medium text-[#0A2540]">{formData.fullName || "-"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#64748B] mb-1">Mobile Number</div>
                    <div className="font-medium text-[#0A2540]">{formData.phone || "-"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#64748B] mb-1">PAN Card</div>
                    <div className="font-medium text-[#0A2540]">{formData.pan || "-"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#64748B] mb-1">Email</div>
                    <div className="font-medium text-[#0A2540]">{formData.email || "-"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#64748B] mb-1">City</div>
                    <div className="font-medium text-[#0A2540]">{formData.city || "-"}</div>
                  </div>
                </div>
              </div>

              {/* Income & Loan Details Summary */}
              <div className="bg-white rounded-xl border-2 border-[#E5E7EB] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#0A2540] flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Income & Loan Details
                  </h3>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-[#0A2540] hover:text-[#0D2F52] flex items-center gap-1 text-sm font-medium"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-[#64748B] mb-1">Monthly Income</div>
                    <div className="font-medium text-[#0A2540]">₹{formData.monthlyIncome ? Number(formData.monthlyIncome).toLocaleString('en-IN') : "-"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#64748B] mb-1">Employment Type</div>
                    <div className="font-medium text-[#0A2540]">{formData.employmentType || "-"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#64748B] mb-1">Company Name</div>
                    <div className="font-medium text-[#0A2540]">{formData.companyName || "-"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#64748B] mb-1">Loan Amount</div>
                    <div className="font-medium text-[#0A2540]">₹{formData.loanAmount.toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#64748B] mb-1">Tenure</div>
                    <div className="font-medium text-[#0A2540]">{formData.tenure} months</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#64748B] mb-1">Monthly EMI</div>
                    <div className="font-medium text-[#16A34A]">₹{calculateEMI().toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>

              {/* Loan Summary */}
              <div className="bg-gradient-to-br from-[#0A2540] to-[#0D2F52] rounded-xl p-6 text-white">
                <h3 className="text-lg font-bold mb-4">Loan Summary</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-white/20">
                    <span className="text-white/80">Loan Amount</span>
                    <span className="text-xl font-bold">₹{formData.loanAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/20">
                    <span className="text-white/80">Interest Rate</span>
                    <span className="text-xl font-bold">10.5% p.a.</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/20">
                    <span className="text-white/80">Tenure</span>
                    <span className="text-xl font-bold">{formData.tenure} months</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/20">
                    <span className="text-white/80">Monthly EMI</span>
                    <span className="text-xl font-bold">₹{calculateEMI().toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-white/80">Total Payable</span>
                    <span className="text-2xl font-bold">₹{(calculateEMI() * formData.tenure).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E5E7EB]">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 w-5 h-5 accent-[#0A2540]"
                  />
                  <div className="flex-1">
                    <label htmlFor="terms" className="text-sm text-[#64748B] cursor-pointer leading-relaxed">
                      I agree to the <a href="#" className="text-[#0A2540] font-medium hover:underline">Terms & Conditions</a> and <a href="#" className="text-[#0A2540] font-medium hover:underline">Privacy Policy</a>. I authorize NeoFinance Pro to verify my details and credit bureau information for processing this loan application.
                    </label>
                  </div>
                </div>
              </div>

              {/* Important Note */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-900">
                    <span className="font-bold block mb-1">Important:</span>
                    After submission, you'll receive an approval decision within 5 minutes via SMS and email. Our team will contact you within 24 hours for document verification and disbursement.
                  </div>
                </div>
              </div>
            </div>
          )}

          </div>

          {/* Navigation Buttons */}
          <div className="bg-[#F8FAFC] px-8 lg:px-12 py-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  currentStep === 1
                    ? "text-[#94A3B8] cursor-not-allowed bg-white border border-[#E5E7EB]"
                    : "text-[#0A2540] bg-white border border-[#E5E7EB] hover:border-[#0A2540]"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>

              <button
                onClick={handleSaveDraft}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-[#0A2540] bg-white border border-[#E5E7EB] hover:border-[#0A2540] transition-all"
              >
                <Save className="w-5 h-5" />
                <span className="hidden sm:inline">Save Draft</span>
              </button>
            </div>

            <div className="w-full sm:w-auto">
              {currentStep < 3 ? (
                <button
                  onClick={handleNext}
                  disabled={currentStep === 1 ? !canProceedStep1() : !canProceedStep2()}
                  className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-medium transition-all ${
                    (currentStep === 1 && !canProceedStep1()) || (currentStep === 2 && !canProceedStep2())
                      ? "bg-[#94A3B8] text-white cursor-not-allowed"
                      : "bg-[#0A2540] text-white hover:bg-[#0D2F52] shadow-lg"
                  }`}
                >
                  Next Step
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white rounded-lg hover:from-[#15803D] hover:to-[#16A34A] transition-all shadow-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Submit Application
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 text-sm text-[#64748B]">
            <Shield className="w-4 h-4 text-[#16A34A]" />
            <span>Secured by 256-bit SSL encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
}

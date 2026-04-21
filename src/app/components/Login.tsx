import { useState } from "react";
import { Link } from "react-router";
import { Mail, Lock, Eye, EyeOff, Shield, CheckCircle2, User, Phone } from "lucide-react";

export function Login() {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-16 h-16 bg-[#0A2540] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">NF</span>
            </div>
            <div>
              <div className="text-[#0A2540] font-bold text-3xl tracking-tight">
                NeoFinance
              </div>
              <div className="text-[#64748B] text-sm tracking-wider">PRO</div>
            </div>
          </div>

          <h1 className="text-4xl text-[#0A2540] mb-4">
            Welcome back to your financial journey
          </h1>
          <p className="text-lg text-[#64748B] mb-8 leading-relaxed">
            Access your personalized dashboard, manage loans, and track your
            financial goals all in one place.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-[#0A2540] font-medium">
                  Secure & Encrypted
                </div>
                <div className="text-sm text-[#64748B]">
                  256-bit SSL encryption
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-[#0A2540] font-medium">RBI Registered</div>
                <div className="text-sm text-[#64748B]">
                  Fully compliant & verified
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-[#0A2540] font-medium">
                  24/7 Support
                </div>
                <div className="text-sm text-[#64748B]">
                  Always here to help
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full">
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#E5E7EB] p-8 lg:p-10">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-6 h-6 text-[#0A2540]" />
              <h2 className="text-2xl text-[#0A2540]">Welcome to NeoFinance</h2>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b-2 border-[#E5E7EB]">
              <button
                type="button"
                onClick={() => setActiveTab("signin")}
                className={`pb-3 px-4 font-medium transition-all relative ${
                  activeTab === "signin"
                    ? "text-[#0A2540]"
                    : "text-[#64748B] hover:text-[#0A2540]"
                }`}
              >
                Sign In
                {activeTab === "signin" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0A2540]"></span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("signup")}
                className={`pb-3 px-4 font-medium transition-all relative ${
                  activeTab === "signup"
                    ? "text-[#0A2540]"
                    : "text-[#64748B] hover:text-[#0A2540]"
                }`}
              >
                Sign Up
                {activeTab === "signup" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0A2540]"></span>
                )}
              </button>
            </div>

            {activeTab === "signin" ? (
              <form className="space-y-6">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#0A2540] mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#0A2540] focus:ring-4 focus:ring-[#0A2540]/10 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#0A2540] mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#0A2540] focus:ring-4 focus:ring-[#0A2540]/10 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0A2540] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border-2 border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#0A2540] accent-[#0A2540]"
                  />
                  <span className="text-sm text-[#64748B]">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-[#0A2540] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-4 bg-[#0A2540] text-white rounded-lg hover:bg-[#0D2F52] transition-all shadow-lg text-lg font-medium"
              >
                Login to Dashboard
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E5E7EB]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-[#64748B]">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#E5E7EB] rounded-lg hover:border-[#0A2540] hover:bg-[#F8FAFC] transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-[#0A2540]">
                    Google
                  </span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#E5E7EB] rounded-lg hover:border-[#0A2540] hover:bg-[#F8FAFC] transition-all"
                >
                  <svg
                    className="w-5 h-5"
                    fill="#1877F2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="text-sm font-medium text-[#0A2540]">
                    Facebook
                  </span>
                </button>
              </div>
            </form>
            ) : (
              <form className="space-y-6">
                {/* Full Name Input */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-[#0A2540] mb-2"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full pl-12 pr-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#0A2540] focus:ring-4 focus:ring-[#0A2540]/10 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label
                    htmlFor="signupEmail"
                    className="block text-sm font-medium text-[#0A2540] mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                    <input
                      id="signupEmail"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-12 pr-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#0A2540] focus:ring-4 focus:ring-[#0A2540]/10 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Phone Input */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-[#0A2540] mb-2"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-12 pr-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#0A2540] focus:ring-4 focus:ring-[#0A2540]/10 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label
                    htmlFor="signupPassword"
                    className="block text-sm font-medium text-[#0A2540] mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                    <input
                      id="signupPassword"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a strong password"
                      className="w-full pl-12 pr-12 py-3 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#0A2540] focus:ring-4 focus:ring-[#0A2540]/10 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0A2540] transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-[#0A2540] mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your password"
                      className="w-full pl-12 pr-12 py-3 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#0A2540] focus:ring-4 focus:ring-[#0A2540]/10 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0A2540] transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 mt-1 border-2 border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#0A2540] accent-[#0A2540]"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-[#64748B]">
                    I agree to the{" "}
                    <a href="#" className="text-[#0A2540] hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-[#0A2540] hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                {/* Sign Up Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-[#0A2540] text-white rounded-lg hover:bg-[#0D2F52] transition-all shadow-lg text-lg font-medium"
                >
                  Create Account
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#E5E7EB]"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-[#64748B]">
                      Or sign up with
                    </span>
                  </div>
                </div>

                {/* Social Sign Up */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#E5E7EB] rounded-lg hover:border-[#0A2540] hover:bg-[#F8FAFC] transition-all"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="text-sm font-medium text-[#0A2540]">
                      Google
                    </span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#E5E7EB] rounded-lg hover:border-[#0A2540] hover:bg-[#F8FAFC] transition-all"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="#1877F2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span className="text-sm font-medium text-[#0A2540]">
                      Facebook
                    </span>
                  </button>
                </div>
              </form>
            )}

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-blue-900 leading-relaxed">
                  <strong>Security Notice:</strong> Your data is encrypted and
                  protected with industry-standard security measures. We never
                  share your personal information with third parties.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import {
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  Fingerprint,
} from "lucide-react";

/* ─── Mock valid credentials (demo) ─────────────────────────── */
const VALID_ID = "admin@neofinance.com";
const VALID_PW = "Admin@1234";
const VALID_OTP = "123456";

/* ─── Spinner ────────────────────────────────────────────────── */
function Spinner() {
  return (
    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );
}

export function AdminLogin() {
  const navigate = useNavigate();

  /* step: credentials → 2fa → success */
  const [step, setStep] = useState<"credentials" | "2fa" | "success">("credentials");

  /* credentials */
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [idError, setIdError] = useState("");
  const [pwError, setPwError] = useState("");
  const [credError, setCredError] = useState("");
  const [credLoading, setCredLoading] = useState(false);

  /* 2fa */
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  /* progress bar width after success */
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (step === "success") {
      setProgress(0);
      const t = setTimeout(() => setProgress(100), 50);
      const r = setTimeout(() => navigate("/admin"), 1700);
      return () => { clearTimeout(t); clearTimeout(r); };
    }
  }, [step, navigate]);

  /* ── Credential validation ───────────────────────────────── */
  function validateCredentials(): boolean {
    let ok = true;
    setIdError("");
    setPwError("");
    setCredError("");

    if (!adminId.trim()) {
      setIdError("Admin ID or email is required.");
      ok = false;
    } else if (!/\S+@\S+\.\S+/.test(adminId) && adminId.length < 5) {
      setIdError("Enter a valid admin ID or email address.");
      ok = false;
    }

    if (!password) {
      setPwError("Password is required.");
      ok = false;
    } else if (password.length < 6) {
      setPwError("Password must be at least 6 characters.");
      ok = false;
    }

    return ok;
  }

  function handleCredentialSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateCredentials()) return;

    setCredLoading(true);
    setTimeout(() => {
      setCredLoading(false);
      if (adminId !== VALID_ID || password !== VALID_PW) {
        setCredError("Invalid credentials. Please check your Admin ID and password.");
        return;
      }
      setStep("2fa");
    }, 1400);
  }

  /* ── OTP helpers ─────────────────────────────────────────── */
  function handleOtpChange(i: number, val: string) {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    setOtpError("");
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
  }

  function handleOtpKeyDown(i: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      otpRefs.current[i - 1]?.focus();
    }
  }

  function handleOtpPaste(e: React.ClipboardEvent) {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      otpRefs.current[5]?.focus();
    }
  }

  function handleOtpSubmit(e: React.FormEvent) {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) {
      setOtpError("Enter all 6 digits of your authenticator code.");
      return;
    }
    setOtpLoading(true);
    setTimeout(() => {
      setOtpLoading(false);
      if (code !== VALID_OTP) {
        setOtpError("Incorrect code. Please try again or wait for the next cycle.");
        setOtp(["", "", "", "", "", ""]);
        otpRefs.current[0]?.focus();
        return;
      }
      setStep("success");
    }, 1200);
  }

  /* ── Shared input classes ────────────────────────────────── */
  const baseInput =
    "w-full px-4 py-3 border rounded-lg text-sm text-[#0A2540] placeholder-[#94A3B8] bg-white focus:outline-none focus:ring-2 transition-all";
  const inputOk = `${baseInput} border-[#CBD5E1] focus:border-[#0A2540] focus:ring-[#0A2540]/10`;
  const inputErr = `${baseInput} border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/10 bg-red-50/30`;

  return (
    <div className="min-h-screen bg-[#0A2540] flex flex-col items-center justify-center px-4 py-10">

      {/* ── Back link ───────────────────────────────────────── */}
      <Link
        to="/"
        className="flex items-center gap-1.5 text-white/50 hover:text-white/80 transition-colors mb-8 text-sm self-start max-w-md w-full mx-auto"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Homepage
      </Link>

      {/* ── Card ────────────────────────────────────────────── */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Top navy strip with brand */}
        <div className="bg-[#0A2540] px-8 pt-8 pb-7">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold tracking-tight">NF</span>
            </div>
            <div>
              <div className="text-white font-bold tracking-tight">NeoFinance Pro</div>
              <div className="text-white/40 text-xs tracking-widest uppercase">Admin Portal</div>
            </div>
          </div>

          {/* Security headline */}
          <div className="flex items-center gap-2.5 mb-2">
            <ShieldCheck className="w-5 h-5 text-white/70 flex-shrink-0" />
            <span className="text-white font-semibold tracking-wide">Secure Admin Access</span>
          </div>
          <p className="text-white/40 text-xs leading-relaxed pl-7">
            Authorized personnel only. All sessions are monitored and logged.
          </p>
        </div>

        {/* ── Divider badges ────────────────────────────────── */}
        <div className="flex items-center gap-2 px-8 py-3 bg-[#F8FAFC] border-b border-[#E5E7EB]">
          <span className="inline-flex items-center gap-1.5 text-xs text-[#334155]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] inline-block"></span>
            256-bit SSL
          </span>
          <span className="text-[#CBD5E1]">·</span>
          <span className="inline-flex items-center gap-1.5 text-xs text-[#334155]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] inline-block"></span>
            RBI Compliant
          </span>
          <span className="text-[#CBD5E1]">·</span>
          <span className="inline-flex items-center gap-1.5 text-xs text-[#334155]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] inline-block"></span>
            ISO 27001
          </span>
        </div>

        {/* ── Form area ─────────────────────────────────────── */}
        <div className="px-8 py-8">

          {/* ════ STEP 1 – Credentials ════ */}
          {step === "credentials" && (
            <>
              <h2 className="text-[#0A2540] mb-1 text-xl font-semibold">Sign in to Admin</h2>
              <p className="text-sm text-[#64748B] mb-7">Enter your credentials to continue.</p>

              {/* Credential-level error banner */}
              {credError && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 px-4 py-3 mb-6 bg-red-50 border border-red-200 rounded-lg"
                >
                  <AlertCircle className="w-4 h-4 text-[#DC2626] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[#DC2626]">{credError}</span>
                </div>
              )}

              <form onSubmit={handleCredentialSubmit} noValidate className="space-y-5">

                {/* Admin ID / Email */}
                <div>
                  <label htmlFor="adminId" className="block text-sm font-medium text-[#334155] mb-1.5">
                    Admin ID or Email
                  </label>
                  <input
                    id="adminId"
                    type="text"
                    autoComplete="username"
                    autoFocus
                    value={adminId}
                    onChange={(e) => { setAdminId(e.target.value); setIdError(""); setCredError(""); }}
                    placeholder="admin@neofinance.com"
                    className={idError ? inputErr : inputOk}
                    aria-invalid={!!idError}
                    aria-describedby={idError ? "id-error" : undefined}
                  />
                  {idError && (
                    <p id="id-error" className="mt-1.5 text-xs text-[#DC2626] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" /> {idError}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="password" className="block text-sm font-medium text-[#334155]">
                      Password
                    </label>
                    <button
                      type="button"
                      className="text-xs text-[#0A2540] hover:underline underline-offset-2 font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setPwError(""); setCredError(""); }}
                      placeholder="••••••••••••"
                      className={`${pwError ? inputErr : inputOk} pr-11`}
                      aria-invalid={!!pwError}
                      aria-describedby={pwError ? "pw-error" : undefined}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#334155] transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {pwError && (
                    <p id="pw-error" className="mt-1.5 text-xs text-[#DC2626] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" /> {pwError}
                    </p>
                  )}
                </div>

                {/* Enable 2FA hint */}
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded border-[#CBD5E1] accent-[#0A2540]"
                    readOnly
                  />
                  <span className="text-sm text-[#64748B]">Require 2FA verification on login</span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={credLoading}
                  className="w-full mt-1 py-3.5 bg-[#0A2540] text-white rounded-lg font-semibold text-sm hover:bg-[#0D2F52] active:scale-[0.99] transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {credLoading ? (
                    <><Spinner /> Verifying…</>
                  ) : (
                    <><Lock className="w-4 h-4" /> Login</>
                  )}
                </button>
              </form>
            </>
          )}

          {/* ════ STEP 2 – 2FA ════ */}
          {step === "2fa" && (
            <>
              {/* Back */}
              <button
                onClick={() => { setStep("credentials"); setOtp(["", "", "", "", "", ""]); setOtpError(""); }}
                className="flex items-center gap-1 text-xs text-[#64748B] hover:text-[#0A2540] transition-colors mb-6"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Back
              </button>

              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-[#0A2540]/8 rounded-full flex items-center justify-center">
                  <Fingerprint className="w-5 h-5 text-[#0A2540]" />
                </div>
                <div>
                  <h2 className="text-[#0A2540] text-xl font-semibold">Two-Factor Verification</h2>
                  <p className="text-xs text-[#64748B]">Open your authenticator app</p>
                </div>
              </div>

              <p className="text-sm text-[#64748B] mt-4 mb-7 leading-relaxed">
                Enter the 6-digit code generated by your authenticator app (Google Authenticator or Authy).
                Codes refresh every 30 seconds.
              </p>

              {otpError && (
                <div role="alert" className="flex items-start gap-2.5 px-4 py-3 mb-6 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-[#DC2626] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[#DC2626]">{otpError}</span>
                </div>
              )}

              <form onSubmit={handleOtpSubmit}>
                {/* OTP inputs */}
                <div className="flex gap-2.5 justify-center mb-2" onPaste={handleOtpPaste}>
                  {otp.map((val, i) => (
                    <input
                      key={i}
                      ref={(el) => { otpRefs.current[i] = el; }}
                      id={`otp-${i}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={val}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className={`text-center border-2 rounded-xl font-bold text-[#0A2540] focus:outline-none transition-all ${
                        otpError
                          ? "border-[#DC2626] bg-red-50/40"
                          : val
                          ? "border-[#0A2540] bg-white"
                          : "border-[#E5E7EB] bg-[#F8FAFC] focus:border-[#0A2540]"
                      }`}
                      style={{ width: "46px", height: "56px", fontSize: "22px" }}
                      autoFocus={i === 0}
                      aria-label={`Digit ${i + 1}`}
                    />
                  ))}
                </div>
                <p className="text-center text-xs text-[#94A3B8] mb-7">
                  Hint for demo: <span className="font-mono font-medium text-[#334155]">123456</span>
                </p>

                <button
                  type="submit"
                  disabled={otpLoading}
                  className="w-full py-3.5 bg-[#0A2540] text-white rounded-lg font-semibold text-sm hover:bg-[#0D2F52] active:scale-[0.99] transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {otpLoading ? (
                    <><Spinner /> Verifying Code…</>
                  ) : (
                    <><ShieldCheck className="w-4 h-4" /> Verify &amp; Continue</>
                  )}
                </button>
              </form>
            </>
          )}

          {/* ════ STEP 3 – Success ════ */}
          {step === "success" && (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#0A2540]/8 flex items-center justify-center mb-5">
                <CheckCircle2 className="w-8 h-8 text-[#16A34A]" />
              </div>
              <h2 className="text-[#0A2540] text-xl font-semibold mb-1">Access Granted</h2>
              <p className="text-sm text-[#64748B] mb-7">
                Redirecting you to the Admin Dashboard…
              </p>
              {/* Progress bar */}
              <div className="w-full h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0A2540] rounded-full transition-all duration-[1600ms] ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* ── Footer ─────────────────────────────────────────── */}
        {step !== "success" && (
          <div className="px-8 pb-7 pt-1">
            <div className="pt-5 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#94A3B8]">
              <span>Not an admin?{" "}
                <Link to="/login" className="text-[#0A2540] font-medium hover:underline underline-offset-2">
                  Customer login
                </Link>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] inline-block"></span>
                Secure
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom legal ─────────────────────────────────────── */}
      <p className="mt-8 text-white/25 text-xs text-center max-w-sm">
        Unauthorized access attempts are monitored, recorded, and subject to prosecution under applicable law.
      </p>
    </div>
  );
}

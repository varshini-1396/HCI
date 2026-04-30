import { useState, useMemo } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Check,
  X,
  AlertTriangle,
  Download,
  SlidersHorizontal,
  User,
  Briefcase,
  CreditCard,
  TrendingUp,
  Calendar,
  MapPin,
  Phone,
  Mail,
  FileText,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────── */
type Status = "pending" | "approved" | "rejected" | "under_review";
type LoanType = "Personal" | "Business" | "Home" | "Education" | "Equipment" | "Vehicle";
type SortKey = "name" | "amount" | "income" | "score" | "date" | "status";
type SortDir = "asc" | "desc";

interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  loanType: LoanType;
  amount: number;
  income: number;
  creditScore: number;
  status: Status;
  appliedDate: string;
  tenure: number;
  purpose: string;
  employer: string;
  employment: "Salaried" | "Self-Employed" | "Business Owner";
  dob: string;
  pan: string;
  existingLoans: number;
  dti: number; // debt-to-income %
  collateral?: string;
  notes?: string;
}

/* ─── Mock data ──────────────────────────────────────────────── */
const MOCK: Applicant[] = [
  { id: "APP-2426-1301", name: "Priya Mehta", email: "priya.mehta@email.com", phone: "+91 98765 43210", location: "Mumbai, MH", loanType: "Personal", amount: 500000, income: 120000, creditScore: 742, status: "pending", appliedDate: "2026-04-28", tenure: 36, purpose: "Home renovation", employer: "Infosys Ltd.", employment: "Salaried", dob: "1992-05-14", pan: "AXXPS1234C", existingLoans: 1, dti: 28, notes: "Clean repayment history on previous loan." },
  { id: "APP-2426-1302", name: "Rahul Singh", email: "rahul.singh@email.com", phone: "+91 91234 56789", location: "Delhi, DL", loanType: "Business", amount: 2500000, income: 350000, creditScore: 688, status: "under_review", appliedDate: "2026-04-27", tenure: 60, purpose: "Business expansion", employer: "Self — Singh Enterprises", employment: "Business Owner", dob: "1984-11-02", pan: "BXXRS5678D", existingLoans: 2, dti: 42, collateral: "Commercial property @ ₹45L", notes: "Revenue growth +32% YoY. Collateral strong." },
  { id: "APP-2426-1303", name: "Ananya Kapoor", email: "ananya.k@email.com", phone: "+91 87654 32109", location: "Bengaluru, KA", loanType: "Home", amount: 8000000, income: 280000, creditScore: 795, status: "approved", appliedDate: "2026-04-25", tenure: 240, purpose: "Purchase primary residence", employer: "Google India", employment: "Salaried", dob: "1990-03-22", pan: "CXXAK9012E", existingLoans: 0, dti: 18, collateral: "Flat in Whitefield", notes: "Excellent profile. Fast-tracked." },
  { id: "APP-2426-1304", name: "Vikram Nair", email: "vikram.nair@email.com", phone: "+91 76543 21098", location: "Chennai, TN", loanType: "Vehicle", amount: 750000, income: 95000, creditScore: 620, status: "rejected", appliedDate: "2026-04-24", tenure: 48, purpose: "Purchase commercial vehicle", employer: "Freelance", employment: "Self-Employed", dob: "1988-07-30", pan: "DXXVN3456F", existingLoans: 3, dti: 58, notes: "DTI too high. Low score. Advised to reapply after 6 months." },
  { id: "APP-2426-1305", name: "Sunita Sharma", email: "sunita.sharma@email.com", phone: "+91 65432 10987", location: "Pune, MH", loanType: "Education", amount: 1200000, income: 55000, creditScore: 710, status: "pending", appliedDate: "2026-04-28", tenure: 84, purpose: "MBA at IIM Ahmedabad", employer: "Pre-MBA — TCS", employment: "Salaried", dob: "1999-01-18", pan: "EXXSS7890G", existingLoans: 0, dti: 12, notes: "Admission confirmed. High-value program." },
  { id: "APP-2426-1306", name: "Arjun Desai", email: "arjun.desai@email.com", phone: "+91 54321 09876", location: "Ahmedabad, GJ", loanType: "Business", amount: 1800000, income: 420000, creditScore: 758, status: "approved", appliedDate: "2026-04-22", tenure: 48, purpose: "Equipment purchase", employer: "Desai Manufacturing", employment: "Business Owner", dob: "1979-09-05", pan: "FXXAD2345H", existingLoans: 1, dti: 22, collateral: "Machinery @ ₹30L" },
  { id: "APP-2426-1307", name: "Kavita Reddy", email: "kavita.r@email.com", phone: "+91 43210 98765", location: "Hyderabad, TS", loanType: "Personal", amount: 300000, income: 75000, creditScore: 672, status: "under_review", appliedDate: "2026-04-26", tenure: 24, purpose: "Medical expenses", employer: "Apollo Hospitals", employment: "Salaried", dob: "1995-12-11", pan: "GXXKR6789I", existingLoans: 1, dti: 34 },
  { id: "APP-2426-1308", name: "Mohan Pillai", email: "mohan.pillai@email.com", phone: "+91 32109 87654", location: "Kochi, KL", loanType: "Home", amount: 4500000, income: 185000, creditScore: 731, status: "pending", appliedDate: "2026-04-29", tenure: 180, purpose: "Purchase apartment", employer: "Kerala Govt.", employment: "Salaried", dob: "1986-06-25", pan: "HXXMP0123J", existingLoans: 0, dti: 20 },
  { id: "APP-2426-1309", name: "Deepa Iyer", email: "deepa.iyer@email.com", phone: "+91 21098 76543", location: "Bengaluru, KA", loanType: "Equipment", amount: 950000, income: 220000, creditScore: 779, status: "approved", appliedDate: "2026-04-20", tenure: 36, purpose: "Industrial equipment", employer: "Iyer Tech Solutions", employment: "Business Owner", dob: "1981-04-08", pan: "IXXDI4567K", existingLoans: 0, dti: 15, collateral: "Equipment @ ₹12L" },
  { id: "APP-2426-1310", name: "Sanjay Gupta", email: "sanjay.g@email.com", phone: "+91 10987 65432", location: "Jaipur, RJ", loanType: "Personal", amount: 250000, income: 62000, creditScore: 589, status: "rejected", appliedDate: "2026-04-23", tenure: 18, purpose: "Debt consolidation", employer: "Rajasthan Textiles", employment: "Salaried", dob: "1993-02-14", pan: "JXXSG8901L", existingLoans: 4, dti: 65, notes: "Multiple defaults. Flagged by credit bureau." },
  { id: "APP-2426-1311", name: "Rina Bose", email: "rina.bose@email.com", phone: "+91 98001 11222", location: "Kolkata, WB", loanType: "Education", amount: 800000, income: 48000, creditScore: 698, status: "pending", appliedDate: "2026-04-29", tenure: 60, purpose: "Masters in USA", employer: "Pre-Masters — Wipro", employment: "Salaried", dob: "2001-08-19", pan: "KXXRB2345M", existingLoans: 0, dti: 10 },
  { id: "APP-2426-1312", name: "Nikhil Joshi", email: "nikhil.j@email.com", phone: "+91 88900 22333", location: "Nagpur, MH", loanType: "Vehicle", amount: 1100000, income: 135000, creditScore: 718, status: "under_review", appliedDate: "2026-04-27", tenure: 60, purpose: "Car purchase", employer: "Orange City Pharma", employment: "Salaried", dob: "1991-03-03", pan: "LXXNJ5678N", existingLoans: 1, dti: 29 },
];

/* ─── Helpers ────────────────────────────────────────────────── */
const fmt = (n: number) =>
  n >= 10_00_000
    ? `₹${(n / 10_00_000).toFixed(2)}L`
    : `₹${(n / 1_000).toFixed(0)}K`;

const fmtFull = (n: number) =>
  "₹" + n.toLocaleString("en-IN");

const STATUS_META: Record<Status, { label: string; color: string; bg: string; Icon: React.FC<{ className?: string }> }> = {
  pending:      { label: "Pending",      color: "text-amber-700",  bg: "bg-amber-50 border-amber-200",  Icon: Clock },
  approved:     { label: "Approved",     color: "text-[#16A34A]",  bg: "bg-green-50 border-green-200",  Icon: CheckCircle2 },
  rejected:     { label: "Rejected",     color: "text-[#DC2626]",  bg: "bg-red-50 border-red-200",      Icon: XCircle },
  under_review: { label: "Under Review", color: "text-blue-700",   bg: "bg-blue-50 border-blue-200",    Icon: Eye },
};

const SCORE_COLOR = (s: number) =>
  s >= 750 ? "text-[#16A34A]" : s >= 680 ? "text-amber-600" : "text-[#DC2626]";

const SCORE_LABEL = (s: number) =>
  s >= 750 ? "Excellent" : s >= 720 ? "Very Good" : s >= 680 ? "Good" : s >= 640 ? "Fair" : "Poor";

/* ─── Sub-components ──────────────────────────────────────────── */
function StatusBadge({ status }: { status: Status }) {
  const m = STATUS_META[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${m.bg} ${m.color}`}>
      <m.Icon className="w-3 h-3" />
      {m.label}
    </span>
  );
}

function ScorePill({ score }: { score: number }) {
  const pct = Math.min(100, Math.round(((score - 300) / 600) * 100));
  return (
    <div className="flex items-center gap-2">
      <span className={`font-semibold tabular-nums ${SCORE_COLOR(score)}`}>{score}</span>
      <div className="w-16 h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${score >= 750 ? "bg-[#16A34A]" : score >= 680 ? "bg-amber-500" : "bg-[#DC2626]"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function SortIcon({ col, sortKey, dir }: { col: SortKey; sortKey: SortKey; dir: SortDir }) {
  if (sortKey !== col) return <ChevronsUpDown className="w-3.5 h-3.5 text-[#CBD5E1] ml-1" />;
  return dir === "asc"
    ? <ChevronUp className="w-3.5 h-3.5 text-[#0A2540] ml-1" />
    : <ChevronDown className="w-3.5 h-3.5 text-[#0A2540] ml-1" />;
}

/* ─── Toast ──────────────────────────────────────────────────── */
function Toast({ msg, type, onClose }: { msg: string; type: "success" | "error"; onClose: () => void }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border text-sm font-medium animate-[slideUp_0.3s_ease] ${
        type === "success"
          ? "bg-green-50 border-green-200 text-[#16A34A]"
          : "bg-red-50 border-red-200 text-[#DC2626]"
      }`}
    >
      {type === "success" ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <XCircle className="w-5 h-5 flex-shrink-0" />}
      <span>{msg}</span>
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100 transition-opacity">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

/* ─── Confirmation Dialog ────────────────────────────────────── */
function ConfirmDialog({
  action,
  applicant,
  onConfirm,
  onCancel,
}: {
  action: "approve" | "reject";
  applicant: Applicant;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const isApprove = action === "approve";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-[#E5E7EB] overflow-hidden">
        {/* Header stripe */}
        <div className={`h-1.5 w-full ${isApprove ? "bg-[#16A34A]" : "bg-[#DC2626]"}`} />
        <div className="p-7">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-5 ${isApprove ? "bg-green-50" : "bg-red-50"}`}>
            {isApprove
              ? <CheckCircle2 className="w-7 h-7 text-[#16A34A]" />
              : <AlertTriangle className="w-7 h-7 text-[#DC2626]" />
            }
          </div>
          <h3 className="text-[#0A2540] text-lg font-semibold mb-1">
            {isApprove ? "Approve Application?" : "Reject Application?"}
          </h3>
          <p className="text-sm text-[#64748B] mb-5">
            {isApprove
              ? `You are about to approve the loan application from `
              : `You are about to reject the loan application from `}
            <strong className="text-[#0A2540]">{applicant.name}</strong>
            {isApprove
              ? ` for ${fmtFull(applicant.amount)}. This action will trigger disbursement processing.`
              : `. This action cannot be undone without supervisor override.`}
          </p>

          {/* Summary card */}
          <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-4 mb-6 space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-[#64748B]">Application ID</span>
              <span className="font-mono text-[#0A2540] font-medium">{applicant.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Loan Amount</span>
              <span className="font-semibold text-[#0A2540]">{fmtFull(applicant.amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Loan Type</span>
              <span className="text-[#0A2540]">{applicant.loanType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Credit Score</span>
              <span className={`font-semibold ${SCORE_COLOR(applicant.creditScore)}`}>{applicant.creditScore}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-2.5 border border-[#E5E7EB] text-[#334155] rounded-lg text-sm hover:bg-[#F8FAFC] transition-all font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 py-2.5 text-white rounded-lg text-sm font-semibold transition-all active:scale-[0.98] ${
                isApprove ? "bg-[#16A34A] hover:bg-green-700" : "bg-[#DC2626] hover:bg-red-700"
              }`}
            >
              {isApprove ? "Yes, Approve" : "Yes, Reject"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Detail Panel ───────────────────────────────────────────── */
function DetailPanel({
  app,
  onClose,
  onAction,
}: {
  app: Applicant;
  onClose: () => void;
  onAction: (id: string, action: "approve" | "reject") => void;
}) {
  const canAct = app.status === "pending" || app.status === "under_review";
  const m = STATUS_META[app.status];
  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 z-40 w-full max-w-lg bg-white shadow-2xl flex flex-col overflow-hidden">
        {/* Panel header */}
        <div className="bg-[#0A2540] px-6 py-5 flex items-start justify-between flex-shrink-0">
          <div>
            <div className="text-white/40 text-xs font-mono mb-1">{app.id}</div>
            <div className="text-white font-semibold text-lg leading-tight">{app.name}</div>
            <div className="text-white/60 text-sm">{app.loanType} Loan · {app.appliedDate}</div>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors mt-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status + amount strip */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#F8FAFC] border-b border-[#E5E7EB] flex-shrink-0">
          <div>
            <div className="text-xs text-[#94A3B8] mb-1">Loan Amount</div>
            <div className="text-2xl font-bold text-[#0A2540]">{fmtFull(app.amount)}</div>
          </div>
          <StatusBadge status={app.status} />
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

          {/* Personal Info */}
          <section>
            <h4 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-widest mb-3">Personal Information</h4>
            <div className="bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] overflow-hidden">
              {[
                { icon: User,     label: "Full Name",   val: app.name },
                { icon: Mail,     label: "Email",       val: app.email },
                { icon: Phone,    label: "Phone",       val: app.phone },
                { icon: MapPin,   label: "Location",    val: app.location },
                { icon: Calendar, label: "Date of Birth",val: app.dob },
                { icon: FileText, label: "PAN",         val: app.pan },
              ].map(({ icon: Icon, label, val }, i, arr) => (
                <div key={label} className={`flex items-center gap-3 px-4 py-3 ${i < arr.length - 1 ? "border-b border-[#F1F5F9]" : ""}`}>
                  <Icon className="w-4 h-4 text-[#94A3B8] flex-shrink-0" />
                  <span className="text-xs text-[#94A3B8] w-28 flex-shrink-0">{label}</span>
                  <span className="text-sm text-[#0A2540] font-medium">{val}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Financial Info */}
          <section>
            <h4 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-widest mb-3">Financial Profile</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Monthly Income",    val: fmtFull(app.income),     sub: "gross" },
                { label: "Credit Score",      val: `${app.creditScore}`,    sub: SCORE_LABEL(app.creditScore), highlight: SCORE_COLOR(app.creditScore) },
                { label: "Debt-to-Income",    val: `${app.dti}%`,           sub: app.dti > 40 ? "High risk" : "Acceptable", highlight: app.dti > 40 ? "text-[#DC2626]" : "text-[#16A34A]" },
                { label: "Existing Loans",    val: `${app.existingLoans}`,  sub: "active" },
                { label: "Employer",          val: app.employer,            sub: app.employment },
                { label: "Tenure Requested",  val: `${app.tenure} months`,  sub: `${Math.round(app.tenure / 12)} yrs` },
              ].map(({ label, val, sub, highlight }) => (
                <div key={label} className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-4">
                  <div className="text-xs text-[#94A3B8] mb-1">{label}</div>
                  <div className={`font-semibold text-sm ${highlight ?? "text-[#0A2540]"}`}>{val}</div>
                  <div className="text-xs text-[#94A3B8] mt-0.5">{sub}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Credit Score Bar */}
          <section>
            <h4 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-widest mb-3">Credit Score Breakdown</h4>
            <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-2xl font-bold ${SCORE_COLOR(app.creditScore)}`}>{app.creditScore}</span>
                <span className={`text-sm font-semibold ${SCORE_COLOR(app.creditScore)}`}>{SCORE_LABEL(app.creditScore)}</span>
              </div>
              <div className="relative h-3 rounded-full overflow-hidden bg-gradient-to-r from-[#DC2626] via-amber-400 to-[#16A34A]">
                <div
                  className="absolute top-0 right-0 bottom-0 bg-white/70 rounded-r-full"
                  style={{ width: `${100 - Math.round(((app.creditScore - 300) / 600) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-[#94A3B8] mt-1">
                <span>300 — Poor</span><span>550 — Fair</span><span>750+ — Excellent</span>
              </div>
            </div>
          </section>

          {/* Loan Purpose */}
          <section>
            <h4 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-widest mb-3">Loan Details</h4>
            <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-4 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-[#64748B]">Purpose</span><span className="text-[#0A2540] font-medium">{app.purpose}</span></div>
              {app.collateral && <div className="flex justify-between"><span className="text-[#64748B]">Collateral</span><span className="text-[#0A2540] font-medium">{app.collateral}</span></div>}
            </div>
          </section>

          {/* Notes */}
          {app.notes && (
            <section>
              <h4 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-widest mb-3">Analyst Notes</h4>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 flex gap-2.5">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
                {app.notes}
              </div>
            </section>
          )}
        </div>

        {/* Actions */}
        {canAct && (
          <div className="px-6 py-5 border-t border-[#E5E7EB] flex gap-3 flex-shrink-0 bg-white">
            <button
              onClick={() => onAction(app.id, "reject")}
              className="flex-1 py-3 border-2 border-[#DC2626] text-[#DC2626] rounded-xl text-sm font-semibold hover:bg-red-50 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <X className="w-4 h-4" /> Reject
            </button>
            <button
              onClick={() => onAction(app.id, "approve")}
              className="flex-1 py-3 bg-[#16A34A] text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <Check className="w-4 h-4" /> Approve
            </button>
          </div>
        )}
      </div>
    </>
  );
}

/* ─── Main Page ──────────────────────────────────────────────── */
export function LoanApplications() {
  const [apps, setApps] = useState<Applicant[]>(MOCK);
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [typeFilter, setTypeFilter] = useState<LoanType | "all">("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<{ id: string; action: "approve" | "reject" } | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const selectedApp = apps.find((a) => a.id === selectedId) ?? null;
  const confirmApp = apps.find((a) => a.id === confirm?.id) ?? null;

  /* ── Sort handler ──────────────────────────────────────────── */
  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  }

  /* ── Filtered + sorted data ────────────────────────────────── */
  const displayed = useMemo(() => {
    let d = [...apps];
    if (statusFilter !== "all") d = d.filter((a) => a.status === statusFilter);
    if (typeFilter !== "all") d = d.filter((a) => a.loanType === typeFilter);
    if (dateFrom) d = d.filter((a) => a.appliedDate >= dateFrom);
    if (dateTo) d = d.filter((a) => a.appliedDate <= dateTo);
    if (search.trim()) {
      const q = search.toLowerCase();
      d = d.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.id.toLowerCase().includes(q) ||
          a.email.toLowerCase().includes(q)
      );
    }
    d.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "name":   cmp = a.name.localeCompare(b.name); break;
        case "amount": cmp = a.amount - b.amount; break;
        case "income": cmp = a.income - b.income; break;
        case "score":  cmp = a.creditScore - b.creditScore; break;
        case "date":   cmp = a.appliedDate.localeCompare(b.appliedDate); break;
        case "status": cmp = a.status.localeCompare(b.status); break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return d;
  }, [apps, statusFilter, typeFilter, dateFrom, dateTo, search, sortKey, sortDir]);

  /* ── Counts ────────────────────────────────────────────────── */
  const counts = useMemo(() => ({
    all: apps.length,
    pending: apps.filter((a) => a.status === "pending").length,
    under_review: apps.filter((a) => a.status === "under_review").length,
    approved: apps.filter((a) => a.status === "approved").length,
    rejected: apps.filter((a) => a.status === "rejected").length,
  }), [apps]);

  /* ── Actions ───────────────────────────────────────────────── */
  function openAction(id: string, action: "approve" | "reject") {
    setSelectedId(null); // close panel first
    setTimeout(() => setConfirm({ id, action }), 50);
  }

  function handleConfirm() {
    if (!confirm) return;
    const newStatus = confirm.action === "approve" ? "approved" : "rejected";
    setApps((prev) => prev.map((a) => a.id === confirm.id ? { ...a, status: newStatus as Status } : a));
    const name = apps.find((a) => a.id === confirm.id)?.name ?? "";
    setToast({
      msg: confirm.action === "approve"
        ? `Application for ${name} approved successfully.`
        : `Application for ${name} has been rejected.`,
      type: confirm.action === "approve" ? "success" : "error",
    });
    setConfirm(null);
    setTimeout(() => setToast(null), 4000);
  }

  function resetFilters() {
    setStatusFilter("all"); setTypeFilter("all");
    setDateFrom(""); setDateTo(""); setSearch("");
  }

  const hasFilters = statusFilter !== "all" || typeFilter !== "all" || dateFrom || dateTo || search;

  /* ── Column header ─────────────────────────────────────────── */
  function Th({ col, label }: { col: SortKey; label: string }) {
    return (
      <th
        className="px-4 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider cursor-pointer select-none hover:text-[#0A2540] transition-colors whitespace-nowrap"
        onClick={() => handleSort(col)}
      >
        <span className="inline-flex items-center gap-1">
          {label}
          <SortIcon col={col} sortKey={sortKey} dir={sortDir} />
        </span>
      </th>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Page header ───────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#94A3B8] mb-1">
              <span>Admin</span><ChevronRight className="w-3 h-3" /><span className="text-[#0A2540]">Loan Applications</span>
            </div>
            <h1 className="text-2xl font-bold text-[#0A2540]">Loan Applications</h1>
            <p className="text-sm text-[#64748B] mt-0.5">Review, approve, or reject incoming applications.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0A2540] text-white rounded-lg text-sm font-medium hover:bg-[#0D2F52] transition-all shadow-sm">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        {/* ── Status tab pills ──────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(["all", "pending", "under_review", "approved", "rejected"] as const).map((s) => {
            const active = statusFilter === s;
            const labels: Record<string, string> = { all: "All", pending: "Pending", under_review: "Under Review", approved: "Approved", rejected: "Rejected" };
            const dot: Record<string, string> = { all: "bg-[#0A2540]", pending: "bg-amber-500", under_review: "bg-blue-500", approved: "bg-[#16A34A]", rejected: "bg-[#DC2626]" };
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                  active ? "bg-[#0A2540] text-white border-[#0A2540] shadow-sm" : "bg-white text-[#334155] border-[#E5E7EB] hover:border-[#0A2540]/30"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${active ? "bg-white/60" : dot[s]}`} />
                {labels[s]}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${active ? "bg-white/20 text-white" : "bg-[#F1F5F9] text-[#64748B]"}`}>
                  {s === "all" ? counts.all : counts[s as keyof typeof counts]}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Filters bar ───────────────────────────────────────── */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 mb-5 flex flex-wrap gap-3 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, ID, or email…"
              className="w-full pl-9 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#0A2540] placeholder-[#94A3B8] focus:outline-none focus:border-[#0A2540] focus:ring-2 focus:ring-[#0A2540]/10 transition-all bg-[#F8FAFC]"
            />
          </div>

          {/* Loan type */}
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as LoanType | "all")}
              className="pl-9 pr-8 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#334155] focus:outline-none focus:border-[#0A2540] bg-[#F8FAFC] appearance-none cursor-pointer min-w-[140px]"
            >
              <option value="all">All Types</option>
              {["Personal", "Business", "Home", "Education", "Equipment", "Vehicle"].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94A3B8] pointer-events-none" />
          </div>

          {/* Date from */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#94A3B8] flex-shrink-0" />
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="py-2.5 px-3 border border-[#E5E7EB] rounded-lg text-sm text-[#334155] focus:outline-none focus:border-[#0A2540] bg-[#F8FAFC] cursor-pointer"
            />
            <span className="text-[#94A3B8] text-sm">to</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="py-2.5 px-3 border border-[#E5E7EB] rounded-lg text-sm text-[#334155] focus:outline-none focus:border-[#0A2540] bg-[#F8FAFC] cursor-pointer"
            />
          </div>

          {hasFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 px-3 py-2.5 text-sm text-[#64748B] hover:text-[#0A2540] transition-colors border border-[#E5E7EB] rounded-lg bg-[#F8FAFC] hover:border-[#0A2540]/30"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          )}

          <div className="ml-auto flex items-center gap-1.5 text-xs text-[#94A3B8]">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            {displayed.length} result{displayed.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* ── Table ─────────────────────────────────────────────── */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-[#F8FAFC]">
                  <Th col="name"   label="Applicant" />
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">Loan Type</th>
                  <Th col="amount" label="Amount" />
                  <Th col="income" label="Income / mo" />
                  <Th col="score"  label="Credit Score" />
                  <Th col="date"   label="Applied" />
                  <Th col="status" label="Status" />
                  <th className="px-4 py-3 text-center text-xs font-semibold text-[#64748B] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {displayed.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#F1F5F9] flex items-center justify-center">
                          <FileText className="w-6 h-6 text-[#CBD5E1]" />
                        </div>
                        <p className="text-[#64748B] text-sm">No applications match your filters.</p>
                        <button onClick={resetFilters} className="text-sm text-[#0A2540] underline underline-offset-2">Clear filters</button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  displayed.map((app) => {
                    const isSelected = selectedId === app.id;
                    const canAct = app.status === "pending" || app.status === "under_review";
                    return (
                      <tr
                        key={app.id}
                        onClick={() => setSelectedId(isSelected ? null : app.id)}
                        className={`cursor-pointer transition-colors group ${isSelected ? "bg-[#0A2540]/[0.03] ring-1 ring-inset ring-[#0A2540]/10" : "hover:bg-[#F8FAFC]"}`}
                      >
                        {/* Applicant */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#0A2540] flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs font-bold">{app.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</span>
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-[#0A2540]">{app.name}</div>
                              <div className="text-xs text-[#94A3B8] font-mono">{app.id}</div>
                            </div>
                          </div>
                        </td>
                        {/* Loan type */}
                        <td className="px-4 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F1F5F9] text-[#334155] text-xs font-medium rounded-full">
                            <CreditCard className="w-3 h-3" />{app.loanType}
                          </span>
                        </td>
                        {/* Amount */}
                        <td className="px-4 py-4">
                          <div className="text-sm font-bold text-[#0A2540]">{fmt(app.amount)}</div>
                          <div className="text-xs text-[#94A3B8]">{app.tenure}mo tenure</div>
                        </td>
                        {/* Income */}
                        <td className="px-4 py-4">
                          <div className="text-sm text-[#334155]">{fmt(app.income)}</div>
                          <div className="text-xs text-[#94A3B8]">DTI {app.dti}%</div>
                        </td>
                        {/* Credit score */}
                        <td className="px-4 py-4"><ScorePill score={app.creditScore} /></td>
                        {/* Date */}
                        <td className="px-4 py-4 text-sm text-[#64748B]">{app.appliedDate}</td>
                        {/* Status */}
                        <td className="px-4 py-4"><StatusBadge status={app.status} /></td>
                        {/* Actions */}
                        <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => setSelectedId(isSelected ? null : app.id)}
                              title="View Details"
                              className="w-8 h-8 rounded-lg border border-[#E5E7EB] bg-white flex items-center justify-center text-[#64748B] hover:text-[#0A2540] hover:border-[#0A2540]/40 transition-all"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            {canAct && (
                              <>
                                <button
                                  onClick={() => openAction(app.id, "approve")}
                                  title="Approve"
                                  className="w-8 h-8 rounded-lg bg-green-50 border border-green-200 flex items-center justify-center text-[#16A34A] hover:bg-green-100 transition-all"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => openAction(app.id, "reject")}
                                  title="Reject"
                                  className="w-8 h-8 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-[#DC2626] hover:bg-red-100 transition-all"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table footer */}
          {displayed.length > 0 && (
            <div className="px-6 py-3.5 border-t border-[#F1F5F9] bg-[#F8FAFC] flex items-center justify-between text-xs text-[#94A3B8]">
              <span>Showing {displayed.length} of {apps.length} applications</span>
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                {counts.pending} pending review
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Detail panel ────────────────────────────────────────── */}
      {selectedApp && (
        <DetailPanel
          app={selectedApp}
          onClose={() => setSelectedId(null)}
          onAction={openAction}
        />
      )}

      {/* ── Confirm dialog ───────────────────────────────────────── */}
      {confirm && confirmApp && (
        <ConfirmDialog
          action={confirm.action}
          applicant={confirmApp}
          onConfirm={handleConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}

      {/* ── Toast ───────────────────────────────────────────────── */}
      {toast && (
        <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

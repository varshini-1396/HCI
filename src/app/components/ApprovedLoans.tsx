import { useState, useMemo } from "react";
import { Link } from "react-router";
import {
  Search,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Download,
  CheckCircle2,
  AlertCircle,
  Clock,
  BadgeCheck,
  Pause,
  ChevronRight,
  ChevronLeft,
  SlidersHorizontal,
  RotateCcw,
  TrendingUp,
  IndianRupee,
  Percent,
  Users,
  Calendar,
  CreditCard,
  Building2,
  GraduationCap,
  Car,
  Wrench,
  Home,
} from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────── */
type RepayStatus = "on_track" | "overdue" | "completed" | "deferred" | "npa";
type LoanType = "Personal" | "Business" | "Home" | "Education" | "Equipment" | "Vehicle";
type SortKey = "name" | "amount" | "rate" | "tenure" | "disbursalDate" | "status" | "emi";

/* ─── Mock data ──────────────────────────────────────────────── */
interface LoanRecord {
  id: string;
  customerId: string;
  name: string;
  email: string;
  loanType: LoanType;
  amount: number;
  rate: number;
  tenure: number;        // months
  disbursalDate: string;
  emi: number;
  paid: number;          // months paid
  status: RepayStatus;
  branch: string;
  accountManager: string;
}

const RECORDS: LoanRecord[] = [
  { id: "NF-2024-001", customerId: "CUS-10021", name: "Ananya Kapoor",       email: "ananya.k@email.com",        loanType: "Home",      amount: 8000000, rate: 8.50,  tenure: 240, disbursalDate: "2024-03-15", emi: 70076,  paid: 25, status: "on_track",  branch: "Bengaluru", accountManager: "Ravi Shankar" },
  { id: "NF-2024-002", customerId: "CUS-10034", name: "Arjun Desai",          email: "arjun.d@email.com",         loanType: "Business",  amount: 1800000, rate: 11.25, tenure: 48,  disbursalDate: "2024-04-01", emi: 46819,  paid: 24, status: "on_track",  branch: "Ahmedabad", accountManager: "Meena Joshi" },
  { id: "NF-2024-003", customerId: "CUS-10047", name: "Deepa Iyer",           email: "deepa.i@email.com",         loanType: "Equipment", amount: 950000,  rate: 10.75, tenure: 36,  disbursalDate: "2024-02-20", emi: 30915,  paid: 26, status: "on_track",  branch: "Bengaluru", accountManager: "Ravi Shankar" },
  { id: "NF-2024-004", customerId: "CUS-10058", name: "Rajesh Kumar",         email: "rajesh.k@email.com",        loanType: "Business",  amount: 8500000, rate: 10.50, tenure: 84,  disbursalDate: "2024-01-10", emi: 140287, paid: 27, status: "on_track",  branch: "Mumbai",    accountManager: "Sunita Rao" },
  { id: "NF-2023-005", customerId: "CUS-10063", name: "Priya Mehta",          email: "priya.m@email.com",         loanType: "Personal",  amount: 500000,  rate: 13.50, tenure: 36,  disbursalDate: "2023-08-05", emi: 16973,  paid: 36, status: "completed", branch: "Mumbai",    accountManager: "Sunita Rao" },
  { id: "NF-2023-006", customerId: "CUS-10071", name: "Nikhil Joshi",         email: "nikhil.j@email.com",        loanType: "Vehicle",   amount: 1100000, rate: 9.25,  tenure: 60,  disbursalDate: "2023-11-12", emi: 22939,  paid: 29, status: "on_track",  branch: "Nagpur",    accountManager: "Kiran Patil" },
  { id: "NF-2024-007", customerId: "CUS-10082", name: "Suman Verma",          email: "suman.v@email.com",         loanType: "Home",      amount: 4500000, rate: 8.75,  tenure: 180, disbursalDate: "2024-06-18", emi: 45063,  paid: 22, status: "on_track",  branch: "Delhi",     accountManager: "Amit Singh" },
  { id: "NF-2024-008", customerId: "CUS-10095", name: "Rohan Pillai",         email: "rohan.p@email.com",         loanType: "Education", amount: 1200000, rate: 9.00,  tenure: 84,  disbursalDate: "2024-07-01", emi: 17117,  paid: 21, status: "on_track",  branch: "Kochi",     accountManager: "Divya Nair" },
  { id: "NF-2023-009", customerId: "CUS-10103", name: "Geeta Sharma",         email: "geeta.s@email.com",         loanType: "Personal",  amount: 350000,  rate: 14.00, tenure: 24,  disbursalDate: "2023-05-20", emi: 16851,  paid: 24, status: "completed", branch: "Jaipur",    accountManager: "Pooja Agarwal" },
  { id: "NF-2024-010", customerId: "CUS-10114", name: "Farhan Sheikh",        email: "farhan.s@email.com",        loanType: "Business",  amount: 2500000, rate: 12.00, tenure: 60,  disbursalDate: "2024-05-08", emi: 55610,  paid: 23, status: "overdue",   branch: "Hyderabad", accountManager: "Lakshmi Rao" },
  { id: "NF-2024-011", customerId: "CUS-10128", name: "Kavitha Reddy",        email: "kavitha.r@email.com",       loanType: "Home",      amount: 6000000, rate: 8.25,  tenure: 240, disbursalDate: "2024-08-22", emi: 51637,  paid: 20, status: "on_track",  branch: "Hyderabad", accountManager: "Lakshmi Rao" },
  { id: "NF-2023-012", customerId: "CUS-10136", name: "Manish Tiwari",        email: "manish.t@email.com",        loanType: "Vehicle",   amount: 750000,  rate: 9.50,  tenure: 48,  disbursalDate: "2023-09-14", emi: 18872,  paid: 31, status: "overdue",   branch: "Lucknow",   accountManager: "Shalini Gupta" },
  { id: "NF-2024-013", customerId: "CUS-10149", name: "Lakshmi Narayanan",    email: "lakshmi.n@email.com",       loanType: "Education", amount: 800000,  rate: 8.50,  tenure: 60,  disbursalDate: "2024-09-01", emi: 16399,  paid: 19, status: "on_track",  branch: "Chennai",   accountManager: "Vijay Kumar" },
  { id: "NF-2022-014", customerId: "CUS-10157", name: "Dinesh Bhat",          email: "dinesh.b@email.com",        loanType: "Business",  amount: 3000000, rate: 11.50, tenure: 60,  disbursalDate: "2022-12-01", emi: 65547,  paid: 53, status: "completed", branch: "Mangalore", accountManager: "Pradeep Shetty" },
  { id: "NF-2024-015", customerId: "CUS-10162", name: "Swati Agarwal",        email: "swati.a@email.com",         loanType: "Personal",  amount: 600000,  rate: 13.00, tenure: 48,  disbursalDate: "2024-10-05", emi: 16044,  paid: 18, status: "deferred",  branch: "Pune",      accountManager: "Amol Kulkarni" },
  { id: "NF-2023-016", customerId: "CUS-10175", name: "Harish Menon",         email: "harish.m@email.com",        loanType: "Home",      amount: 5500000, rate: 8.65,  tenure: 240, disbursalDate: "2023-03-10", emi: 48282,  paid: 37, status: "on_track",  branch: "Kochi",     accountManager: "Divya Nair" },
  { id: "NF-2024-017", customerId: "CUS-10188", name: "Rina Bose",            email: "rina.b@email.com",          loanType: "Education", amount: 900000,  rate: 9.00,  tenure: 72,  disbursalDate: "2024-11-01", emi: 15775,  paid: 17, status: "on_track",  branch: "Kolkata",   accountManager: "Subhash Das" },
  { id: "NF-2022-018", customerId: "CUS-10194", name: "Satish Naik",          email: "satish.n@email.com",        loanType: "Equipment", amount: 1500000, rate: 10.50, tenure: 60,  disbursalDate: "2022-06-15", emi: 32258,  paid: 47, status: "npa",       branch: "Goa",       accountManager: "Pradeep Shetty" },
  { id: "NF-2024-019", customerId: "CUS-10201", name: "Pooja Choudhary",      email: "pooja.c@email.com",         loanType: "Personal",  amount: 400000,  rate: 12.50, tenure: 24,  disbursalDate: "2024-12-01", emi: 18895,  paid: 16, status: "on_track",  branch: "Chandigarh",accountManager: "Ajay Sharma" },
  { id: "NF-2023-020", customerId: "CUS-10215", name: "Arun Krishnamurthy",   email: "arun.k@email.com",          loanType: "Business",  amount: 4000000, rate: 11.75, tenure: 72,  disbursalDate: "2023-06-20", emi: 76413,  paid: 34, status: "on_track",  branch: "Chennai",   accountManager: "Vijay Kumar" },
  { id: "NF-2024-021", customerId: "CUS-10228", name: "Nisha Malhotra",       email: "nisha.m@email.com",         loanType: "Home",      amount: 7200000, rate: 8.35,  tenure: 240, disbursalDate: "2024-02-14", emi: 62450,  paid: 26, status: "on_track",  branch: "Delhi",     accountManager: "Amit Singh" },
  { id: "NF-2023-022", customerId: "CUS-10239", name: "Vikrant Patil",        email: "vikrant.p@email.com",       loanType: "Vehicle",   amount: 900000,  rate: 9.75,  tenure: 60,  disbursalDate: "2023-10-03", emi: 19092,  paid: 30, status: "deferred",  branch: "Pune",      accountManager: "Amol Kulkarni" },
  { id: "NF-2022-023", customerId: "CUS-10247", name: "Shubha Raman",         email: "shubha.r@email.com",        loanType: "Personal",  amount: 250000,  rate: 13.75, tenure: 24,  disbursalDate: "2022-11-28", emi: 11965,  paid: 24, status: "completed", branch: "Bengaluru", accountManager: "Ravi Shankar" },
  { id: "NF-2024-024", customerId: "CUS-10258", name: "Tarun Bajaj",          email: "tarun.b@email.com",         loanType: "Business",  amount: 6000000, rate: 12.25, tenure: 84,  disbursalDate: "2024-04-25", emi: 103698, paid: 24, status: "on_track",  branch: "Mumbai",    accountManager: "Sunita Rao" },
  { id: "NF-2023-025", customerId: "CUS-10264", name: "Meena Krishnan",       email: "meena.k@email.com",         loanType: "Education", amount: 650000,  rate: 8.75,  tenure: 60,  disbursalDate: "2023-07-12", emi: 13440,  paid: 33, status: "on_track",  branch: "Coimbatore",accountManager: "Vijay Kumar" },
];

/* ─── Helpers ────────────────────────────────────────────────── */
const fmtINR = (n: number) =>
  "₹" + n.toLocaleString("en-IN");

const fmtCr = (n: number) =>
  n >= 10_00_000
    ? `₹${(n / 10_00_000).toFixed(2)}L`
    : `₹${(n / 1_000).toFixed(0)}K`;

const LOAN_TYPE_ICON: Record<LoanType, React.FC<{ className?: string }>> = {
  Personal: CreditCard,
  Business: Building2,
  Home: Home,
  Education: GraduationCap,
  Equipment: Wrench,
  Vehicle: Car,
};

const LOAN_TYPE_COLOR: Record<LoanType, string> = {
  Personal:  "bg-purple-50 text-purple-700 border-purple-200",
  Business:  "bg-blue-50 text-blue-700 border-blue-200",
  Home:      "bg-emerald-50 text-emerald-700 border-emerald-200",
  Education: "bg-amber-50 text-amber-700 border-amber-200",
  Equipment: "bg-orange-50 text-orange-700 border-orange-200",
  Vehicle:   "bg-cyan-50 text-cyan-700 border-cyan-200",
};

const STATUS_META: Record<RepayStatus, {
  label: string;
  color: string;
  bg: string;
  border: string;
  dot: string;
  Icon: React.FC<{ className?: string }>;
}> = {
  on_track:  { label: "On Track",  color: "text-[#16A34A]", bg: "bg-green-50",  border: "border-green-200",  dot: "bg-[#16A34A]", Icon: CheckCircle2 },
  completed: { label: "Completed", color: "text-[#0A2540]", bg: "bg-slate-50",  border: "border-slate-300",  dot: "bg-[#334155]", Icon: BadgeCheck },
  overdue:   { label: "Overdue",   color: "text-[#DC2626]", bg: "bg-red-50",    border: "border-red-200",    dot: "bg-[#DC2626]", Icon: AlertCircle },
  deferred:  { label: "Deferred",  color: "text-amber-700", bg: "bg-amber-50",  border: "border-amber-200",  dot: "bg-amber-500", Icon: Pause },
  npa:       { label: "NPA",       color: "text-red-900",   bg: "bg-red-100",   border: "border-red-300",    dot: "bg-red-800",   Icon: Clock },
};

const PAGE_SIZE = 10;

type SortDir = "asc" | "desc";

/* ─── Sort icon ─────────────────────────────────────────────── */
function SortIcon({ col, sortKey, dir }: { col: SortKey; sortKey: SortKey; dir: SortDir }) {
  if (sortKey !== col) return <ChevronsUpDown className="w-3 h-3 text-[#CBD5E1] ml-1 flex-shrink-0" />;
  return dir === "asc"
    ? <ChevronUp className="w-3 h-3 text-[#0A2540] ml-1 flex-shrink-0" />
    : <ChevronDown className="w-3 h-3 text-[#0A2540] ml-1 flex-shrink-0" />;
}

/* ─── Progress bar ──────────────────────────────────────────── */
function RepayProgress({ paid, tenure }: { paid: number; tenure: number }) {
  const pct = Math.min(100, Math.round((paid / tenure) * 100));
  return (
    <div className="flex items-center gap-2 min-w-[80px]">
      <div className="flex-1 h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#0A2540] rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-[#94A3B8] tabular-nums w-7 text-right">{pct}%</span>
    </div>
  );
}

/* ─── Stat card ─────────────────────────────────────────────── */
function StatCard({
  label, value, sub, Icon, accent,
}: {
  label: string; value: string; sub: string;
  Icon: React.FC<{ className?: string }>; accent: string;
}) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 flex items-start gap-4 shadow-sm">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${accent}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <div className="text-xs text-[#94A3B8] mb-1 truncate">{label}</div>
        <div className="text-xl font-bold text-[#0A2540] leading-tight">{value}</div>
        <div className="text-xs text-[#64748B] mt-0.5">{sub}</div>
      </div>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────── */
export function ApprovedLoans() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<RepayStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<LoanType | "all">("all");
  const [disbFrom, setDisbFrom] = useState("");
  const [disbTo, setDisbTo] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("disbursalDate");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);

  /* ── Sort ───────────────────────────────────────────────── */
  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
    setPage(1);
  }

  /* ── Filtered & sorted ──────────────────────────────────── */
  const filtered = useMemo(() => {
    let d = [...RECORDS];
    if (statusFilter !== "all") d = d.filter(r => r.status === statusFilter);
    if (typeFilter !== "all") d = d.filter(r => r.loanType === typeFilter);
    if (disbFrom) d = d.filter(r => r.disbursalDate >= disbFrom);
    if (disbTo) d = d.filter(r => r.disbursalDate <= disbTo);
    if (search.trim()) {
      const q = search.toLowerCase();
      d = d.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.customerId.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.branch.toLowerCase().includes(q)
      );
    }
    d.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "name":         cmp = a.name.localeCompare(b.name); break;
        case "amount":       cmp = a.amount - b.amount; break;
        case "rate":         cmp = a.rate - b.rate; break;
        case "tenure":       cmp = a.tenure - b.tenure; break;
        case "disbursalDate":cmp = a.disbursalDate.localeCompare(b.disbursalDate); break;
        case "status":       cmp = a.status.localeCompare(b.status); break;
        case "emi":          cmp = a.emi - b.emi; break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return d;
  }, [search, statusFilter, typeFilter, disbFrom, disbTo, sortKey, sortDir]);

  /* ── Pagination ─────────────────────────────────────────── */
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  /* ── Summary stats ──────────────────────────────────────── */
  const totalDisbursed = RECORDS.reduce((s, r) => s + r.amount, 0);
  const avgRate = (RECORDS.reduce((s, r) => s + r.rate, 0) / RECORDS.length).toFixed(2);
  const onTrackPct = Math.round((RECORDS.filter(r => r.status === "on_track").length / RECORDS.length) * 100);
  const completedCount = RECORDS.filter(r => r.status === "completed").length;

  const hasFilters = statusFilter !== "all" || typeFilter !== "all" || disbFrom || disbTo || search;

  function resetFilters() {
    setSearch(""); setStatusFilter("all"); setTypeFilter("all");
    setDisbFrom(""); setDisbTo(""); setPage(1);
  }

  /* ── Column header ──────────────────────────────────────── */
  function Th({ col, label, className = "" }: { col: SortKey; label: string; className?: string }) {
    return (
      <th
        onClick={() => handleSort(col)}
        className={`px-4 py-3.5 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider cursor-pointer select-none hover:text-[#0A2540] transition-colors whitespace-nowrap ${className}`}
      >
        <span className="inline-flex items-center">
          {label}
          <SortIcon col={col} sortKey={sortKey} dir={sortDir} />
        </span>
      </th>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Header ──────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] mb-1.5">
              <Link to="/admin" className="hover:text-[#0A2540] transition-colors">Admin</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#0A2540] font-medium">Approved Loans</span>
            </div>
            <h1 className="text-2xl font-bold text-[#0A2540]">Approved Loan Records</h1>
            <p className="text-sm text-[#64748B] mt-0.5">
              All disbursed loans — track repayment health across the portfolio.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0A2540] text-white rounded-lg text-sm font-medium hover:bg-[#0D2F52] transition-all shadow-sm flex-shrink-0">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        {/* ── Stat cards ──────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total Portfolio"
            value={`₹${(totalDisbursed / 1_00_00_000).toFixed(1)}Cr`}
            sub={`${RECORDS.length} active loans`}
            Icon={IndianRupee}
            accent="bg-[#0A2540]/8 text-[#0A2540]"
          />
          <StatCard
            label="On-Time Rate"
            value={`${onTrackPct}%`}
            sub="of borrowers paying on time"
            Icon={TrendingUp}
            accent="bg-green-100 text-[#16A34A]"
          />
          <StatCard
            label="Avg. Interest Rate"
            value={`${avgRate}%`}
            sub="across all loan types"
            Icon={Percent}
            accent="bg-amber-100 text-amber-700"
          />
          <StatCard
            label="Fully Repaid"
            value={`${completedCount}`}
            sub="loans closed successfully"
            Icon={Users}
            accent="bg-blue-100 text-blue-700"
          />
        </div>

        {/* ── Status tabs ─────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-5">
          {(["all", "on_track", "overdue", "completed", "deferred", "npa"] as const).map(s => {
            const counts: Record<string, number> = {
              all: RECORDS.length,
              on_track: RECORDS.filter(r => r.status === "on_track").length,
              overdue: RECORDS.filter(r => r.status === "overdue").length,
              completed: RECORDS.filter(r => r.status === "completed").length,
              deferred: RECORDS.filter(r => r.status === "deferred").length,
              npa: RECORDS.filter(r => r.status === "npa").length,
            };
            const labels: Record<string, string> = { all: "All Loans", on_track: "On Track", overdue: "Overdue", completed: "Completed", deferred: "Deferred", npa: "NPA" };
            const dots: Record<string, string> = { all: "bg-[#0A2540]", on_track: "bg-[#16A34A]", overdue: "bg-[#DC2626]", completed: "bg-[#334155]", deferred: "bg-amber-500", npa: "bg-red-900" };
            const active = statusFilter === s;
            return (
              <button
                key={s}
                onClick={() => { setStatusFilter(s); setPage(1); }}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium border transition-all ${
                  active
                    ? "bg-[#0A2540] text-white border-[#0A2540] shadow-sm"
                    : "bg-white text-[#334155] border-[#E5E7EB] hover:border-[#0A2540]/30 hover:bg-[#F8FAFC]"
                }`}
              >
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${active ? "bg-white/60" : dots[s]}`} />
                {labels[s]}
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${active ? "bg-white/20 text-white" : "bg-[#F1F5F9] text-[#64748B]"}`}>
                  {counts[s]}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Filter bar ──────────────────────────────────────── */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl px-4 py-3.5 mb-5 flex flex-wrap gap-3 items-center shadow-sm">
          {/* Search */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by name, loan ID, branch…"
              className="w-full pl-9 pr-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#0A2540] placeholder-[#94A3B8] bg-[#F8FAFC] focus:outline-none focus:border-[#0A2540] focus:ring-2 focus:ring-[#0A2540]/10 transition-all"
            />
          </div>

          {/* Loan type */}
          <div className="relative">
            <select
              value={typeFilter}
              onChange={e => { setTypeFilter(e.target.value as LoanType | "all"); setPage(1); }}
              className="pl-3 pr-8 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#334155] bg-[#F8FAFC] focus:outline-none focus:border-[#0A2540] appearance-none cursor-pointer min-w-[140px]"
            >
              <option value="all">All Types</option>
              {["Personal", "Business", "Home", "Education", "Equipment", "Vehicle"].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94A3B8] pointer-events-none" />
          </div>

          {/* Date range */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#94A3B8] flex-shrink-0" />
            <input
              type="date"
              value={disbFrom}
              onChange={e => { setDisbFrom(e.target.value); setPage(1); }}
              className="py-2.5 px-3 border border-[#E5E7EB] rounded-lg text-sm text-[#334155] bg-[#F8FAFC] focus:outline-none focus:border-[#0A2540] cursor-pointer"
            />
            <span className="text-xs text-[#94A3B8]">to</span>
            <input
              type="date"
              value={disbTo}
              onChange={e => { setDisbTo(e.target.value); setPage(1); }}
              className="py-2.5 px-3 border border-[#E5E7EB] rounded-lg text-sm text-[#334155] bg-[#F8FAFC] focus:outline-none focus:border-[#0A2540] cursor-pointer"
            />
          </div>

          {hasFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm text-[#64748B] hover:text-[#0A2540] border border-[#E5E7EB] rounded-lg bg-[#F8FAFC] hover:border-[#0A2540]/30 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          )}

          <div className="ml-auto flex items-center gap-1.5 text-xs text-[#94A3B8] flex-shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            {filtered.length} record{filtered.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* ── Table ───────────────────────────────────────────── */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-[#F8FAFC]">
                  <Th col="name"         label="Customer" />
                  <th className="px-4 py-3.5 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider whitespace-nowrap">
                    Loan Type
                  </th>
                  <Th col="amount"       label="Loan Amount" />
                  <Th col="rate"         label="Interest" />
                  <Th col="tenure"       label="Tenure" />
                  <Th col="emi"          label="EMI" />
                  <Th col="disbursalDate"label="Disbursal Date" />
                  <th className="px-4 py-3.5 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider whitespace-nowrap">
                    Repayment
                  </th>
                  <Th col="status"       label="Status" />
                </tr>
              </thead>

              <tbody className="divide-y divide-[#F1F5F9]">
                {pageData.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 bg-[#F1F5F9] rounded-full flex items-center justify-center">
                          <Search className="w-5 h-5 text-[#CBD5E1]" />
                        </div>
                        <p className="text-sm text-[#64748B]">No loan records match your filters.</p>
                        <button onClick={resetFilters} className="text-sm text-[#0A2540] underline underline-offset-2">
                          Clear all filters
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  pageData.map((rec, idx) => {
                    const sm = STATUS_META[rec.status];
                    const TypeIcon = LOAN_TYPE_ICON[rec.loanType];
                    const typeColor = LOAN_TYPE_COLOR[rec.loanType];
                    return (
                      <tr
                        key={rec.id}
                        className={`group transition-colors hover:bg-[#F8FAFC] ${idx % 2 === 0 ? "bg-white" : "bg-[#FAFBFC]"}`}
                      >
                        {/* Customer */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#0A2540] flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs font-bold">
                                {rec.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-semibold text-[#0A2540] truncate max-w-[160px]">{rec.name}</div>
                              <div className="text-xs text-[#94A3B8] font-mono">{rec.id}</div>
                            </div>
                          </div>
                        </td>

                        {/* Loan type */}
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${typeColor}`}>
                            <TypeIcon className="w-3 h-3" />
                            {rec.loanType}
                          </span>
                        </td>

                        {/* Amount */}
                        <td className="px-4 py-4">
                          <div className="text-sm font-bold text-[#0A2540] tabular-nums">{fmtCr(rec.amount)}</div>
                          <div className="text-xs text-[#94A3B8]">{fmtINR(rec.amount)}</div>
                        </td>

                        {/* Rate */}
                        <td className="px-4 py-4">
                          <div className="inline-flex items-center gap-1 px-2 py-1 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg">
                            <span className="text-sm font-semibold text-[#0A2540] tabular-nums">{rec.rate.toFixed(2)}</span>
                            <span className="text-xs text-[#94A3B8]">%</span>
                          </div>
                        </td>

                        {/* Tenure */}
                        <td className="px-4 py-4 text-sm text-[#334155] tabular-nums whitespace-nowrap">
                          {rec.tenure >= 12
                            ? `${Math.floor(rec.tenure / 12)}y ${rec.tenure % 12 > 0 ? `${rec.tenure % 12}m` : ""}`
                            : `${rec.tenure}m`}
                        </td>

                        {/* EMI */}
                        <td className="px-4 py-4">
                          <div className="text-sm font-medium text-[#334155] tabular-nums">{fmtINR(rec.emi)}</div>
                          <div className="text-xs text-[#94A3B8]">per month</div>
                        </td>

                        {/* Disbursal Date */}
                        <td className="px-4 py-4 text-sm text-[#64748B] whitespace-nowrap tabular-nums">
                          {new Date(rec.disbursalDate).toLocaleDateString("en-IN", {
                            day: "2-digit", month: "short", year: "numeric",
                          })}
                        </td>

                        {/* Repayment progress */}
                        <td className="px-4 py-4">
                          <div className="flex flex-col gap-1">
                            <RepayProgress paid={rec.paid} tenure={rec.tenure} />
                            <span className="text-xs text-[#94A3B8]">{rec.paid}/{rec.tenure} EMIs</span>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${sm.bg} ${sm.border} ${sm.color}`}>
                            <sm.Icon className="w-3 h-3 flex-shrink-0" />
                            {sm.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* ── Table footer / pagination ──────────────────────── */}
          <div className="px-5 py-4 border-t border-[#F1F5F9] bg-[#F8FAFC] flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Info */}
            <p className="text-xs text-[#94A3B8] order-2 sm:order-1">
              Showing{" "}
              <span className="font-semibold text-[#334155]">
                {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-[#334155]">{filtered.length}</span> records
            </p>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center gap-1 order-1 sm:order-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E5E7EB] text-[#64748B] hover:border-[#0A2540] hover:text-[#0A2540] disabled:opacity-40 disabled:cursor-not-allowed transition-all bg-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                  .reduce<(number | "…")[]>((acc, p, idx, arr) => {
                    if (idx > 0 && typeof arr[idx - 1] === "number" && (p as number) - (arr[idx - 1] as number) > 1) acc.push("…");
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) =>
                    p === "…" ? (
                      <span key={`ellipsis-${i}`} className="w-8 text-center text-xs text-[#94A3B8]">…</span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setPage(p as number)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-all border ${
                          page === p
                            ? "bg-[#0A2540] text-white border-[#0A2540] shadow-sm"
                            : "bg-white text-[#334155] border-[#E5E7EB] hover:border-[#0A2540]/40 hover:text-[#0A2540]"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}

                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E5E7EB] text-[#64748B] hover:border-[#0A2540] hover:text-[#0A2540] disabled:opacity-40 disabled:cursor-not-allowed transition-all bg-white"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Legend ──────────────────────────────────────────── */}
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#94A3B8]">
          <span className="font-medium text-[#64748B]">Repayment Status:</span>
          {(Object.entries(STATUS_META) as [RepayStatus, typeof STATUS_META[RepayStatus]][]).map(([key, m]) => (
            <span key={key} className="inline-flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${m.dot}`} />
              {m.label}
            </span>
          ))}
          <span className="ml-auto">NPA = Non-Performing Asset (90+ days overdue)</span>
        </div>
      </div>
    </div>
  );
}

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router";
import {
  Search, ChevronRight, ChevronLeft, Bell, CheckCircle2,
  AlertCircle, Clock, Eye, CalendarDays, IndianRupee,
  AlertTriangle, TrendingUp, X, Info, RotateCcw,
  ChevronDown, Filter, BadgeCheck, Loader2, Users,
} from "lucide-react";

/* ─── Types ───────────────────────────────────────────────────── */
type PayStatus = "paid" | "overdue" | "due_today" | "upcoming" | "partial";

interface EMIRecord {
  id: string;
  loanId: string;
  customerId: string;
  name: string;
  phone: string;
  email: string;
  loanType: string;
  emiAmount: number;
  dueDate: string;          // ISO date
  paidAmount?: number;
  status: PayStatus;
  daysOverdue: number;
  branch: string;
  accountManager: string;
  reminderSent: boolean;
}

/* ─── Seed data ───────────────────────────────────────────────── */
// Today = April 30 2026
const SEED: EMIRecord[] = [
  { id:"EMI-001",loanId:"NF-2024-001",customerId:"CUS-10021",name:"Ananya Kapoor",    phone:"98201 23456",email:"ananya.k@email.com",   loanType:"Home Loan",       emiAmount:70076, dueDate:"2026-04-25",status:"overdue",   daysOverdue:5, branch:"Bengaluru",   accountManager:"Ravi Shankar",  reminderSent:true  },
  { id:"EMI-002",loanId:"NF-2024-002",customerId:"CUS-10034",name:"Arjun Desai",      phone:"97302 34567",email:"arjun.d@email.com",    loanType:"Business Loan",   emiAmount:46819, dueDate:"2026-04-28",status:"overdue",   daysOverdue:2, branch:"Ahmedabad",   accountManager:"Meena Joshi",   reminderSent:false },
  { id:"EMI-003",loanId:"NF-2024-003",customerId:"CUS-10047",name:"Deepa Iyer",       phone:"91203 45678",email:"deepa.i@email.com",    loanType:"Equipment Loan",  emiAmount:30915, dueDate:"2026-04-30",status:"due_today", daysOverdue:0, branch:"Bengaluru",   accountManager:"Ravi Shankar",  reminderSent:true  },
  { id:"EMI-004",loanId:"NF-2024-004",customerId:"CUS-10058",name:"Rajesh Kumar",     phone:"88001 56789",email:"rajesh.k@email.com",   loanType:"Business Loan",   emiAmount:140287,dueDate:"2026-04-30",status:"due_today", daysOverdue:0, branch:"Mumbai",      accountManager:"Sunita Rao",    reminderSent:false },
  { id:"EMI-005",loanId:"NF-2023-005",customerId:"CUS-10063",name:"Priya Mehta",      phone:"99001 67890",email:"priya.m@email.com",    loanType:"Personal Loan",   emiAmount:16973, dueDate:"2026-04-20",status:"overdue",   daysOverdue:10,branch:"Mumbai",      accountManager:"Sunita Rao",    reminderSent:true  },
  { id:"EMI-006",loanId:"NF-2023-006",customerId:"CUS-10071",name:"Nikhil Joshi",     phone:"87501 78901",email:"nikhil.j@email.com",   loanType:"Vehicle Loan",    emiAmount:22939, dueDate:"2026-04-28",status:"paid",      daysOverdue:0, branch:"Nagpur",      accountManager:"Kiran Patil",   reminderSent:false },
  { id:"EMI-007",loanId:"NF-2024-007",customerId:"CUS-10082",name:"Suman Verma",      phone:"76001 89012",email:"suman.v@email.com",    loanType:"Home Loan",       emiAmount:45063, dueDate:"2026-04-29",status:"paid",      daysOverdue:0, branch:"Delhi",       accountManager:"Amit Singh",    reminderSent:false },
  { id:"EMI-008",loanId:"NF-2024-008",customerId:"CUS-10095",name:"Rohan Pillai",     phone:"95201 90123",email:"rohan.p@email.com",    loanType:"Education Loan",  emiAmount:17117, dueDate:"2026-05-01",status:"upcoming",  daysOverdue:0, branch:"Kochi",       accountManager:"Divya Nair",    reminderSent:false },
  { id:"EMI-009",loanId:"NF-2024-010",customerId:"CUS-10114",name:"Farhan Sheikh",    phone:"84501 01234",email:"farhan.s@email.com",   loanType:"Business Loan",   emiAmount:55610, dueDate:"2026-04-15",status:"overdue",   daysOverdue:15,branch:"Hyderabad",   accountManager:"Lakshmi Rao",   reminderSent:true  },
  { id:"EMI-010",loanId:"NF-2024-011",customerId:"CUS-10128",name:"Kavitha Reddy",    phone:"73201 12345",email:"kavitha.r@email.com",  loanType:"Home Loan",       emiAmount:51637, dueDate:"2026-04-27",status:"paid",      daysOverdue:0, branch:"Hyderabad",   accountManager:"Lakshmi Rao",   reminderSent:false },
  { id:"EMI-011",loanId:"NF-2023-012",customerId:"CUS-10136",name:"Manish Tiwari",    phone:"92301 23456",email:"manish.t@email.com",   loanType:"Vehicle Loan",    emiAmount:18872, dueDate:"2026-04-10",status:"overdue",   daysOverdue:20,branch:"Lucknow",     accountManager:"Shalini Gupta", reminderSent:true  },
  { id:"EMI-012",loanId:"NF-2024-013",customerId:"CUS-10149",name:"Lakshmi Narayanan",phone:"81401 34567",email:"lakshmi.n@email.com",  loanType:"Education Loan",  emiAmount:16399, dueDate:"2026-05-01",status:"upcoming",  daysOverdue:0, branch:"Chennai",     accountManager:"Vijay Kumar",   reminderSent:false },
  { id:"EMI-013",loanId:"NF-2024-015",customerId:"CUS-10162",name:"Swati Agarwal",    phone:"96701 45678",email:"swati.a@email.com",    loanType:"Personal Loan",   emiAmount:16044, paidAmount:8000,dueDate:"2026-04-25",status:"partial", daysOverdue:5, branch:"Pune",       accountManager:"Amol Kulkarni", reminderSent:true  },
  { id:"EMI-014",loanId:"NF-2023-016",customerId:"CUS-10175",name:"Harish Menon",     phone:"94501 56789",email:"harish.m@email.com",   loanType:"Home Loan",       emiAmount:48282, dueDate:"2026-04-29",status:"paid",      daysOverdue:0, branch:"Kochi",       accountManager:"Divya Nair",    reminderSent:false },
  { id:"EMI-015",loanId:"NF-2024-017",customerId:"CUS-10188",name:"Rina Bose",        phone:"83301 67890",email:"rina.b@email.com",     loanType:"Education Loan",  emiAmount:15775, dueDate:"2026-05-03",status:"upcoming",  daysOverdue:0, branch:"Kolkata",     accountManager:"Subhash Das",   reminderSent:false },
  { id:"EMI-016",loanId:"NF-2024-019",customerId:"CUS-10201",name:"Pooja Choudhary",  phone:"72401 78901",email:"pooja.c@email.com",    loanType:"Personal Loan",   emiAmount:18895, dueDate:"2026-04-30",status:"due_today", daysOverdue:0, branch:"Chandigarh",  accountManager:"Ajay Sharma",   reminderSent:false },
  { id:"EMI-017",loanId:"NF-2023-020",customerId:"CUS-10215",name:"Arun Krishnamurthy",phone:"91801 89012",email:"arun.k@email.com",   loanType:"Business Loan",   emiAmount:76413, dueDate:"2026-04-26",status:"paid",      daysOverdue:0, branch:"Chennai",     accountManager:"Vijay Kumar",   reminderSent:false },
  { id:"EMI-018",loanId:"NF-2024-021",customerId:"CUS-10228",name:"Nisha Malhotra",   phone:"80501 90123",email:"nisha.m@email.com",    loanType:"Home Loan",       emiAmount:62450, dueDate:"2026-04-22",status:"overdue",   daysOverdue:8, branch:"Delhi",       accountManager:"Amit Singh",    reminderSent:false },
  { id:"EMI-019",loanId:"NF-2023-022",customerId:"CUS-10239",name:"Vikrant Patil",    phone:"99901 01234",email:"vikrant.p@email.com",  loanType:"Vehicle Loan",    emiAmount:19092, paidAmount:9500,dueDate:"2026-04-20",status:"partial", daysOverdue:10,branch:"Pune",       accountManager:"Amol Kulkarni", reminderSent:true  },
  { id:"EMI-020",loanId:"NF-2024-024",customerId:"CUS-10258",name:"Tarun Bajaj",      phone:"88801 12345",email:"tarun.b@email.com",    loanType:"Business Loan",   emiAmount:103698,dueDate:"2026-04-29",status:"paid",      daysOverdue:0, branch:"Mumbai",      accountManager:"Sunita Rao",    reminderSent:false },
  { id:"EMI-021",loanId:"NF-2023-025",customerId:"CUS-10264",name:"Meena Krishnan",   phone:"77601 23456",email:"meena.k@email.com",   loanType:"Education Loan",  emiAmount:13440, dueDate:"2026-05-05",status:"upcoming",  daysOverdue:0, branch:"Coimbatore",  accountManager:"Vijay Kumar",   reminderSent:false },
  { id:"EMI-022",loanId:"NF-2024-022",customerId:"CUS-10280",name:"Karan Mehta",      phone:"96201 34567",email:"karan.m@email.com",   loanType:"Business Loan",   emiAmount:89100, dueDate:"2026-04-05",status:"overdue",   daysOverdue:25,branch:"Mumbai",      accountManager:"Sunita Rao",    reminderSent:true  },
  { id:"EMI-023",loanId:"NF-2024-023",customerId:"CUS-10291",name:"Divya Sharma",     phone:"85001 45678",email:"divya.s@email.com",   loanType:"Home Loan",       emiAmount:38750, dueDate:"2026-04-30",status:"due_today", daysOverdue:0, branch:"Delhi",       accountManager:"Amit Singh",    reminderSent:true  },
  { id:"EMI-024",loanId:"NF-2024-025",customerId:"CUS-10305",name:"Ravi Patel",       phone:"73901 56789",email:"ravi.p@email.com",    loanType:"Personal Loan",   emiAmount:24500, dueDate:"2026-04-28",status:"paid",      daysOverdue:0, branch:"Surat",       accountManager:"Meena Joshi",   reminderSent:false },
  { id:"EMI-025",loanId:"NF-2023-026",customerId:"CUS-10318",name:"Sunita Jain",      phone:"62801 67890",email:"sunita.j@email.com",  loanType:"Equipment Loan",  emiAmount:42300, dueDate:"2026-04-18",status:"overdue",   daysOverdue:12,branch:"Jaipur",      accountManager:"Pooja Agarwal", reminderSent:false },
];

/* ─── Constants ────────────────────────────────────────────────── */
const fmtINR = (n: number) => "₹" + n.toLocaleString("en-IN");
const PAGE_SIZE = 10;

const STATUS_CFG: Record<PayStatus, {
  label: string; rowBg: string; rowHover: string;
  badge: string; dot: string; Icon: React.FC<{className?:string}>;
}> = {
  paid:      { label:"Paid",      rowBg:"bg-white",          rowHover:"hover:bg-[#F8FAFC]",  badge:"bg-green-50 text-[#16A34A] border-green-200",  dot:"bg-[#16A34A]",   Icon:BadgeCheck     },
  due_today: { label:"Due Today", rowBg:"bg-amber-50/60",    rowHover:"hover:bg-amber-50",   badge:"bg-amber-50 text-amber-700 border-amber-200",   dot:"bg-amber-500",   Icon:Clock          },
  overdue:   { label:"Overdue",   rowBg:"bg-red-50/70",      rowHover:"hover:bg-red-50",     badge:"bg-red-50 text-[#DC2626] border-red-200",       dot:"bg-[#DC2626]",   Icon:AlertCircle    },
  partial:   { label:"Partial",   rowBg:"bg-orange-50/60",   rowHover:"hover:bg-orange-50",  badge:"bg-orange-50 text-orange-700 border-orange-200",dot:"bg-orange-500",  Icon:AlertTriangle  },
  upcoming:  { label:"Upcoming",  rowBg:"bg-white",          rowHover:"hover:bg-[#F8FAFC]",  badge:"bg-blue-50 text-blue-700 border-blue-200",      dot:"bg-blue-400",    Icon:CalendarDays   },
};

/* ─── Toast ─────────────────────────────────────────────────────── */
interface Toast { id: number; msg: string; type: "success"|"info"|"error" }
let toastId = 0;

/* ─── Tooltip portal ─────────────────────────────────────────────── */
interface TooltipData {
  record: EMIRecord;
  x: number; y: number;
}

/* ─── Main ───────────────────────────────────────────────────────── */
export function EMITracker() {
  const [records, setRecords] = useState<EMIRecord[]>(SEED);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<PayStatus|"all">("all");
  const [page, setPage] = useState(1);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [loadingId, setLoadingId] = useState<string|null>(null);
  const [confirmPay, setConfirmPay] = useState<string|null>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  /* ── Toast helpers ── */
  const pushToast = useCallback((msg: string, type: Toast["type"] = "success") => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3800);
  }, []);

  /* ── Filter + paginate ── */
  const filtered = useMemo(() => {
    let d = [...records];
    if (statusFilter !== "all") d = d.filter(r => r.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      d = d.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.loanId.toLowerCase().includes(q) ||
        r.phone.includes(q) ||
        r.branch.toLowerCase().includes(q) ||
        r.loanType.toLowerCase().includes(q)
      );
    }
    // Sort: overdue first (desc days), then due_today, then partial, then upcoming, then paid
    const order: Record<PayStatus,number> = { overdue:0, due_today:1, partial:2, upcoming:3, paid:4 };
    d.sort((a,b) => {
      const od = order[a.status] - order[b.status];
      if (od !== 0) return od;
      if (a.status === "overdue") return b.daysOverdue - a.daysOverdue;
      return a.dueDate.localeCompare(b.dueDate);
    });
    return d;
  }, [records, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  /* ── Summary stats ── */
  const totalDue = records.filter(r => ["overdue","due_today","partial","upcoming"].includes(r.status))
    .reduce((s,r) => s + r.emiAmount - (r.paidAmount??0), 0);
  const overdueCount  = records.filter(r => r.status === "overdue").length;
  const overdueAmount = records.filter(r => r.status === "overdue").reduce((s,r) => s + r.emiAmount, 0);
  const collectedToday = records.filter(r => r.status === "paid" && r.dueDate >= "2026-04-29")
    .reduce((s,r) => s + r.emiAmount, 0);
  const dueTodayCount = records.filter(r => r.status === "due_today").length;

  /* ── Actions ── */
  async function handleMarkPaid(id: string) {
    setLoadingId(id);
    await new Promise(r => setTimeout(r, 900));
    setRecords(prev => prev.map(r => r.id === id ? { ...r, status:"paid", daysOverdue:0, paidAmount:undefined } : r));
    setLoadingId(null);
    setConfirmPay(null);
    pushToast("EMI marked as paid successfully.", "success");
  }

  function handleSendReminder(id: string) {
    setRecords(prev => prev.map(r => r.id === id ? { ...r, reminderSent:true } : r));
    const rec = records.find(r => r.id === id);
    pushToast(`Reminder sent to ${rec?.name} (${rec?.phone})`, "info");
  }

  /* ── Tooltip position ── */
  function handleRowEnter(e: React.MouseEvent, record: EMIRecord) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const tableRect = tableRef.current?.getBoundingClientRect();
    if (!tableRect) return;
    setTooltip({
      record,
      x: rect.right - tableRect.left - 320,
      y: rect.top - tableRect.top + rect.height / 2,
    });
  }

  /* ── Dismiss tooltip on scroll ── */
  useEffect(() => {
    const el = tableRef.current;
    if (!el) return;
    const hide = () => setTooltip(null);
    el.addEventListener("scroll", hide);
    return () => el.removeEventListener("scroll", hide);
  }, []);

  const hasFilters = statusFilter !== "all" || search.trim();

  /* ── Tab counts ── */
  const counts: Record<string,number> = {
    all: records.length,
    overdue: records.filter(r=>r.status==="overdue").length,
    due_today: records.filter(r=>r.status==="due_today").length,
    partial: records.filter(r=>r.status==="partial").length,
    upcoming: records.filter(r=>r.status==="upcoming").length,
    paid: records.filter(r=>r.status==="paid").length,
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* ── Toast stack ─────────────────────────────────────────── */}
      <div className="fixed top-5 right-5 z-[999] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border max-w-xs text-sm font-medium animate-in fade-in slide-in-from-right-4 duration-300 ${
              t.type==="success" ? "bg-white border-green-200 text-[#0A2540]" :
              t.type==="info"    ? "bg-white border-blue-200  text-[#0A2540]" :
                                   "bg-white border-red-200   text-[#DC2626]"
            }`}
          >
            {t.type==="success" && <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0"/>}
            {t.type==="info"    && <Bell         className="w-4 h-4 text-blue-500 flex-shrink-0"/>}
            {t.type==="error"   && <AlertCircle  className="w-4 h-4 text-[#DC2626] flex-shrink-0"/>}
            <span>{t.msg}</span>
            <button onClick={()=>setToasts(p=>p.filter(x=>x.id!==t.id))} className="ml-auto text-[#94A3B8] hover:text-[#334155]">
              <X className="w-3.5 h-3.5"/>
            </button>
          </div>
        ))}
      </div>

      {/* ── Confirm dialog ──────────────────────────────────────── */}
      {confirmPay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A2540]/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] w-full max-w-sm mx-4 overflow-hidden">
            <div className="px-6 pt-6 pb-4">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-[#16A34A]"/>
              </div>
              <h3 className="text-base font-bold text-[#0A2540] mb-1">Confirm Payment</h3>
              <p className="text-sm text-[#64748B]">
                Mark this EMI as <span className="font-semibold text-[#16A34A]">paid</span>?{" "}
                This will update the repayment status and cannot be undone.
              </p>
            </div>
            <div className="px-6 pb-5 flex gap-3">
              <button
                onClick={()=>setConfirmPay(null)}
                className="flex-1 px-4 py-2.5 border border-[#E5E7EB] rounded-lg text-sm font-medium text-[#334155] hover:bg-[#F8FAFC] transition-all"
              >
                Cancel
              </button>
              <button
                onClick={()=>handleMarkPaid(confirmPay)}
                disabled={!!loadingId}
                className="flex-1 px-4 py-2.5 bg-[#16A34A] text-white rounded-lg text-sm font-medium hover:bg-[#15803D] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loadingId ? <Loader2 className="w-4 h-4 animate-spin"/> : <CheckCircle2 className="w-4 h-4"/>}
                Mark Paid
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Breadcrumb + header ──────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] mb-2">
            <Link to="/admin" className="hover:text-[#0A2540] transition-colors">Admin</Link>
            <ChevronRight className="w-3 h-3"/>
            <span className="text-[#0A2540] font-medium">EMI Tracker</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-[#0A2540]">EMI Payment Tracker</h1>
              <p className="text-sm text-[#64748B] mt-0.5">Monitor collections, act on overdue EMIs, and maintain repayment health.</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#94A3B8] bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 shadow-sm">
              <CalendarDays className="w-3.5 h-3.5"/>
              <span>As of <span className="font-semibold text-[#334155]">30 Apr 2026</span></span>
            </div>
          </div>
        </div>

        {/* ── Summary cards ───────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total EMI Due */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-[#0A2540]/8 rounded-lg flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-[#0A2540]"/>
              </div>
              <span className="text-xs text-[#94A3B8] bg-[#F1F5F9] px-2 py-0.5 rounded-full">Pending</span>
            </div>
            <div className="text-2xl font-bold text-[#0A2540]">{fmtINR(totalDue)}</div>
            <div className="text-xs text-[#64748B] mt-0.5">Total EMI Due</div>
            <div className="mt-3 h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
              <div className="h-full bg-[#0A2540] rounded-full" style={{width:"62%"}}/>
            </div>
            <div className="text-xs text-[#94A3B8] mt-1">62% collection rate</div>
          </div>

          {/* Overdue EMIs */}
          <div className="bg-white border border-red-200 rounded-xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-50/60 to-transparent pointer-events-none"/>
            <div className="relative">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-[#DC2626]"/>
                </div>
                <span className="text-xs text-[#DC2626] bg-red-50 border border-red-200 px-2 py-0.5 rounded-full font-medium animate-pulse">Urgent</span>
              </div>
              <div className="text-2xl font-bold text-[#DC2626]">{overdueCount}</div>
              <div className="text-xs text-[#64748B] mt-0.5">Overdue EMIs</div>
              <div className="text-xs text-red-600 font-medium mt-2">{fmtINR(overdueAmount)} at risk</div>
            </div>
          </div>

          {/* Due Today */}
          <div className="bg-white border border-amber-200 rounded-xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 to-transparent pointer-events-none"/>
            <div className="relative">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-700"/>
                </div>
                <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-medium">Today</span>
              </div>
              <div className="text-2xl font-bold text-amber-700">{dueTodayCount}</div>
              <div className="text-xs text-[#64748B] mt-0.5">EMIs Due Today</div>
              <div className="text-xs text-amber-600 font-medium mt-2">Action needed before EOD</div>
            </div>
          </div>

          {/* Collected Today */}
          <div className="bg-white border border-green-200 rounded-xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent pointer-events-none"/>
            <div className="relative">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#16A34A]"/>
                </div>
                <span className="text-xs text-[#16A34A] bg-green-50 border border-green-200 px-2 py-0.5 rounded-full font-medium">Live</span>
              </div>
              <div className="text-2xl font-bold text-[#16A34A]">{fmtINR(collectedToday)}</div>
              <div className="text-xs text-[#64748B] mt-0.5">Collected Today</div>
              <div className="text-xs text-[#16A34A] font-medium mt-2">{records.filter(r=>r.status==="paid").length} EMIs cleared</div>
            </div>
          </div>
        </div>

        {/* ── Status tabs ─────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-5">
          {(["all","overdue","due_today","partial","upcoming","paid"] as const).map(s => {
            const labels: Record<string,string> = { all:"All EMIs", overdue:"Overdue", due_today:"Due Today", partial:"Partial", upcoming:"Upcoming", paid:"Paid" };
            const dots:   Record<string,string> = { all:"bg-[#0A2540]", overdue:"bg-[#DC2626]", due_today:"bg-amber-500", partial:"bg-orange-500", upcoming:"bg-blue-400", paid:"bg-[#16A34A]" };
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
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${active ? "bg-white/60" : dots[s]}`}/>
                {labels[s]}
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${active ? "bg-white/20 text-white" : "bg-[#F1F5F9] text-[#64748B]"}`}>
                  {counts[s]}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Search & filter bar ──────────────────────────────── */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl px-4 py-3.5 mb-5 flex flex-wrap gap-3 items-center shadow-sm">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none"/>
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by name, loan ID, branch, type…"
              className="w-full pl-9 pr-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#0A2540] placeholder-[#94A3B8] bg-[#F8FAFC] focus:outline-none focus:border-[#0A2540] focus:ring-2 focus:ring-[#0A2540]/10 transition-all"
            />
          </div>

          {hasFilters && (
            <button
              onClick={() => { setSearch(""); setStatusFilter("all"); setPage(1); }}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm text-[#64748B] hover:text-[#0A2540] border border-[#E5E7EB] rounded-lg bg-[#F8FAFC] hover:border-[#0A2540]/30 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5"/> Reset
            </button>
          )}

          <div className="ml-auto flex items-center gap-1.5 text-xs text-[#94A3B8] flex-shrink-0">
            <Filter className="w-3.5 h-3.5"/>
            <span><span className="font-semibold text-[#334155]">{filtered.length}</span> records</span>
          </div>
        </div>

        {/* ── Overdue alert banner ─────────────────────────────── */}
        {overdueCount > 0 && statusFilter !== "paid" && statusFilter !== "upcoming" && (
          <div className="mb-5 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-[#DC2626]">
            <AlertCircle className="w-4 h-4 flex-shrink-0"/>
            <span>
              <span className="font-semibold">{overdueCount} overdue EMIs</span> totalling{" "}
              <span className="font-semibold">{fmtINR(overdueAmount)}</span> require immediate action.
              Rows highlighted in red below.
            </span>
          </div>
        )}

        {/* ── Legend ──────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-[#94A3B8] mb-3 pl-1">
          <span className="font-medium text-[#64748B] flex items-center gap-1"><Info className="w-3 h-3"/> Row colors:</span>
          {(Object.entries(STATUS_CFG) as [PayStatus, typeof STATUS_CFG[PayStatus]][]).map(([k,v]) => (
            <span key={k} className="inline-flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-sm ${
                k==="overdue"?"bg-red-200": k==="due_today"?"bg-amber-200": k==="partial"?"bg-orange-200":k==="paid"?"bg-green-100":"bg-[#F1F5F9]"
              }`}/>
              {v.label}
            </span>
          ))}
          <span className="ml-auto italic">Hover any row for details</span>
        </div>

        {/* ── Table ───────────────────────────────────────────── */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto relative" ref={tableRef}>

            {/* Hover tooltip */}
            {tooltip && (
              <div
                className="absolute z-40 pointer-events-none"
                style={{ left: tooltip.x, top: tooltip.y, transform:"translateY(-50%)" }}
              >
                <div className="bg-[#0A2540] text-white rounded-xl shadow-2xl border border-white/10 p-4 w-72 text-xs">
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/15">
                    <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center font-bold text-sm">
                      {tooltip.record.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
                    </div>
                    <div>
                      <div className="font-semibold">{tooltip.record.name}</div>
                      <div className="text-white/60">{tooltip.record.customerId}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-white/80">
                    <div><span className="text-white/50 block">Loan ID</span>{tooltip.record.loanId}</div>
                    <div><span className="text-white/50 block">Type</span>{tooltip.record.loanType}</div>
                    <div><span className="text-white/50 block">Phone</span>{tooltip.record.phone}</div>
                    <div><span className="text-white/50 block">Branch</span>{tooltip.record.branch}</div>
                    <div className="col-span-2"><span className="text-white/50 block">Account Manager</span>{tooltip.record.accountManager}</div>
                    {tooltip.record.paidAmount && (
                      <div className="col-span-2">
                        <span className="text-white/50 block">Partial Paid</span>
                        <span className="text-amber-300">{fmtINR(tooltip.record.paidAmount)}</span>
                        <span className="text-white/40"> / {fmtINR(tooltip.record.emiAmount)}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/15 flex items-center gap-1.5 text-white/50">
                    <Info className="w-3 h-3"/>
                    <span>Reminder {tooltip.record.reminderSent ? "sent ✓" : "not sent"}</span>
                  </div>
                </div>
              </div>
            )}

            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-[#F8FAFC]">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3.5 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">Loan Type</th>
                  <th className="px-4 py-3.5 text-right text-xs font-semibold text-[#64748B] uppercase tracking-wider">EMI Amount</th>
                  <th className="px-4 py-3.5 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">Due Date</th>
                  <th className="px-4 py-3.5 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3.5 text-center text-xs font-semibold text-[#64748B] uppercase tracking-wider">Days Overdue</th>
                  <th className="px-4 py-3.5 text-center text-xs font-semibold text-[#64748B] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {pageData.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 bg-[#F1F5F9] rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-[#CBD5E1]"/>
                        </div>
                        <p className="text-sm text-[#64748B]">No records match your filters.</p>
                        <button onClick={()=>{setSearch("");setStatusFilter("all");}} className="text-sm text-[#0A2540] underline underline-offset-2">
                          Clear filters
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : pageData.map((rec) => {
                  const cfg = STATUS_CFG[rec.status];
                  const StatusIcon = cfg.Icon;
                  const isLoading = loadingId === rec.id;
                  return (
                    <tr
                      key={rec.id}
                      className={`group transition-colors ${cfg.rowBg} ${cfg.rowHover} cursor-default`}
                      onMouseEnter={e => handleRowEnter(e, rec)}
                      onMouseLeave={() => setTooltip(null)}
                    >
                      {/* Customer */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs text-white ${
                            rec.status==="overdue" ? "bg-[#DC2626]" :
                            rec.status==="due_today" ? "bg-amber-600" :
                            rec.status==="partial" ? "bg-orange-600" :
                            rec.status==="paid" ? "bg-[#16A34A]" : "bg-[#0A2540]"
                          }`}>
                            {rec.name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-[#0A2540] truncate max-w-[150px]">{rec.name}</div>
                            <div className="text-xs text-[#94A3B8] font-mono">{rec.loanId}</div>
                          </div>
                        </div>
                      </td>

                      {/* Loan type */}
                      <td className="px-4 py-4 text-sm text-[#64748B] whitespace-nowrap">{rec.loanType}</td>

                      {/* EMI Amount */}
                      <td className="px-4 py-4 text-right">
                        <div className="text-sm font-bold text-[#0A2540]">{fmtINR(rec.emiAmount)}</div>
                        {rec.paidAmount && (
                          <div className="text-xs text-orange-600 font-medium">{fmtINR(rec.paidAmount)} paid</div>
                        )}
                      </td>

                      {/* Due Date */}
                      <td className="px-4 py-4 text-sm text-[#64748B] whitespace-nowrap">
                        {new Date(rec.dueDate).toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" })}
                      </td>

                      {/* Status badge */}
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${cfg.badge}`}>
                          <StatusIcon className="w-3 h-3 flex-shrink-0"/>
                          {cfg.label}
                        </span>
                      </td>

                      {/* Days Overdue */}
                      <td className="px-4 py-4 text-center">
                        {rec.daysOverdue > 0 ? (
                          <span className={`inline-flex items-center justify-center min-w-[3.5rem] px-2.5 py-1 rounded-full text-xs font-bold ${
                            rec.daysOverdue >= 20 ? "bg-red-200 text-red-900" :
                            rec.daysOverdue >= 10 ? "bg-red-100 text-[#DC2626]" :
                            "bg-red-50 text-red-600"
                          }`}>
                            {rec.daysOverdue}d
                          </span>
                        ) : (
                          <span className="text-[#CBD5E1] text-sm">—</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Send Reminder */}
                          {rec.status !== "paid" && (
                            <button
                              onClick={() => handleSendReminder(rec.id)}
                              title={rec.reminderSent ? "Reminder already sent" : "Send payment reminder"}
                              className={`group/btn inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                                rec.reminderSent
                                  ? "bg-[#F1F5F9] text-[#94A3B8] border-[#E5E7EB] cursor-default"
                                  : "bg-white text-[#334155] border-[#E5E7EB] hover:border-[#0A2540] hover:text-[#0A2540] hover:bg-[#F8FAFC] shadow-sm"
                              }`}
                              disabled={rec.reminderSent}
                            >
                              <Bell className="w-3 h-3"/>
                              <span className="hidden sm:inline">{rec.reminderSent ? "Sent" : "Remind"}</span>
                            </button>
                          )}

                          {/* Mark Paid */}
                          {rec.status !== "paid" && (
                            <button
                              onClick={() => setConfirmPay(rec.id)}
                              disabled={isLoading}
                              title="Mark as paid"
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-[#16A34A] text-white hover:bg-[#15803D] transition-all shadow-sm disabled:opacity-60"
                            >
                              {isLoading
                                ? <Loader2 className="w-3 h-3 animate-spin"/>
                                : <CheckCircle2 className="w-3 h-3"/>}
                              <span className="hidden sm:inline">Mark Paid</span>
                            </button>
                          )}

                          {/* Paid badge */}
                          {rec.status === "paid" && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-green-50 text-[#16A34A] border border-green-200">
                              <BadgeCheck className="w-3 h-3"/> Cleared
                            </span>
                          )}

                          {/* View Account */}
                          <Link
                            to="/admin/approved-loans"
                            title="View full account"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white text-[#334155] border border-[#E5E7EB] hover:border-[#0A2540] hover:text-[#0A2540] transition-all shadow-sm"
                          >
                            <Eye className="w-3 h-3"/>
                            <span className="hidden sm:inline">Account</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ── Footer / Pagination ─────────────────────────────── */}
          <div className="px-5 py-4 border-t border-[#F1F5F9] bg-[#F8FAFC] flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-[#94A3B8] order-2 sm:order-1">
              Showing{" "}
              <span className="font-semibold text-[#334155]">
                {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)}
              </span>{" "}
              of <span className="font-semibold text-[#334155]">{filtered.length}</span> records
            </p>

            {totalPages > 1 && (
              <div className="flex items-center gap-1 order-1 sm:order-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E5E7EB] text-[#64748B] hover:border-[#0A2540] hover:text-[#0A2540] disabled:opacity-40 disabled:cursor-not-allowed transition-all bg-white"
                >
                  <ChevronLeft className="w-4 h-4"/>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                  .reduce<(number | "…")[]>((acc, p, idx, arr) => {
                    if (idx > 0 && typeof arr[idx-1] === "number" && (p as number) - (arr[idx-1] as number) > 1) acc.push("…");
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) =>
                    p === "…" ? (
                      <span key={`e-${i}`} className="w-8 text-center text-xs text-[#94A3B8]">…</span>
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
                  <ChevronRight className="w-4 h-4"/>
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

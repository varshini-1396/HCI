import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ChevronRight, ArrowLeft, Mail, Phone, MapPin, Briefcase,
  Building2, Calendar, ShieldCheck, AlertTriangle, Ban,
  CheckCircle2, XCircle, Clock, CreditCard, TrendingUp,
  BadgeCheck, AlertCircle, FileText, IndianRupee, Percent,
  ChevronDown, ChevronUp, User, Star,
} from "lucide-react";
import {
  CUSTOMERS, getCreditLabel, STATUS_CFG, LOAN_STATUS_CFG, PAY_STATUS_CFG, fmtINR,
  CustomerLoan, CustomerPayment,
} from "./customerData";

/* ─── Helpers ─────────────────────────────────────────────────── */
type Tab = "overview" | "loans" | "payments";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-sm">
      <div className="px-5 py-3.5 border-b border-[#F1F5F9] bg-[#F8FAFC]">
        <h3 className="text-sm font-semibold text-[#0A2540]">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function DetailRow({ label, value, highlight }: { label: string; value: React.ReactNode; highlight?: boolean }) {
  return (
    <div className="flex items-start justify-between py-2.5 border-b border-[#F8FAFC] last:border-0 gap-4">
      <span className="text-xs text-[#94A3B8] min-w-[130px] flex-shrink-0 mt-0.5">{label}</span>
      <span className={`text-sm font-medium text-right ${highlight ? "text-[#0A2540]" : "text-[#334155]"}`}>{value}</span>
    </div>
  );
}

function CreditMeter({ score }: { score: number }) {
  const cfg = getCreditLabel(score);
  const pct = Math.round((score / 900) * 100);
  const segments = [
    { label:"Very Poor", color:"bg-[#DC2626]",  from:300, to:549 },
    { label:"Poor",      color:"bg-orange-500", from:550, to:649 },
    { label:"Fair",      color:"bg-amber-500",  from:650, to:699 },
    { label:"Good",      color:"bg-blue-500",   from:700, to:749 },
    { label:"Excellent", color:"bg-[#16A34A]",  from:750, to:900 },
  ];
  const markerLeft = `${Math.max(0, Math.min(100, Math.round(((score - 300) / 600) * 100)))}%`;

  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between">
        <div>
          <div className={`text-4xl font-bold ${cfg.color}`}>{score}</div>
          <div className={`text-sm font-semibold mt-0.5 ${cfg.color}`}>{cfg.label}</div>
        </div>
        <div className="text-right text-xs text-[#94A3B8]">
          <div>Range: 300–900</div>
          <div className="mt-0.5">Top <span className="font-medium text-[#334155]">{100 - pct}%</span> of borrowers</div>
        </div>
      </div>

      {/* Gradient bar */}
      <div className="relative">
        <div className="flex gap-0.5 h-3 rounded-full overflow-hidden">
          {segments.map(seg => (
            <div key={seg.label} className={`${seg.color} flex-1`} />
          ))}
        </div>
        {/* Marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-[#0A2540] rounded-full shadow-md"
          style={{ left: markerLeft }}
        />
      </div>

      <div className="flex justify-between text-xs text-[#94A3B8]">
        <span>300</span>
        {segments.map(s => <span key={s.label}>{s.label}</span>)}
        <span>900</span>
      </div>
    </div>
  );
}

/* ─── Loan card ──────────────────────────────────────────────── */
function LoanCard({ loan }: { loan: CustomerLoan }) {
  const [open, setOpen] = useState(false);
  const cfg = LOAN_STATUS_CFG[loan.status];
  const pct = Math.round((loan.paid / loan.tenure) * 100);
  const repaid = loan.amount - loan.outstanding;

  return (
    <div className="border border-[#E5E7EB] rounded-xl overflow-hidden">
      <button
        className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-[#F8FAFC] transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#0A2540]/8 rounded-lg flex items-center justify-center flex-shrink-0">
            <CreditCard className="w-5 h-5 text-[#0A2540]" />
          </div>
          <div>
            <div className="text-sm font-semibold text-[#0A2540]">{loan.type}</div>
            <div className="text-xs text-[#94A3B8] font-mono">{loan.loanId}</div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-bold text-[#0A2540]">{fmtINR(loan.amount)}</div>
            <div className="text-xs text-[#94A3B8]">Principal</div>
          </div>
          <span className={`px-2.5 py-1 rounded-full border text-xs font-semibold ${cfg.badge}`}>
            {cfg.label}
          </span>
          {open ? <ChevronUp className="w-4 h-4 text-[#94A3B8]" /> : <ChevronDown className="w-4 h-4 text-[#94A3B8]" />}
        </div>
      </button>

      {open && (
        <div className="border-t border-[#F1F5F9] bg-[#FAFBFC] px-5 py-4 space-y-4">
          {/* Repayment progress */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-[#64748B] font-medium">Repayment Progress</span>
              <span className="text-xs text-[#64748B]">{loan.paid}/{loan.tenure} EMIs · {pct}%</span>
            </div>
            <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
              <div className="h-full bg-[#0A2540] rounded-full" style={{ width: `${pct}%` }} />
            </div>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label:"Principal",     value:fmtINR(loan.amount) },
              { label:"Outstanding",   value:fmtINR(loan.outstanding) },
              { label:"Repaid",        value:fmtINR(repaid) },
              { label:"Interest Rate", value:`${loan.rate}% p.a.` },
              { label:"Tenure",        value:`${loan.tenure}m (${Math.floor(loan.tenure/12)}yr ${loan.tenure%12}m)` },
              { label:"Disbursal",     value:new Date(loan.disbursalDate).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}) },
              { label:"Next Due",      value: loan.nextDue === "—" ? "—" : new Date(loan.nextDue).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}) },
            ].map(row => (
              <div key={row.label} className="bg-white rounded-lg border border-[#E5E7EB] px-3 py-2.5">
                <div className="text-xs text-[#94A3B8] mb-0.5">{row.label}</div>
                <div className="text-sm font-semibold text-[#0A2540]">{row.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Payment row ────────────────────────────────────────────── */
function PaymentRow({ pay }: { pay: CustomerPayment }) {
  const cfg = PAY_STATUS_CFG[pay.status];
  return (
    <div className="flex items-center gap-4 py-3 border-b border-[#F8FAFC] last:border-0 group hover:bg-[#F8FAFC] -mx-5 px-5 transition-colors">
      {/* Status icon */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        pay.status === "success" ? "bg-green-100 text-[#16A34A]" :
        pay.status === "failed"  ? "bg-red-100 text-[#DC2626]" :
                                   "bg-amber-100 text-amber-700"
      }`}>
        {pay.status === "success" ? <CheckCircle2 className="w-4 h-4" /> :
         pay.status === "failed"  ? <XCircle className="w-4 h-4" /> :
                                    <Clock className="w-4 h-4" />}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[#0A2540]">{fmtINR(pay.amount)}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cfg.badge}`}>{cfg.label}</span>
        </div>
        <div className="text-xs text-[#94A3B8] mt-0.5">{pay.loanType} · {pay.loanId}</div>
      </div>

      {/* Method + Date */}
      <div className="text-right flex-shrink-0">
        <div className="text-xs font-medium text-[#334155]">{pay.method}</div>
        <div className="text-xs text-[#94A3B8] mt-0.5">
          {new Date(pay.date).toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" })}
        </div>
      </div>

      {/* Reference (visible on hover) */}
      <div className="hidden lg:block text-right flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="text-xs font-mono text-[#CBD5E1]">{pay.reference}</div>
      </div>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────── */
export function CustomerProfile() {
  const { customerId } = useParams<{ customerId: string }>();
  const [tab, setTab] = useState<Tab>("overview");

  const customer = CUSTOMERS.find(c => c.id === customerId);

  if (!customer) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#F1F5F9] rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-[#CBD5E1]" />
          </div>
          <h2 className="text-lg font-bold text-[#0A2540] mb-2">Customer Not Found</h2>
          <p className="text-sm text-[#64748B] mb-4">No customer record matches ID: <code className="font-mono">{customerId}</code></p>
          <Link to="/admin/customers" className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A2540] text-white rounded-lg text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Customers
          </Link>
        </div>
      </div>
    );
  }

  const sc      = STATUS_CFG[customer.status];
  const credit  = getCreditLabel(customer.creditScore);
  const successPayments = customer.payments.filter(p => p.status === "success").length;
  const totalPayments   = customer.payments.length;
  const payOnTimeRate   = totalPayments > 0 ? Math.round((successPayments / totalPayments) * 100) : 0;

  const TABS: { id: Tab; label: string; Icon: React.FC<{className?:string}> }[] = [
    { id:"overview",  label:"Overview",        Icon:User      },
    { id:"loans",     label:`Loan History (${customer.loans.length})`,    Icon:CreditCard },
    { id:"payments",  label:`Payments (${customer.payments.length})`,     Icon:IndianRupee},
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Breadcrumb ─────────────────────────────────────── */}
        <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] mb-6">
          <Link to="/admin" className="hover:text-[#0A2540] transition-colors">Admin</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/admin/customers" className="hover:text-[#0A2540] transition-colors">Customers</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#0A2540] font-medium">{customer.name}</span>
        </div>

        {/* ── Hero card ──────────────────────────────────────── */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden mb-6">
          {/* Top stripe */}
          <div className="h-2 bg-gradient-to-r from-[#0A2540] via-[#1E3A5F] to-[#C9A227]" />

          <div className="px-6 py-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
            {/* Avatar */}
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 font-bold text-xl text-white shadow-md ${
              customer.status === "blocked" ? "bg-[#DC2626]" :
              customer.status === "flagged"  ? "bg-amber-600" :
              customer.status === "at_risk"  ? "bg-orange-600" :
              customer.status === "inactive" ? "bg-[#94A3B8]" : "bg-[#0A2540]"
            }`}>
              {customer.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-[#0A2540]">{customer.name}</h1>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-semibold ${sc.badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                  {sc.label}
                </span>
                {customer.kyc === "Verified" && (
                  <span className="inline-flex items-center gap-1 text-xs text-[#16A34A] bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3" /> KYC Verified
                  </span>
                )}
                {customer.kyc === "Pending" && (
                  <span className="inline-flex items-center gap-1 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                    <AlertTriangle className="w-3 h-3" /> KYC Pending
                  </span>
                )}
                {customer.kyc === "Failed" && (
                  <span className="inline-flex items-center gap-1 text-xs text-[#DC2626] bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                    <Ban className="w-3 h-3" /> KYC Failed
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#64748B]">
                <span className="inline-flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{customer.email}</span>
                <span className="inline-flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{customer.phone}</span>
                <span className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{customer.city}, {customer.state}</span>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#94A3B8]"><span>#</span>{customer.id}</span>
              </div>
            </div>

            {/* Key numbers */}
            <div className="flex gap-4 sm:gap-6 flex-shrink-0">
              <div className="text-center">
                <div className={`text-2xl font-bold ${credit.color}`}>{customer.creditScore}</div>
                <div className="text-xs text-[#94A3B8]">Credit Score</div>
                <div className={`text-xs font-medium ${credit.color}`}>{credit.label}</div>
              </div>
              <div className="w-px bg-[#F1F5F9]" />
              <div className="text-center">
                <div className="text-2xl font-bold text-[#0A2540]">{customer.activeLoans}</div>
                <div className="text-xs text-[#94A3B8]">Active Loans</div>
              </div>
              <div className="w-px bg-[#F1F5F9]" />
              <div className="text-center">
                <div className={`text-2xl font-bold ${payOnTimeRate >= 80 ? "text-[#16A34A]" : payOnTimeRate >= 60 ? "text-amber-700" : "text-[#DC2626]"}`}>
                  {payOnTimeRate}%
                </div>
                <div className="text-xs text-[#94A3B8]">On-Time Rate</div>
              </div>
            </div>
          </div>

          {/* Quick stat bar */}
          <div className="border-t border-[#F1F5F9] px-6 py-3 bg-[#F8FAFC] flex flex-wrap gap-x-8 gap-y-2">
            {[
              { label:"Member Since",   value:new Date(customer.memberSince).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}) },
              { label:"Branch",         value:customer.branch },
              { label:"Account Mgr",   value:customer.accountManager },
              { label:"Annual Income",  value:fmtINR(customer.annualIncome) },
              { label:"Outstanding",    value:customer.totalOutstanding > 0 ? fmtINR(customer.totalOutstanding) : "Nil" },
              { label:"Risk Category",  value:customer.riskCategory },
            ].map(item => (
              <div key={item.label} className="text-xs">
                <span className="text-[#94A3B8]">{item.label}: </span>
                <span className="font-semibold text-[#334155]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tabs ───────────────────────────────────────────── */}
        <div className="flex gap-1 bg-white border border-[#E5E7EB] rounded-xl p-1 mb-6 shadow-sm">
          {TABS.map(t => {
            const TIcon = t.Icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  tab === t.id
                    ? "bg-[#0A2540] text-white shadow-sm"
                    : "text-[#64748B] hover:text-[#0A2540] hover:bg-[#F8FAFC]"
                }`}
              >
                <TIcon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* ─── TAB: OVERVIEW ─────────────────────────────────── */}
        {tab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Left col */}
            <div className="lg:col-span-2 space-y-5">

              {/* Personal details */}
              <Section title="Personal Information">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                  <div>
                    <DetailRow label="Full Name"      value={customer.name} highlight />
                    <DetailRow label="Customer ID"    value={<span className="font-mono text-xs">{customer.id}</span>} />
                    <DetailRow label="Gender"         value={customer.gender} />
                    <DetailRow label="Age"            value={`${customer.age} years`} />
                    <DetailRow label="Email Address"  value={<a href={`mailto:${customer.email}`} className="text-[#0A2540] hover:underline">{customer.email}</a>} />
                    <DetailRow label="Phone"          value={customer.phone} />
                  </div>
                  <div>
                    <DetailRow label="Address"        value={customer.address} />
                    <DetailRow label="City"           value={customer.city} />
                    <DetailRow label="State"          value={customer.state} />
                    <DetailRow label="Pincode"        value={customer.pincode} />
                    <DetailRow label="Member Since"   value={new Date(customer.memberSince).toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"})} />
                    <DetailRow label="KYC Status"     value={
                      <span className={`text-xs font-semibold ${
                        customer.kyc === "Verified" ? "text-[#16A34A]" :
                        customer.kyc === "Pending"  ? "text-amber-700" : "text-[#DC2626]"
                      }`}>{customer.kyc}</span>
                    } />
                  </div>
                </div>
              </Section>

              {/* Employment */}
              <Section title="Employment & Financial Profile">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                  <div>
                    <DetailRow label="Occupation"    value={customer.occupation} />
                    <DetailRow label="Employer"      value={customer.employer} />
                    <DetailRow label="Annual Income" value={<span className="font-bold text-[#16A34A]">{fmtINR(customer.annualIncome)}</span>} />
                  </div>
                  <div>
                    <DetailRow label="Branch"         value={customer.branch} />
                    <DetailRow label="Account Mgr"    value={customer.accountManager} />
                    <DetailRow label="Risk Category"  value={
                      <span className={`text-xs font-bold ${
                        customer.riskCategory === "Low"       ? "text-[#16A34A]" :
                        customer.riskCategory === "Medium"    ? "text-amber-700"  :
                        customer.riskCategory === "High"      ? "text-orange-700" : "text-[#DC2626]"
                      }`}>{customer.riskCategory} Risk</span>
                    } />
                  </div>
                </div>
              </Section>

              {/* Payment behavior */}
              <Section title="Payment Behaviour">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label:"Total Payments", value:totalPayments, color:"text-[#0A2540]" },
                    { label:"Successful",     value:successPayments, color:"text-[#16A34A]" },
                    { label:"Failed",         value:customer.payments.filter(p=>p.status==="failed").length, color:"text-[#DC2626]" },
                  ].map(m => (
                    <div key={m.label} className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-4 text-center">
                      <div className={`text-2xl font-bold ${m.color}`}>{m.value}</div>
                      <div className="text-xs text-[#94A3B8] mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>
                {totalPayments > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1.5 text-xs">
                      <span className="text-[#64748B]">On-Time Payment Rate</span>
                      <span className="font-bold text-[#334155]">{payOnTimeRate}%</span>
                    </div>
                    <div className="h-2.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${payOnTimeRate >= 80 ? "bg-[#16A34A]" : payOnTimeRate >= 60 ? "bg-amber-500" : "bg-[#DC2626]"}`}
                        style={{ width: `${payOnTimeRate}%` }}
                      />
                    </div>
                  </div>
                )}
              </Section>
            </div>

            {/* Right col */}
            <div className="space-y-5">

              {/* Credit score */}
              <Section title="Credit Score">
                <CreditMeter score={customer.creditScore} />
              </Section>

              {/* Loan snapshot */}
              <Section title="Loan Snapshot">
                {customer.loans.length === 0 ? (
                  <p className="text-sm text-[#94A3B8] text-center py-4">No loan history.</p>
                ) : (
                  <div className="space-y-3">
                    {customer.loans.map(loan => {
                      const cfg = LOAN_STATUS_CFG[loan.status];
                      return (
                        <div key={loan.loanId} className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB]">
                          <div>
                            <div className="text-xs font-semibold text-[#0A2540]">{loan.type}</div>
                            <div className="text-xs text-[#94A3B8] font-mono">{loan.loanId}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs font-bold text-[#0A2540]">{fmtINR(loan.outstanding)}</div>
                            <span className={`text-xs px-1.5 py-0.5 rounded-full border font-medium ${cfg.badge}`}>{cfg.label}</span>
                          </div>
                        </div>
                      );
                    })}
                    <button
                      onClick={() => setTab("loans")}
                      className="w-full text-center text-xs text-[#0A2540] font-medium hover:underline py-1"
                    >
                      View Full Loan History →
                    </button>
                  </div>
                )}
              </Section>

              {/* Recent payments */}
              <Section title="Recent Payments">
                {customer.payments.length === 0 ? (
                  <p className="text-sm text-[#94A3B8] text-center py-4">No payment history.</p>
                ) : (
                  <div className="space-y-2">
                    {customer.payments.slice(0, 3).map(pay => {
                      const cfg = PAY_STATUS_CFG[pay.status];
                      return (
                        <div key={pay.id} className="flex items-center justify-between p-2.5 rounded-lg border border-[#E5E7EB]">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              pay.status === "success" ? "bg-green-100 text-[#16A34A]" :
                              pay.status === "failed"  ? "bg-red-100 text-[#DC2626]" : "bg-amber-100 text-amber-700"
                            }`}>{cfg.icon}</div>
                            <div>
                              <div className="text-xs font-semibold text-[#0A2540]">{fmtINR(pay.amount)}</div>
                              <div className="text-xs text-[#94A3B8]">{pay.method}</div>
                            </div>
                          </div>
                          <div className="text-xs text-[#94A3B8]">
                            {new Date(pay.date).toLocaleDateString("en-IN",{day:"2-digit",month:"short"})}
                          </div>
                        </div>
                      );
                    })}
                    <button
                      onClick={() => setTab("payments")}
                      className="w-full text-center text-xs text-[#0A2540] font-medium hover:underline py-1"
                    >
                      View All Payments →
                    </button>
                  </div>
                )}
              </Section>
            </div>
          </div>
        )}

        {/* ─── TAB: LOAN HISTORY ─────────────────────────────── */}
        {tab === "loans" && (
          <div className="space-y-4">
            {/* Summary row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label:"Total Loans",  value:customer.loans.length },
                { label:"Active",       value:customer.loans.filter(l=>l.status==="active").length },
                { label:"Closed",       value:customer.loans.filter(l=>l.status==="closed").length },
                { label:"Overdue/NPA",  value:customer.loans.filter(l=>l.status==="overdue"||l.status==="npa").length },
              ].map(m => (
                <div key={m.label} className="bg-white border border-[#E5E7EB] rounded-xl p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-[#0A2540]">{m.value}</div>
                  <div className="text-xs text-[#94A3B8] mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>

            {customer.loans.length === 0 ? (
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-12 text-center shadow-sm">
                <CreditCard className="w-10 h-10 text-[#CBD5E1] mx-auto mb-3" />
                <p className="text-sm text-[#64748B]">No loan history on record.</p>
              </div>
            ) : (
              customer.loans.map(loan => <LoanCard key={loan.loanId} loan={loan} />)
            )}
          </div>
        )}

        {/* ─── TAB: PAYMENT HISTORY ──────────────────────────── */}
        {tab === "payments" && (
          <div className="space-y-4">
            {/* Summary row */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label:"Success", value:customer.payments.filter(p=>p.status==="success").length, color:"text-[#16A34A]", bg:"bg-green-50 border-green-200" },
                { label:"Failed",  value:customer.payments.filter(p=>p.status==="failed").length,  color:"text-[#DC2626]", bg:"bg-red-50 border-red-200" },
                { label:"Pending", value:customer.payments.filter(p=>p.status==="pending").length, color:"text-amber-700", bg:"bg-amber-50 border-amber-200" },
              ].map(m => (
                <div key={m.label} className={`border rounded-xl p-4 text-center ${m.bg}`}>
                  <div className={`text-2xl font-bold ${m.color}`}>{m.value}</div>
                  <div className="text-xs text-[#64748B] mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm overflow-hidden">
              <div className="px-5 py-3.5 border-b border-[#F1F5F9] bg-[#F8FAFC] flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[#0A2540]">All Transactions</h3>
                <span className="text-xs text-[#94A3B8]">Hover row for reference ID</span>
              </div>
              <div className="px-5 py-2">
                {customer.payments.length === 0 ? (
                  <div className="py-12 text-center">
                    <IndianRupee className="w-8 h-8 text-[#CBD5E1] mx-auto mb-2" />
                    <p className="text-sm text-[#64748B]">No payment records found.</p>
                  </div>
                ) : (
                  customer.payments.map(pay => <PaymentRow key={pay.id} pay={pay} />)
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Back link ──────────────────────────────────────── */}
        <div className="mt-8">
          <Link
            to="/admin/customers"
            className="inline-flex items-center gap-2 text-sm text-[#64748B] hover:text-[#0A2540] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Customer Management
          </Link>
        </div>

      </div>
    </div>
  );
}

import { useState, useMemo } from "react";
import { Link } from "react-router";
import {
  Search, ChevronRight, ChevronLeft, Users, ShieldAlert, TrendingUp,
  RotateCcw, Filter, ChevronDown, ChevronsUpDown, ChevronUp,
  AlertTriangle, Ban, UserCheck, UserX, Star, Eye,
  Building2,
} from "lucide-react";
import {
  CUSTOMERS, CustomerStatus, getCreditLabel, STATUS_CFG, fmtINR,
} from "./customerData";

/* ─── Types ─────────────────────────────────────────────────── */
type SortKey = "name" | "creditScore" | "activeLoans" | "totalOutstanding" | "memberSince" | "status";
type SortDir = "asc" | "desc";

/* ─── Helpers ────────────────────────────────────────────────── */
function SortIcon({ col, sortKey, dir }: { col: SortKey; sortKey: SortKey; dir: SortDir }) {
  if (sortKey !== col) return <ChevronsUpDown className="w-3 h-3 text-[#CBD5E1] ml-1 flex-shrink-0" />;
  return dir === "asc"
    ? <ChevronUp className="w-3 h-3 text-[#0A2540] ml-1 flex-shrink-0" />
    : <ChevronDown className="w-3 h-3 text-[#0A2540] ml-1 flex-shrink-0" />;
}

function CreditBar({ score }: { score: number }) {
  const pct = Math.round((score / 900) * 100);
  const cfg = getCreditLabel(score);
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
        <div className={`h-full ${cfg.bar} rounded-full`} style={{ width: `${pct}%` }} />
      </div>
      <span className={`text-sm font-bold tabular-nums ${cfg.color}`}>{score}</span>
      <span className={`text-xs px-1.5 py-0.5 rounded-full border font-medium ${cfg.badge} ${cfg.bg}`}>
        {cfg.label}
      </span>
    </div>
  );
}

const PAGE_SIZE = 10;

/* ─── Stat card ─────────────────────────────────────────────── */
function StatCard({
  label, value, sub, Icon, accent, border = "border-[#E5E7EB]",
}: {
  label: string; value: string | number; sub: string;
  Icon: React.FC<{ className?: string }>;
  accent: string; border?: string;
}) {
  return (
    <div className={`bg-white border ${border} rounded-xl p-5 shadow-sm`}>
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${accent}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <div className="text-xs text-[#94A3B8] mb-1">{label}</div>
          <div className="text-2xl font-bold text-[#0A2540] leading-tight">{value}</div>
          <div className="text-xs text-[#64748B] mt-0.5">{sub}</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────── */
export function CustomerManagement() {
  const [search, setSearch]             = useState("");
  const [statusFilter, setStatusFilter] = useState<CustomerStatus | "all">("all");
  const [creditFilter, setCreditFilter] = useState<string>("all");
  const [stateFilter, setStateFilter]   = useState("all");
  const [sortKey, setSortKey]           = useState<SortKey>("memberSince");
  const [sortDir, setSortDir]           = useState<SortDir>("desc");
  const [page, setPage]                 = useState(1);

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
    setPage(1);
  }

  /* ── Summary ── */
  const totalCustomers  = CUSTOMERS.length;
  const activeCount     = CUSTOMERS.filter(c => c.status === "active").length;
  const atRiskCount     = CUSTOMERS.filter(c => c.status === "at_risk" || c.status === "flagged" || c.status === "blocked").length;
  const avgCredit       = Math.round(CUSTOMERS.reduce((s, c) => s + c.creditScore, 0) / CUSTOMERS.length);
  const states          = [...new Set(CUSTOMERS.map(c => c.state))].sort();

  /* ── Filter + sort ── */
  const filtered = useMemo(() => {
    let d = [...CUSTOMERS];
    if (statusFilter !== "all") d = d.filter(c => c.status === statusFilter);
    if (stateFilter  !== "all") d = d.filter(c => c.state === stateFilter);
    if (creditFilter !== "all") {
      d = d.filter(c => {
        if (creditFilter === "excellent") return c.creditScore >= 750;
        if (creditFilter === "good")      return c.creditScore >= 700 && c.creditScore < 750;
        if (creditFilter === "fair")      return c.creditScore >= 650 && c.creditScore < 700;
        if (creditFilter === "poor")      return c.creditScore < 650;
        return true;
      });
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      d = d.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.employer.toLowerCase().includes(q)
      );
    }
    d.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "name":             cmp = a.name.localeCompare(b.name); break;
        case "creditScore":      cmp = a.creditScore - b.creditScore; break;
        case "activeLoans":      cmp = a.activeLoans - b.activeLoans; break;
        case "totalOutstanding": cmp = a.totalOutstanding - b.totalOutstanding; break;
        case "memberSince":      cmp = a.memberSince.localeCompare(b.memberSince); break;
        case "status":           cmp = a.status.localeCompare(b.status); break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return d;
  }, [search, statusFilter, creditFilter, stateFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData   = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hasFilters = statusFilter !== "all" || creditFilter !== "all" || stateFilter !== "all" || search.trim();

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
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Header ────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] mb-2">
            <Link to="/admin" className="hover:text-[#0A2540] transition-colors">Admin</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0A2540] font-medium">Customer Management</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-[#0A2540]">Customer Management</h1>
              <p className="text-sm text-[#64748B] mt-0.5">
                View, filter, and manage all customer accounts — click any row to see a full profile.
              </p>
            </div>
          </div>
        </div>

        {/* ── Summary cards ─────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Customers"  value={totalCustomers} sub="registered accounts"           Icon={Users}      accent="bg-[#0A2540]/8 text-[#0A2540]" />
          <StatCard label="Active Customers" value={activeCount}    sub="with active loans"             Icon={UserCheck}  accent="bg-green-100 text-[#16A34A]"  border="border-green-100" />
          <StatCard label="Needs Attention"  value={atRiskCount}    sub="at risk / flagged / blocked"   Icon={ShieldAlert} accent="bg-red-100 text-[#DC2626]"   border="border-red-100"   />
          <StatCard label="Avg Credit Score" value={avgCredit}      sub={getCreditLabel(avgCredit).label + " portfolio health"} Icon={TrendingUp} accent="bg-amber-100 text-amber-700" />
        </div>

        {/* ── Status tabs ───────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-5">
          {(["all","active","inactive","at_risk","flagged","blocked"] as const).map(s => {
            const cnts: Record<string, number> = {
              all: CUSTOMERS.length,
              active:   CUSTOMERS.filter(c=>c.status==="active").length,
              inactive: CUSTOMERS.filter(c=>c.status==="inactive").length,
              at_risk:  CUSTOMERS.filter(c=>c.status==="at_risk").length,
              flagged:  CUSTOMERS.filter(c=>c.status==="flagged").length,
              blocked:  CUSTOMERS.filter(c=>c.status==="blocked").length,
            };
            const lbls: Record<string,string> = { all:"All Customers", active:"Active", inactive:"Inactive", at_risk:"At Risk", flagged:"Flagged", blocked:"Blocked" };
            const dots: Record<string,string> = { all:"bg-[#0A2540]", active:"bg-[#16A34A]", inactive:"bg-[#94A3B8]", at_risk:"bg-orange-500", flagged:"bg-amber-500", blocked:"bg-[#DC2626]" };
            const active = statusFilter === s;
            return (
              <button
                key={s}
                onClick={() => { setStatusFilter(s); setPage(1); }}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium border transition-all ${
                  active ? "bg-[#0A2540] text-white border-[#0A2540] shadow-sm"
                         : "bg-white text-[#334155] border-[#E5E7EB] hover:border-[#0A2540]/30 hover:bg-[#F8FAFC]"
                }`}
              >
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${active ? "bg-white/60" : dots[s]}`} />
                {lbls[s]}
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${active ? "bg-white/20 text-white" : "bg-[#F1F5F9] text-[#64748B]"}`}>
                  {cnts[s]}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Filter bar ────────────────────────────────────── */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl px-4 py-3.5 mb-5 flex flex-wrap gap-3 items-center shadow-sm">
          {/* Search */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by name, ID, email, city, employer…"
              className="w-full pl-9 pr-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#0A2540] placeholder-[#94A3B8] bg-[#F8FAFC] focus:outline-none focus:border-[#0A2540] focus:ring-2 focus:ring-[#0A2540]/10 transition-all"
            />
          </div>

          {/* Credit score */}
          <div className="relative">
            <select
              value={creditFilter}
              onChange={e => { setCreditFilter(e.target.value); setPage(1); }}
              className="pl-3 pr-8 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#334155] bg-[#F8FAFC] focus:outline-none focus:border-[#0A2540] appearance-none cursor-pointer min-w-[150px]"
            >
              <option value="all">All Credit Scores</option>
              <option value="excellent">Excellent (750+)</option>
              <option value="good">Good (700–749)</option>
              <option value="fair">Fair (650–699)</option>
              <option value="poor">Poor (&lt;650)</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94A3B8] pointer-events-none" />
          </div>

          {/* State */}
          <div className="relative">
            <select
              value={stateFilter}
              onChange={e => { setStateFilter(e.target.value); setPage(1); }}
              className="pl-3 pr-8 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#334155] bg-[#F8FAFC] focus:outline-none focus:border-[#0A2540] appearance-none cursor-pointer min-w-[130px]"
            >
              <option value="all">All States</option>
              {states.map(st => <option key={st} value={st}>{st}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94A3B8] pointer-events-none" />
          </div>

          {hasFilters && (
            <button
              onClick={() => { setSearch(""); setStatusFilter("all"); setCreditFilter("all"); setStateFilter("all"); setPage(1); }}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm text-[#64748B] hover:text-[#0A2540] border border-[#E5E7EB] rounded-lg bg-[#F8FAFC] hover:border-[#0A2540]/30 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          )}

          <div className="ml-auto flex items-center gap-1.5 text-xs text-[#94A3B8] flex-shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span><span className="font-semibold text-[#334155]">{filtered.length}</span> customers</span>
          </div>
        </div>

        {/* ── Table ─────────────────────────────────────────── */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-[#F8FAFC]">
                  <Th col="name"             label="Customer"          />
                  <th className="px-4 py-3.5 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider whitespace-nowrap">Location</th>
                  <Th col="activeLoans"      label="Active Loans"      />
                  <Th col="totalOutstanding" label="Outstanding"       />
                  <Th col="creditScore"      label="Credit Score"      />
                  <Th col="status"           label="Status"            />
                  <Th col="memberSince"      label="Member Since"      />
                  <th className="px-4 py-3.5 text-center text-xs font-semibold text-[#64748B] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#F1F5F9]">
                {pageData.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 bg-[#F1F5F9] rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-[#CBD5E1]" />
                        </div>
                        <p className="text-sm text-[#64748B]">No customers match your filters.</p>
                        <button
                          onClick={() => { setSearch(""); setStatusFilter("all"); setCreditFilter("all"); setStateFilter("all"); }}
                          className="text-sm text-[#0A2540] underline underline-offset-2"
                        >
                          Clear filters
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  pageData.map((c, idx) => {
                    const sc = STATUS_CFG[c.status];
                    const riskRow =
                      c.status === "blocked" ? "bg-red-50/50 hover:bg-red-50" :
                      c.status === "flagged"  ? "bg-amber-50/40 hover:bg-amber-50" :
                      c.status === "at_risk"  ? "bg-orange-50/40 hover:bg-orange-50" :
                      idx % 2 === 0 ? "bg-white hover:bg-[#F8FAFC]" : "bg-[#FAFBFC] hover:bg-[#F8FAFC]";

                    return (
                      <tr key={c.id} className={`transition-colors group cursor-pointer ${riskRow}`}>
                        {/* Customer */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs text-white shadow-sm ${
                              c.status === "blocked" ? "bg-[#DC2626]" :
                              c.status === "flagged"  ? "bg-amber-600" :
                              c.status === "at_risk"  ? "bg-orange-600" :
                              c.status === "inactive" ? "bg-[#94A3B8]" : "bg-[#0A2540]"
                            }`}>
                              {c.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-semibold text-[#0A2540] truncate max-w-[150px]">{c.name}</div>
                              <div className="text-xs text-[#94A3B8] font-mono">{c.id}</div>
                              <div className="text-xs text-[#94A3B8] truncate max-w-[150px]">{c.email}</div>
                            </div>
                          </div>
                        </td>

                        {/* Location */}
                        <td className="px-4 py-4">
                          <div className="text-sm text-[#334155]">{c.city}</div>
                          <div className="text-xs text-[#94A3B8]">{c.state}</div>
                        </td>

                        {/* Active Loans */}
                        <td className="px-4 py-4 text-center">
                          {c.activeLoans > 0 ? (
                            <span className="inline-flex items-center justify-center w-7 h-7 bg-[#0A2540] text-white rounded-full text-xs font-bold">
                              {c.activeLoans}
                            </span>
                          ) : (
                            <span className="text-[#CBD5E1] text-sm">—</span>
                          )}
                        </td>

                        {/* Outstanding */}
                        <td className="px-4 py-4">
                          {c.totalOutstanding > 0 ? (
                            <>
                              <div className="text-sm font-bold text-[#0A2540] tabular-nums">
                                {c.totalOutstanding >= 100000
                                  ? `₹${(c.totalOutstanding / 100000).toFixed(1)}L`
                                  : fmtINR(c.totalOutstanding)}
                              </div>
                              <div className="text-xs text-[#94A3B8]">{fmtINR(c.totalOutstanding)}</div>
                            </>
                          ) : (
                            <span className="text-xs text-[#16A34A] font-medium bg-green-50 px-2 py-0.5 rounded-full border border-green-200">Nil</span>
                          )}
                        </td>

                        {/* Credit Score */}
                        <td className="px-4 py-4">
                          <CreditBar score={c.creditScore} />
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${sc.badge}`}>
                            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${sc.dot}`} />
                            {sc.label}
                          </span>
                          {c.kyc !== "Verified" && (
                            <div className="mt-1">
                              <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                                c.kyc === "Pending" ? "bg-amber-50 text-amber-700" : "bg-red-50 text-[#DC2626]"
                              }`}>
                                KYC {c.kyc}
                              </span>
                            </div>
                          )}
                        </td>

                        {/* Member since */}
                        <td className="px-4 py-4 text-sm text-[#64748B] whitespace-nowrap tabular-nums">
                          {new Date(c.memberSince).toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" })}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center">
                            <Link
                              to={`/admin/customers/${c.id}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0A2540] text-white rounded-lg text-xs font-medium hover:bg-[#0D2F52] transition-all shadow-sm"
                            >
                              <Eye className="w-3 h-3" />
                              View Profile
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* ── Footer / Pagination ───────────────────────── */}
          <div className="px-5 py-4 border-t border-[#F1F5F9] bg-[#F8FAFC] flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-[#94A3B8] order-2 sm:order-1">
              Showing{" "}
              <span className="font-semibold text-[#334155]">
                {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)}
              </span>{" "}
              of <span className="font-semibold text-[#334155]">{filtered.length}</span> customers
            </p>

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
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Legend / Key ──────────────────────────────────── */}
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-[#94A3B8]">
          <span className="font-medium text-[#64748B]">Credit Score:</span>
          {[
            { label:"Excellent (750+)", color:"text-[#16A34A]" },
            { label:"Good (700–749)",   color:"text-blue-600" },
            { label:"Fair (650–699)",   color:"text-amber-600" },
            { label:"Poor (<650)",      color:"text-[#DC2626]" },
          ].map(x => (
            <span key={x.label} className={`${x.color} font-medium`}>{x.label}</span>
          ))}
          <span className="ml-auto">Row shading indicates risk level</span>
        </div>
      </div>
    </div>
  );
}

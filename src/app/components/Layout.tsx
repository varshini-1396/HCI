import { Outlet, Link, useLocation } from "react-router";
import { User, Menu, X, LogOut, Type, Contrast, Moon } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function Layout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Quick settings state
  const [textSize, setTextSize] = useState(16);
  const [darkMode, setDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setSettingsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigation = [
    { name: "Loans", href: "/loan-application" },
    { name: "EMI Store", href: "/emi-marketplace" },
    { name: "Investments", href: "/dashboard" },
    { name: "Insurance", href: "/repayment" },
    { name: "Support", href: "/support" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50 shadow-sm">
        <div className="mx-auto px-6 lg:px-12 max-w-[1400px]">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#0A2540] rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xl">NF</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-[#0A2540] font-bold text-xl tracking-tight">NeoFinance</div>
                <div className="text-[#64748B] text-xs tracking-wider">PRO</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-sm font-medium transition-colors relative group ${
                      active
                        ? "text-[#0A2540]"
                        : "text-[#64748B] hover:text-[#0A2540]"
                    }`}
                  >
                    {item.name}
                    <span className={`absolute -bottom-[21px] left-0 right-0 h-0.5 bg-[#0A2540] transition-all ${
                      active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}></span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Apply Now Button */}
              <Link
                to="/loan-application"
                className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-[#0A2540] text-white font-medium text-sm rounded-md hover:bg-[#0D2F52] transition-all shadow-md"
              >
                Apply Now
              </Link>

              {/* Sign In Button */}
              <Link
                to="/login"
                className="hidden md:flex items-center gap-2 px-4 py-2 text-[#0A2540] font-medium text-sm hover:bg-[#F8FAFC] rounded-md transition-all"
              >
                Sign In
              </Link>

              {/* Settings Dropdown */}
              <div className="hidden md:block relative" ref={settingsRef}>
                <button
                  onClick={() => setSettingsOpen(!settingsOpen)}
                  className="flex items-center gap-2 px-4 py-2 text-[#0A2540] hover:bg-[#F8FAFC] rounded-md transition-all"
                  aria-label="Settings"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>

                {settingsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border-2 border-[#E5E7EB] py-4 z-50">
                    <div className="flex items-center justify-between px-4 pb-3 border-b border-[#E5E7EB]">
                      <h3 className="text-[#0A2540] font-bold">Quick Settings</h3>
                      <button
                        onClick={() => setSettingsOpen(false)}
                        className="text-[#64748B] hover:text-[#0A2540] transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="py-4 px-4 space-y-6">
                      {/* Text Size Slider */}
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Type className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm text-[#0A2540] font-medium">Text Size</div>
                            <div className="text-xs text-[#64748B]">Adjust reading comfort</div>
                          </div>
                          <div className="px-2 py-1 bg-blue-50 rounded text-xs font-bold text-blue-600">
                            {textSize}px
                          </div>
                        </div>
                        <input
                          type="range"
                          min="12"
                          max="24"
                          value={textSize}
                          onChange={(e) => setTextSize(Number(e.target.value))}
                          className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-[#64748B]">Small</span>
                          <span className="text-xs text-[#64748B]">Large</span>
                        </div>
                      </div>

                      {/* Dark Mode Toggle */}
                      <div className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Moon className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-sm text-[#0A2540] font-medium">Dark Mode</div>
                            <div className="text-xs text-[#64748B]">Reduce eye strain</div>
                          </div>
                        </div>
                        <button
                          onClick={() => setDarkMode(!darkMode)}
                          className={`w-11 h-6 rounded-full transition-colors ${darkMode ? 'bg-blue-600' : 'bg-[#E5E7EB]'}`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${darkMode ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
                        </button>
                      </div>

                      {/* High Contrast Toggle */}
                      <div className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Contrast className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-sm text-[#0A2540] font-medium">High Contrast</div>
                            <div className="text-xs text-[#64748B]">Better visibility</div>
                          </div>
                        </div>
                        <button
                          onClick={() => setHighContrast(!highContrast)}
                          className={`w-11 h-6 rounded-full transition-colors ${highContrast ? 'bg-blue-600' : 'bg-[#E5E7EB]'}`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${highContrast ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
                        </button>
                      </div>
                    </div>
                    <div className="px-4 pt-3 border-t border-[#E5E7EB]">
                      <Link
                        to="/settings"
                        onClick={() => setSettingsOpen(false)}
                        className="block w-full py-2 text-center text-sm text-[#0A2540] hover:underline font-medium"
                      >
                        View All Settings →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="hidden md:block relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-4 py-2 text-[#0A2540] hover:bg-[#F8FAFC] rounded-md transition-all"
                >
                  <div className="w-8 h-8 bg-[#0A2540] rounded-full flex items-center justify-center text-white text-sm">
                    <User className="w-4 h-4" />
                  </div>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border-2 border-[#E5E7EB] py-4 z-50">
                    <div className="px-4 pb-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-14 h-14 bg-[#0A2540] rounded-full flex items-center justify-center text-white text-xl font-bold">
                          RK
                        </div>
                        <div className="flex-1">
                          <div className="text-[#0A2540] font-bold text-lg">Rajesh Kumar</div>
                          <div className="text-sm text-[#64748B]">rajesh.kumar@email.com</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs mb-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full">Premium Member</span>
                        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full">Score: 805</span>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="block w-full py-3 bg-[#0A2540] text-white text-center rounded-lg hover:bg-[#0D2F52] transition-all font-medium"
                      >
                        View Profile
                      </Link>
                    </div>
                    <div className="px-4 pt-3 border-t border-[#E5E7EB]">
                      <Link
                        to="/login"
                        onClick={() => setProfileOpen(false)}
                        className="w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center gap-2 justify-center text-sm font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-[#0A2540] p-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E5E7EB] bg-white">
            <nav className="px-6 py-4 space-y-1">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-md text-sm font-medium transition-all ${
                      active
                        ? "bg-[#0A2540] text-white"
                        : "text-[#64748B] hover:bg-[#F8FAFC]"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="pt-4 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full px-4 py-3 text-[#0A2540] font-medium text-sm bg-[#F8FAFC] rounded-md text-center"
                >
                  Sign In
                </Link>
                <Link
                  to="/loan-application"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full px-4 py-3 bg-[#0A2540] text-white font-medium text-sm rounded-md text-center"
                >
                  Apply Now
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#0A2540] text-white">
        <div className="mx-auto px-6 lg:px-12 max-w-[1400px] py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center">
                  <span className="text-[#0A2540] font-bold text-xl">NF</span>
                </div>
                <div>
                  <div className="text-white font-bold text-xl tracking-tight">NeoFinance</div>
                  <div className="text-[#94A3B8] text-xs tracking-wider">PRO</div>
                </div>
              </div>
              <p className="text-[#94A3B8] text-sm leading-relaxed mb-6 max-w-sm">
                India's most trusted digital lending platform. Providing smart financial solutions since 2010.
              </p>
              <div className="flex items-center gap-4 text-sm text-[#94A3B8]">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  RBI Registered
                </span>
                <span>ISO 27001</span>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-white">Products</h3>
              <ul className="space-y-3 text-sm text-[#94A3B8]">
                <li><Link to="/loan-application" className="hover:text-white transition-colors">Personal Loans</Link></li>
                <li><Link to="/loan-application" className="hover:text-white transition-colors">Business Loans</Link></li>
                <li><Link to="/emi-marketplace" className="hover:text-white transition-colors">EMI Store</Link></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Fixed Deposits</Link></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Investments</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-white">Company</h3>
              <ul className="space-y-3 text-sm text-[#94A3B8]">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><Link to="/support" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-white">Resources</h3>
              <ul className="space-y-3 text-sm text-[#94A3B8]">
                <li><Link to="/support" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fair Practice</a></li>
                <li><Link to="/accessibility" className="hover:text-white transition-colors">Accessibility</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#94A3B8]">
              <p>© 2026 NeoFinance Pro. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Facebook</a>
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

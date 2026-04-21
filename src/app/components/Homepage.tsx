import { Link } from "react-router";
import { useState } from "react";
import { ArrowRight, Shield, Zap, TrendingUp, CheckCircle2, Users, Award, Star, Calculator, Briefcase, Home as HomeIcon, ShoppingBag, Quote } from "lucide-react";

export function Homepage() {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [tenure, setTenure] = useState(36);
  const rate = 10.5;

  const calculateEMI = () => {
    const monthlyRate = rate / 12 / 100;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);
    return Math.round(emi);
  };

  const services = [
    {
      icon: Briefcase,
      title: "Business Loans",
      description: "Flexible business financing from ₹1 Lakh to ₹50 Crore",
      rate: "10.5% p.a. onwards",
      link: "/loan-application"
    },
    {
      icon: HomeIcon,
      title: "Personal Loans",
      description: "Quick approval personal loans up to ₹40 Lakh",
      rate: "11% p.a. onwards",
      link: "/loan-application"
    },
    {
      icon: ShoppingBag,
      title: "EMI Store",
      description: "Shop on easy EMIs with instant approval",
      rate: "0% interest options",
      link: "/emi-marketplace"
    },
    {
      icon: Calculator,
      title: "Fixed Deposits",
      description: "Secure FDs with attractive interest rates",
      rate: "Up to 8.5% p.a.",
      link: "/dashboard"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Business Owner",
      company: "Mumbai",
      text: "Got my business loan approved in just 2 hours. The entire process was seamless and completely digital.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Marketing Professional",
      company: "Delhi",
      text: "Best interest rates in the market. Customer service is excellent and very responsive.",
      rating: 5
    },
    {
      name: "Amit Patel",
      role: "Entrepreneur",
      company: "Bangalore",
      text: "The EMI calculator helped me plan my finances perfectly. Highly recommend NeoFinance Pro.",
      rating: 5
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#F8FAFC] to-white pt-16 pb-20 overflow-hidden">
        <div className="mx-auto px-6 lg:px-12 max-w-[1200px] relative">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-[#0A2540] leading-tight mb-6">
              Smart Financial Solutions for Modern India
            </h1>
            <p className="text-xl text-[#64748B] mb-10 leading-relaxed max-w-3xl mx-auto">
              Loans, Investments, EMI Shopping, Payments — all in one secure platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
              <Link
                to="/loan-application"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0A2540] text-white font-medium rounded-md hover:bg-[#0D2F52] transition-all shadow-lg"
              >
                Apply Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0A2540] font-medium rounded-md border-2 border-[#0A2540] hover:bg-[#F8FAFC] transition-all">
                Check Eligibility
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#0A2540] mb-1">10M+</div>
                <div className="text-sm text-[#64748B]">Customers</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Shield className="w-5 h-5 text-[#0A2540]" />
                </div>
                <div className="text-sm text-[#64748B]">ISO Certified</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#0A2540] mb-1">24x7</div>
                <div className="text-sm text-[#64748B]">Support</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="w-5 h-5 text-[#0A2540] fill-current" />
                  <span className="text-2xl font-bold text-[#0A2540]">4.8</span>
                </div>
                <div className="text-sm text-[#64748B]">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto px-6 lg:px-12 max-w-[1400px]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0A2540] mb-4">Our Financial Services</h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
              Comprehensive financial solutions designed for your every need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link
                  key={index}
                  to={service.link}
                  className="group bg-white rounded-xl p-8 border-2 border-[#E5E7EB] hover:border-[#0A2540] hover:shadow-xl transition-all"
                >
                  <div className="w-14 h-14 bg-[#0A2540] rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A2540] mb-3">{service.title}</h3>
                  <p className="text-[#64748B] mb-4 text-sm leading-relaxed">{service.description}</p>
                  <div className="text-sm font-medium text-[#0A2540] mb-4">{service.rate}</div>
                  <div className="flex items-center gap-2 text-[#0A2540] font-medium text-sm group-hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="mx-auto px-6 lg:px-12 max-w-[1400px]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0A2540] mb-4">Why Choose NeoFinance Pro</h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
              Trusted by millions for secure, fast, and transparent financial services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-[#E5E7EB]">
              <div className="w-16 h-16 bg-[#0A2540]/10 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-[#0A2540]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A2540] mb-4">100% Secure</h3>
              <p className="text-[#64748B] leading-relaxed mb-4">
                Bank-grade security with 256-bit encryption. All your data is protected and never shared.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-[#64748B]">
                  <CheckCircle2 className="w-4 h-4 text-[#0A2540]" />
                  SSL Secured Platform
                </li>
                <li className="flex items-center gap-2 text-sm text-[#64748B]">
                  <CheckCircle2 className="w-4 h-4 text-[#0A2540]" />
                  ISO 27001 Certified
                </li>
                <li className="flex items-center gap-2 text-sm text-[#64748B]">
                  <CheckCircle2 className="w-4 h-4 text-[#0A2540]" />
                  RBI Approved
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-[#E5E7EB]">
              <div className="w-16 h-16 bg-[#0A2540]/10 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-[#0A2540]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A2540] mb-4">Instant Approval</h3>
              <p className="text-[#64748B] leading-relaxed mb-4">
                Get your loan approved in minutes with our AI-powered credit assessment system.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-[#64748B]">
                  <CheckCircle2 className="w-4 h-4 text-[#0A2540]" />
                  2-Minute Application
                </li>
                <li className="flex items-center gap-2 text-sm text-[#64748B]">
                  <CheckCircle2 className="w-4 h-4 text-[#0A2540]" />
                  Instant Decision
                </li>
                <li className="flex items-center gap-2 text-sm text-[#64748B]">
                  <CheckCircle2 className="w-4 h-4 text-[#0A2540]" />
                  48-Hour Disbursal
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-[#E5E7EB]">
              <div className="w-16 h-16 bg-[#0A2540]/10 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-[#0A2540]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A2540] mb-4">Best Interest Rates</h3>
              <p className="text-[#64748B] leading-relaxed mb-4">
                Competitive interest rates starting from 10.5% p.a. with flexible repayment options.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-[#64748B]">
                  <CheckCircle2 className="w-4 h-4 text-[#0A2540]" />
                  No Hidden Charges
                </li>
                <li className="flex items-center gap-2 text-sm text-[#64748B]">
                  <CheckCircle2 className="w-4 h-4 text-[#0A2540]" />
                  Flexible Tenure
                </li>
                <li className="flex items-center gap-2 text-sm text-[#64748B]">
                  <CheckCircle2 className="w-4 h-4 text-[#0A2540]" />
                  Zero Prepayment Charges
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* EMI Calculator Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto px-6 lg:px-12 max-w-[1400px]">
          <div className="bg-gradient-to-br from-[#0A2540] to-[#0D2F52] rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 text-white">
                <h2 className="text-4xl font-bold mb-4">EMI Calculator</h2>
                <p className="text-lg text-[#94A3B8] mb-8">
                  Plan your loan repayment with our easy-to-use EMI calculator
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="flex items-center justify-between text-sm mb-3">
                      <span>Loan Amount</span>
                      <span className="font-bold">₹{loanAmount.toLocaleString('en-IN')}</span>
                    </label>
                    <input
                      type="range"
                      min="100000"
                      max="5000000"
                      step="50000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-[#94A3B8] mt-2">
                      <span>₹1L</span>
                      <span>₹50L</span>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center justify-between text-sm mb-3">
                      <span>Tenure</span>
                      <span className="font-bold">{tenure} months</span>
                    </label>
                    <input
                      type="range"
                      min="6"
                      max="60"
                      step="6"
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-[#94A3B8] mt-2">
                      <span>6 months</span>
                      <span>60 months</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/20">
                    <div className="text-sm text-[#94A3B8] mb-2">Interest Rate</div>
                    <div className="text-2xl font-bold">{rate}% p.a.</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-12 flex flex-col justify-center">
                <div className="mb-8">
                  <div className="text-sm text-[#64748B] mb-2">Your Monthly EMI</div>
                  <div className="text-5xl font-bold text-[#0A2540] mb-2">
                    ₹{calculateEMI().toLocaleString('en-IN')}
                  </div>
                  <div className="text-sm text-[#64748B]">per month for {tenure} months</div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
                    <span className="text-[#64748B]">Principal Amount</span>
                    <span className="font-bold text-[#0A2540]">₹{loanAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
                    <span className="text-[#64748B]">Total Interest</span>
                    <span className="font-bold text-[#0A2540]">
                      ₹{((calculateEMI() * tenure) - loanAmount).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
                    <span className="text-[#64748B]">Total Amount</span>
                    <span className="font-bold text-[#0A2540]">
                      ₹{(calculateEMI() * tenure).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <Link
                  to="/loan-application"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0A2540] text-white font-medium rounded-md hover:bg-[#0D2F52] transition-all"
                >
                  Apply for This Loan
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="mx-auto px-6 lg:px-12 max-w-[1400px]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0A2540] mb-4">What Our Customers Say</h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
              Join millions of satisfied customers who trust NeoFinance Pro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-[#E5E7EB]">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#0A2540] fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-[#0A2540]/20 mb-4" />
                <p className="text-[#64748B] mb-6 leading-relaxed">{testimonial.text}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#0A2540] rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-[#0A2540]">{testimonial.name}</div>
                    <div className="text-sm text-[#64748B]">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#0A2540] text-white">
        <div className="mx-auto px-6 lg:px-12 max-w-[1400px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-3">10M+</div>
              <div className="text-[#94A3B8]">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-3">₹5000Cr+</div>
              <div className="text-[#94A3B8]">Loans Disbursed</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-3">50+</div>
              <div className="text-[#94A3B8]">Cities Covered</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-3">4.8★</div>
              <div className="text-[#94A3B8]">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto px-6 lg:px-12 max-w-[1400px]">
          <div className="bg-gradient-to-r from-[#0A2540] to-[#0D2F52] rounded-2xl p-12 lg:p-16 text-white text-center shadow-2xl">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-[#94A3B8] mb-10 max-w-2xl mx-auto">
              Apply now and get instant approval on your loan application
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/loan-application"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[#0A2540] font-medium rounded-md hover:bg-[#F8FAFC] transition-all shadow-lg"
              >
                Apply Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/support"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-transparent text-white font-medium rounded-md border-2 border-white hover:bg-white/10 transition-all"
              >
                Talk to Expert
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

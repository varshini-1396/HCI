/* ─── Types ──────────────────────────────────────────────────── */
export type CustomerStatus = "active" | "inactive" | "at_risk" | "flagged" | "blocked";
export type LoanStatus     = "active" | "closed" | "overdue" | "npa";
export type PaymentStatus  = "success" | "failed" | "pending";
export type LoanType       = "Home Loan" | "Business Loan" | "Personal Loan" | "Vehicle Loan" | "Education Loan" | "Equipment Loan";

export interface CustomerLoan {
  loanId: string;
  type: LoanType;
  amount: number;
  outstanding: number;
  rate: number;
  tenure: number;
  paid: number;
  disbursalDate: string;
  nextDue: string;
  status: LoanStatus;
}

export interface CustomerPayment {
  id: string;
  loanId: string;
  loanType: LoanType;
  amount: number;
  date: string;
  method: "UPI" | "NEFT" | "RTGS" | "Debit Card" | "Auto-Debit" | "Cheque";
  status: PaymentStatus;
  reference: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: "Male" | "Female";
  address: string;
  city: string;
  state: string;
  pincode: string;
  occupation: string;
  employer: string;
  annualIncome: number;
  creditScore: number;
  riskCategory: "Low" | "Medium" | "High" | "Very High";
  status: CustomerStatus;
  memberSince: string;
  branch: string;
  accountManager: string;
  kyc: "Verified" | "Pending" | "Failed";
  activeLoans: number;
  totalOutstanding: number;
  loans: CustomerLoan[];
  payments: CustomerPayment[];
}

/* ─── Mock data ──────────────────────────────────────────────── */
export const CUSTOMERS: Customer[] = [
  {
    id: "CUS-10021", name: "Ananya Kapoor", email: "ananya.k@email.com", phone: "98201 23456",
    age: 34, gender: "Female", address: "14/2 Koramangala 5th Block", city: "Bengaluru", state: "Karnataka", pincode: "560095",
    occupation: "Software Engineer", employer: "Infosys Ltd", annualIncome: 2400000,
    creditScore: 782, riskCategory: "Low", status: "active", memberSince: "2022-03-10",
    branch: "Bengaluru", accountManager: "Ravi Shankar", kyc: "Verified", activeLoans: 1, totalOutstanding: 7650000,
    loans: [
      { loanId:"NF-2024-001", type:"Home Loan", amount:8000000, outstanding:7650000, rate:8.50, tenure:240, paid:25, disbursalDate:"2024-03-15", nextDue:"2026-05-15", status:"active" },
    ],
    payments: [
      { id:"PAY-001-001", loanId:"NF-2024-001", loanType:"Home Loan", amount:70076, date:"2026-04-15", method:"Auto-Debit", status:"success", reference:"AUTODB202604150001" },
      { id:"PAY-001-002", loanId:"NF-2024-001", loanType:"Home Loan", amount:70076, date:"2026-03-15", method:"Auto-Debit", status:"success", reference:"AUTODB202603150001" },
      { id:"PAY-001-003", loanId:"NF-2024-001", loanType:"Home Loan", amount:70076, date:"2026-02-15", method:"Auto-Debit", status:"success", reference:"AUTODB202602150001" },
      { id:"PAY-001-004", loanId:"NF-2024-001", loanType:"Home Loan", amount:70076, date:"2026-01-15", method:"Auto-Debit", status:"success", reference:"AUTODB202601150001" },
      { id:"PAY-001-005", loanId:"NF-2024-001", loanType:"Home Loan", amount:70076, date:"2025-12-15", method:"Auto-Debit", status:"success", reference:"AUTODB202512150001" },
    ],
  },
  {
    id: "CUS-10034", name: "Arjun Desai", email: "arjun.d@email.com", phone: "97302 34567",
    age: 41, gender: "Male", address: "32 Navrangpura, CG Road", city: "Ahmedabad", state: "Gujarat", pincode: "380009",
    occupation: "Business Owner", employer: "Desai Textiles Pvt Ltd", annualIncome: 6000000,
    creditScore: 741, riskCategory: "Low", status: "active", memberSince: "2021-08-22",
    branch: "Ahmedabad", accountManager: "Meena Joshi", kyc: "Verified", activeLoans: 1, totalOutstanding: 940000,
    loans: [
      { loanId:"NF-2024-002", type:"Business Loan", amount:1800000, outstanding:940000, rate:11.25, tenure:48, paid:24, disbursalDate:"2024-04-01", nextDue:"2026-05-01", status:"active" },
    ],
    payments: [
      { id:"PAY-002-001", loanId:"NF-2024-002", loanType:"Business Loan", amount:46819, date:"2026-04-01", method:"NEFT", status:"success", reference:"NEFT20260401002" },
      { id:"PAY-002-002", loanId:"NF-2024-002", loanType:"Business Loan", amount:46819, date:"2026-03-01", method:"NEFT", status:"success", reference:"NEFT20260301002" },
      { id:"PAY-002-003", loanId:"NF-2024-002", loanType:"Business Loan", amount:46819, date:"2026-02-01", method:"NEFT", status:"failed", reference:"NEFT20260201002" },
      { id:"PAY-002-004", loanId:"NF-2024-002", loanType:"Business Loan", amount:46819, date:"2026-01-01", method:"NEFT", status:"success", reference:"NEFT20260101002" },
    ],
  },
  {
    id: "CUS-10047", name: "Deepa Iyer", email: "deepa.i@email.com", phone: "91203 45678",
    age: 38, gender: "Female", address: "7/A Jayanagar 4th Block", city: "Bengaluru", state: "Karnataka", pincode: "560011",
    occupation: "Medical Practitioner", employer: "Manipal Hospitals", annualIncome: 3600000,
    creditScore: 768, riskCategory: "Low", status: "active", memberSince: "2023-01-14",
    branch: "Bengaluru", accountManager: "Ravi Shankar", kyc: "Verified", activeLoans: 1, totalOutstanding: 618000,
    loans: [
      { loanId:"NF-2024-003", type:"Equipment Loan", amount:950000, outstanding:618000, rate:10.75, tenure:36, paid:26, disbursalDate:"2024-02-20", nextDue:"2026-04-20", status:"overdue" },
    ],
    payments: [
      { id:"PAY-003-001", loanId:"NF-2024-003", loanType:"Equipment Loan", amount:30915, date:"2026-03-20", method:"UPI", status:"success", reference:"UPI202603200047" },
      { id:"PAY-003-002", loanId:"NF-2024-003", loanType:"Equipment Loan", amount:30915, date:"2026-02-20", method:"UPI", status:"success", reference:"UPI202602200047" },
      { id:"PAY-003-003", loanId:"NF-2024-003", loanType:"Equipment Loan", amount:30915, date:"2026-01-20", method:"UPI", status:"pending", reference:"UPI202601200047" },
    ],
  },
  {
    id: "CUS-10058", name: "Rajesh Kumar", email: "rajesh.k@email.com", phone: "88001 56789",
    age: 47, gender: "Male", address: "B-12, Bandra Kurla Complex", city: "Mumbai", state: "Maharashtra", pincode: "400051",
    occupation: "Director", employer: "Kumar Industries Ltd", annualIncome: 12000000,
    creditScore: 810, riskCategory: "Low", status: "active", memberSince: "2020-06-05",
    branch: "Mumbai", accountManager: "Sunita Rao", kyc: "Verified", activeLoans: 1, totalOutstanding: 6710000,
    loans: [
      { loanId:"NF-2024-004", type:"Business Loan", amount:8500000, outstanding:6710000, rate:10.50, tenure:84, paid:27, disbursalDate:"2024-01-10", nextDue:"2026-05-10", status:"active" },
    ],
    payments: [
      { id:"PAY-004-001", loanId:"NF-2024-004", loanType:"Business Loan", amount:140287, date:"2026-04-10", method:"RTGS", status:"success", reference:"RTGS20260410004" },
      { id:"PAY-004-002", loanId:"NF-2024-004", loanType:"Business Loan", amount:140287, date:"2026-03-10", method:"RTGS", status:"success", reference:"RTGS20260310004" },
      { id:"PAY-004-003", loanId:"NF-2024-004", loanType:"Business Loan", amount:140287, date:"2026-02-10", method:"RTGS", status:"success", reference:"RTGS20260210004" },
    ],
  },
  {
    id: "CUS-10063", name: "Priya Mehta", email: "priya.m@email.com", phone: "99001 67890",
    age: 28, gender: "Female", address: "22, Linking Road, Bandra", city: "Mumbai", state: "Maharashtra", pincode: "400050",
    occupation: "Marketing Manager", employer: "HUL India", annualIncome: 1800000,
    creditScore: 695, riskCategory: "Medium", status: "inactive", memberSince: "2021-05-20",
    branch: "Mumbai", accountManager: "Sunita Rao", kyc: "Verified", activeLoans: 0, totalOutstanding: 0,
    loans: [
      { loanId:"NF-2023-005", type:"Personal Loan", amount:500000, outstanding:0, rate:13.50, tenure:36, paid:36, disbursalDate:"2023-08-05", nextDue:"—", status:"closed" },
    ],
    payments: [
      { id:"PAY-005-001", loanId:"NF-2023-005", loanType:"Personal Loan", amount:16973, date:"2026-08-05", method:"Auto-Debit", status:"success", reference:"AUTODB202608050063" },
      { id:"PAY-005-002", loanId:"NF-2023-005", loanType:"Personal Loan", amount:16973, date:"2026-07-05", method:"Auto-Debit", status:"success", reference:"AUTODB202607050063" },
      { id:"PAY-005-003", loanId:"NF-2023-005", loanType:"Personal Loan", amount:16973, date:"2026-06-05", method:"Auto-Debit", status:"success", reference:"AUTODB202606050063" },
    ],
  },
  {
    id: "CUS-10071", name: "Nikhil Joshi", email: "nikhil.j@email.com", phone: "87501 78901",
    age: 33, gender: "Male", address: "15 Dharampeth Extension", city: "Nagpur", state: "Maharashtra", pincode: "440010",
    occupation: "Civil Engineer", employer: "L&T Construction", annualIncome: 1500000,
    creditScore: 724, riskCategory: "Low", status: "active", memberSince: "2022-11-12",
    branch: "Nagpur", accountManager: "Kiran Patil", kyc: "Verified", activeLoans: 1, totalOutstanding: 720000,
    loans: [
      { loanId:"NF-2023-006", type:"Vehicle Loan", amount:1100000, outstanding:720000, rate:9.25, tenure:60, paid:29, disbursalDate:"2023-11-12", nextDue:"2026-05-12", status:"active" },
    ],
    payments: [
      { id:"PAY-006-001", loanId:"NF-2023-006", loanType:"Vehicle Loan", amount:22939, date:"2026-04-12", method:"UPI", status:"success", reference:"UPI202604120071" },
      { id:"PAY-006-002", loanId:"NF-2023-006", loanType:"Vehicle Loan", amount:22939, date:"2026-03-12", method:"UPI", status:"success", reference:"UPI202603120071" },
      { id:"PAY-006-003", loanId:"NF-2023-006", loanType:"Vehicle Loan", amount:22939, date:"2026-02-12", method:"Debit Card", status:"failed",  reference:"DC202602120071" },
      { id:"PAY-006-004", loanId:"NF-2023-006", loanType:"Vehicle Loan", amount:22939, date:"2026-01-12", method:"UPI", status:"success", reference:"UPI202601120071" },
    ],
  },
  {
    id: "CUS-10082", name: "Suman Verma", email: "suman.v@email.com", phone: "76001 89012",
    age: 52, gender: "Male", address: "D-44, Greater Kailash Part 1", city: "New Delhi", state: "Delhi", pincode: "110048",
    occupation: "IAS Officer", employer: "Government of India", annualIncome: 2000000,
    creditScore: 790, riskCategory: "Low", status: "active", memberSince: "2021-06-18",
    branch: "Delhi", accountManager: "Amit Singh", kyc: "Verified", activeLoans: 1, totalOutstanding: 3820000,
    loans: [
      { loanId:"NF-2024-007", type:"Home Loan", amount:4500000, outstanding:3820000, rate:8.75, tenure:180, paid:22, disbursalDate:"2024-06-18", nextDue:"2026-05-18", status:"active" },
    ],
    payments: [
      { id:"PAY-007-001", loanId:"NF-2024-007", loanType:"Home Loan", amount:45063, date:"2026-04-18", method:"NEFT", status:"success", reference:"NEFT20260418007" },
      { id:"PAY-007-002", loanId:"NF-2024-007", loanType:"Home Loan", amount:45063, date:"2026-03-18", method:"NEFT", status:"success", reference:"NEFT20260318007" },
    ],
  },
  {
    id: "CUS-10095", name: "Rohan Pillai", email: "rohan.p@email.com", phone: "95201 90123",
    age: 24, gender: "Male", address: "12/B Marine Drive", city: "Kochi", state: "Kerala", pincode: "682011",
    occupation: "Student / Part-time Consultant", employer: "NIT Calicut", annualIncome: 360000,
    creditScore: 612, riskCategory: "Medium", status: "active", memberSince: "2024-07-01",
    branch: "Kochi", accountManager: "Divya Nair", kyc: "Verified", activeLoans: 1, totalOutstanding: 980000,
    loans: [
      { loanId:"NF-2024-008", type:"Education Loan", amount:1200000, outstanding:980000, rate:9.00, tenure:84, paid:21, disbursalDate:"2024-07-01", nextDue:"2026-05-01", status:"active" },
    ],
    payments: [
      { id:"PAY-008-001", loanId:"NF-2024-008", loanType:"Education Loan", amount:17117, date:"2026-04-01", method:"UPI", status:"success", reference:"UPI202604010095" },
      { id:"PAY-008-002", loanId:"NF-2024-008", loanType:"Education Loan", amount:17117, date:"2026-03-01", method:"UPI", status:"success", reference:"UPI202603010095" },
      { id:"PAY-008-003", loanId:"NF-2024-008", loanType:"Education Loan", amount:17117, date:"2026-02-01", method:"UPI", status:"pending", reference:"UPI202602010095" },
    ],
  },
  {
    id: "CUS-10114", name: "Farhan Sheikh", email: "farhan.s@email.com", phone: "84501 01234",
    age: 39, gender: "Male", address: "3rd Floor, Banjara Hills Road 12", city: "Hyderabad", state: "Telangana", pincode: "500034",
    occupation: "Real Estate Developer", employer: "Sheikh Constructions", annualIncome: 8000000,
    creditScore: 548, riskCategory: "High", status: "at_risk", memberSince: "2020-12-08",
    branch: "Hyderabad", accountManager: "Lakshmi Rao", kyc: "Verified", activeLoans: 1, totalOutstanding: 2100000,
    loans: [
      { loanId:"NF-2024-010", type:"Business Loan", amount:2500000, outstanding:2100000, rate:12.00, tenure:60, paid:23, disbursalDate:"2024-05-08", nextDue:"2026-04-08", status:"overdue" },
    ],
    payments: [
      { id:"PAY-010-001", loanId:"NF-2024-010", loanType:"Business Loan", amount:55610, date:"2026-03-08", method:"Cheque", status:"success", reference:"CHQ202603080114" },
      { id:"PAY-010-002", loanId:"NF-2024-010", loanType:"Business Loan", amount:55610, date:"2026-02-08", method:"Cheque", status:"failed",  reference:"CHQ202602080114" },
      { id:"PAY-010-003", loanId:"NF-2024-010", loanType:"Business Loan", amount:55610, date:"2026-01-08", method:"Cheque", status:"success", reference:"CHQ202601080114" },
      { id:"PAY-010-004", loanId:"NF-2024-010", loanType:"Business Loan", amount:55610, date:"2025-12-08", method:"NEFT",   status:"failed",  reference:"NEFT202512080114" },
    ],
  },
  {
    id: "CUS-10136", name: "Manish Tiwari", email: "manish.t@email.com", phone: "92301 23456",
    age: 44, gender: "Male", address: "9 Hazratganj Market", city: "Lucknow", state: "Uttar Pradesh", pincode: "226001",
    occupation: "Retailer", employer: "Self-employed", annualIncome: 900000,
    creditScore: 491, riskCategory: "Very High", status: "flagged", memberSince: "2021-09-14",
    branch: "Lucknow", accountManager: "Shalini Gupta", kyc: "Pending", activeLoans: 1, totalOutstanding: 530000,
    loans: [
      { loanId:"NF-2023-012", type:"Vehicle Loan", amount:750000, outstanding:530000, rate:9.50, tenure:48, paid:31, disbursalDate:"2023-09-14", nextDue:"2026-04-14", status:"overdue" },
    ],
    payments: [
      { id:"PAY-012-001", loanId:"NF-2023-012", loanType:"Vehicle Loan", amount:18872, date:"2026-03-14", method:"Cheque", status:"failed",  reference:"CHQ202603140136" },
      { id:"PAY-012-002", loanId:"NF-2023-012", loanType:"Vehicle Loan", amount:18872, date:"2026-02-14", method:"Cheque", status:"failed",  reference:"CHQ202602140136" },
      { id:"PAY-012-003", loanId:"NF-2023-012", loanType:"Vehicle Loan", amount:18872, date:"2026-01-14", method:"Cheque", status:"success", reference:"CHQ202601140136" },
      { id:"PAY-012-004", loanId:"NF-2023-012", loanType:"Vehicle Loan", amount:18872, date:"2025-12-14", method:"UPI",    status:"success", reference:"UPI202512140136" },
    ],
  },
  {
    id: "CUS-10162", name: "Swati Agarwal", email: "swati.a@email.com", phone: "96701 45678",
    age: 31, gender: "Female", address: "201 Kalyani Nagar", city: "Pune", state: "Maharashtra", pincode: "411006",
    occupation: "HR Manager", employer: "Wipro Technologies", annualIncome: 1400000,
    creditScore: 638, riskCategory: "Medium", status: "at_risk", memberSince: "2023-10-05",
    branch: "Pune", accountManager: "Amol Kulkarni", kyc: "Verified", activeLoans: 1, totalOutstanding: 540000,
    loans: [
      { loanId:"NF-2024-015", type:"Personal Loan", amount:600000, outstanding:540000, rate:13.00, tenure:48, paid:18, disbursalDate:"2024-10-05", nextDue:"2026-05-05", status:"active" },
    ],
    payments: [
      { id:"PAY-015-001", loanId:"NF-2024-015", loanType:"Personal Loan", amount:8000, date:"2026-04-05", method:"UPI", status:"success", reference:"UPI202604050162" },
      { id:"PAY-015-002", loanId:"NF-2024-015", loanType:"Personal Loan", amount:16044, date:"2026-03-05", method:"UPI", status:"success", reference:"UPI202603050162" },
      { id:"PAY-015-003", loanId:"NF-2024-015", loanType:"Personal Loan", amount:16044, date:"2026-02-05", method:"UPI", status:"failed",  reference:"UPI202602050162" },
    ],
  },
  {
    id: "CUS-10175", name: "Harish Menon", email: "harish.m@email.com", phone: "94501 56789",
    age: 48, gender: "Male", address: "Panampilly Nagar, Plot 44", city: "Kochi", state: "Kerala", pincode: "682036",
    occupation: "Bank Manager", employer: "State Bank of India", annualIncome: 2200000,
    creditScore: 774, riskCategory: "Low", status: "active", memberSince: "2020-03-10",
    branch: "Kochi", accountManager: "Divya Nair", kyc: "Verified", activeLoans: 1, totalOutstanding: 3800000,
    loans: [
      { loanId:"NF-2023-016", type:"Home Loan", amount:5500000, outstanding:3800000, rate:8.65, tenure:240, paid:37, disbursalDate:"2023-03-10", nextDue:"2026-05-10", status:"active" },
    ],
    payments: [
      { id:"PAY-016-001", loanId:"NF-2023-016", loanType:"Home Loan", amount:48282, date:"2026-04-10", method:"Auto-Debit", status:"success", reference:"AUTODB202604100175" },
      { id:"PAY-016-002", loanId:"NF-2023-016", loanType:"Home Loan", amount:48282, date:"2026-03-10", method:"Auto-Debit", status:"success", reference:"AUTODB202603100175" },
      { id:"PAY-016-003", loanId:"NF-2023-016", loanType:"Home Loan", amount:48282, date:"2026-02-10", method:"Auto-Debit", status:"success", reference:"AUTODB202602100175" },
    ],
  },
  {
    id: "CUS-10194", name: "Satish Naik", email: "satish.n@email.com", phone: "73201 12345",
    age: 55, gender: "Male", address: "Campal, Near Secretariat", city: "Panaji", state: "Goa", pincode: "403001",
    occupation: "Restaurant Owner", employer: "Self-employed", annualIncome: 1200000,
    creditScore: 410, riskCategory: "Very High", status: "blocked", memberSince: "2019-06-15",
    branch: "Goa", accountManager: "Pradeep Shetty", kyc: "Failed", activeLoans: 1, totalOutstanding: 980000,
    loans: [
      { loanId:"NF-2022-018", type:"Equipment Loan", amount:1500000, outstanding:980000, rate:10.50, tenure:60, paid:47, disbursalDate:"2022-06-15", nextDue:"—", status:"npa" },
    ],
    payments: [
      { id:"PAY-018-001", loanId:"NF-2022-018", loanType:"Equipment Loan", amount:32258, date:"2025-06-15", method:"Cheque", status:"failed",  reference:"CHQ202506150194" },
      { id:"PAY-018-002", loanId:"NF-2022-018", loanType:"Equipment Loan", amount:32258, date:"2025-05-15", method:"Cheque", status:"failed",  reference:"CHQ202505150194" },
      { id:"PAY-018-003", loanId:"NF-2022-018", loanType:"Equipment Loan", amount:32258, date:"2025-04-15", method:"Cheque", status:"success", reference:"CHQ202504150194" },
    ],
  },
  {
    id: "CUS-10201", name: "Pooja Choudhary", email: "pooja.c@email.com", phone: "72401 78901",
    age: 27, gender: "Female", address: "SCO 42, Sector 17-C", city: "Chandigarh", state: "Punjab", pincode: "160017",
    occupation: "Chartered Accountant", employer: "Deloitte India", annualIncome: 1600000,
    creditScore: 701, riskCategory: "Low", status: "active", memberSince: "2024-12-01",
    branch: "Chandigarh", accountManager: "Ajay Sharma", kyc: "Verified", activeLoans: 1, totalOutstanding: 310000,
    loans: [
      { loanId:"NF-2024-019", type:"Personal Loan", amount:400000, outstanding:310000, rate:12.50, tenure:24, paid:16, disbursalDate:"2024-12-01", nextDue:"2026-04-30", status:"active" },
    ],
    payments: [
      { id:"PAY-019-001", loanId:"NF-2024-019", loanType:"Personal Loan", amount:18895, date:"2026-03-30", method:"UPI",        status:"success", reference:"UPI202603300201" },
      { id:"PAY-019-002", loanId:"NF-2024-019", loanType:"Personal Loan", amount:18895, date:"2026-02-28", method:"Debit Card", status:"success", reference:"DC202602280201" },
      { id:"PAY-019-003", loanId:"NF-2024-019", loanType:"Personal Loan", amount:18895, date:"2026-01-31", method:"UPI",        status:"success", reference:"UPI202601310201" },
    ],
  },
  {
    id: "CUS-10215", name: "Arun Krishnamurthy", email: "arun.k@email.com", phone: "91801 89012",
    age: 46, gender: "Male", address: "12 Anna Salai, Teynampet", city: "Chennai", state: "Tamil Nadu", pincode: "600018",
    occupation: "Managing Director", employer: "AK Industries", annualIncome: 15000000,
    creditScore: 832, riskCategory: "Low", status: "active", memberSince: "2019-06-20",
    branch: "Chennai", accountManager: "Vijay Kumar", kyc: "Verified", activeLoans: 1, totalOutstanding: 2600000,
    loans: [
      { loanId:"NF-2023-020", type:"Business Loan", amount:4000000, outstanding:2600000, rate:11.75, tenure:72, paid:34, disbursalDate:"2023-06-20", nextDue:"2026-05-20", status:"active" },
    ],
    payments: [
      { id:"PAY-020-001", loanId:"NF-2023-020", loanType:"Business Loan", amount:76413, date:"2026-04-20", method:"RTGS", status:"success", reference:"RTGS20260420215" },
      { id:"PAY-020-002", loanId:"NF-2023-020", loanType:"Business Loan", amount:76413, date:"2026-03-20", method:"RTGS", status:"success", reference:"RTGS20260320215" },
      { id:"PAY-020-003", loanId:"NF-2023-020", loanType:"Business Loan", amount:76413, date:"2026-02-20", method:"RTGS", status:"success", reference:"RTGS20260220215" },
    ],
  },
  {
    id: "CUS-10228", name: "Nisha Malhotra", email: "nisha.m@email.com", phone: "80501 90123",
    age: 36, gender: "Female", address: "G-5 Vasant Vihar", city: "New Delhi", state: "Delhi", pincode: "110057",
    occupation: "Fashion Designer", employer: "Self-employed", annualIncome: 3800000,
    creditScore: 758, riskCategory: "Low", status: "active", memberSince: "2022-02-14",
    branch: "Delhi", accountManager: "Amit Singh", kyc: "Verified", activeLoans: 1, totalOutstanding: 6050000,
    loans: [
      { loanId:"NF-2024-021", type:"Home Loan", amount:7200000, outstanding:6050000, rate:8.35, tenure:240, paid:26, disbursalDate:"2024-02-14", nextDue:"2026-05-14", status:"active" },
    ],
    payments: [
      { id:"PAY-021-001", loanId:"NF-2024-021", loanType:"Home Loan", amount:62450, date:"2026-04-14", method:"Auto-Debit", status:"success", reference:"AUTODB202604140228" },
      { id:"PAY-021-002", loanId:"NF-2024-021", loanType:"Home Loan", amount:62450, date:"2026-03-14", method:"Auto-Debit", status:"success", reference:"AUTODB202603140228" },
    ],
  },
  {
    id: "CUS-10239", name: "Vikrant Patil", email: "vikrant.p@email.com", phone: "99901 01234",
    age: 37, gender: "Male", address: "Flat 305, Dhanori", city: "Pune", state: "Maharashtra", pincode: "411015",
    occupation: "Automobile Dealer", employer: "Self-employed", annualIncome: 2400000,
    creditScore: 582, riskCategory: "High", status: "at_risk", memberSince: "2021-10-03",
    branch: "Pune", accountManager: "Amol Kulkarni", kyc: "Verified", activeLoans: 1, totalOutstanding: 660000,
    loans: [
      { loanId:"NF-2023-022", type:"Vehicle Loan", amount:900000, outstanding:660000, rate:9.75, tenure:60, paid:30, disbursalDate:"2023-10-03", nextDue:"2026-04-28", status:"overdue" },
    ],
    payments: [
      { id:"PAY-022-001", loanId:"NF-2023-022", loanType:"Vehicle Loan", amount:9500, date:"2026-03-28", method:"UPI", status:"success", reference:"UPI202603280239" },
      { id:"PAY-022-002", loanId:"NF-2023-022", loanType:"Vehicle Loan", amount:19092, date:"2026-02-28", method:"UPI", status:"failed",  reference:"UPI202602280239" },
      { id:"PAY-022-003", loanId:"NF-2023-022", loanType:"Vehicle Loan", amount:19092, date:"2026-01-28", method:"UPI", status:"success", reference:"UPI202601280239" },
    ],
  },
  {
    id: "CUS-10258", name: "Tarun Bajaj", email: "tarun.b@email.com", phone: "88801 12345",
    age: 42, gender: "Male", address: "Nariman Point, Tower B", city: "Mumbai", state: "Maharashtra", pincode: "400021",
    occupation: "Investment Banker", employer: "Goldman Sachs India", annualIncome: 18000000,
    creditScore: 845, riskCategory: "Low", status: "active", memberSince: "2021-04-25",
    branch: "Mumbai", accountManager: "Sunita Rao", kyc: "Verified", activeLoans: 1, totalOutstanding: 5600000,
    loans: [
      { loanId:"NF-2024-024", type:"Business Loan", amount:6000000, outstanding:5600000, rate:12.25, tenure:84, paid:24, disbursalDate:"2024-04-25", nextDue:"2026-05-25", status:"active" },
    ],
    payments: [
      { id:"PAY-024-001", loanId:"NF-2024-024", loanType:"Business Loan", amount:103698, date:"2026-04-25", method:"RTGS", status:"success", reference:"RTGS20260425258" },
      { id:"PAY-024-002", loanId:"NF-2024-024", loanType:"Business Loan", amount:103698, date:"2026-03-25", method:"RTGS", status:"success", reference:"RTGS20260325258" },
      { id:"PAY-024-003", loanId:"NF-2024-024", loanType:"Business Loan", amount:103698, date:"2026-02-25", method:"RTGS", status:"success", reference:"RTGS20260225258" },
    ],
  },
  {
    id: "CUS-10264", name: "Meena Krishnan", email: "meena.k@email.com", phone: "77601 23456",
    age: 29, gender: "Female", address: "48 Race Course Road", city: "Coimbatore", state: "Tamil Nadu", pincode: "641018",
    occupation: "Professor", employer: "PSG College of Technology", annualIncome: 1100000,
    creditScore: 715, riskCategory: "Low", status: "active", memberSince: "2023-07-12",
    branch: "Coimbatore", accountManager: "Vijay Kumar", kyc: "Verified", activeLoans: 1, totalOutstanding: 380000,
    loans: [
      { loanId:"NF-2023-025", type:"Education Loan", amount:650000, outstanding:380000, rate:8.75, tenure:60, paid:33, disbursalDate:"2023-07-12", nextDue:"2026-05-12", status:"active" },
    ],
    payments: [
      { id:"PAY-025-001", loanId:"NF-2023-025", loanType:"Education Loan", amount:13440, date:"2026-04-12", method:"Auto-Debit", status:"success", reference:"AUTODB202604120264" },
      { id:"PAY-025-002", loanId:"NF-2023-025", loanType:"Education Loan", amount:13440, date:"2026-03-12", method:"Auto-Debit", status:"success", reference:"AUTODB202603120264" },
      { id:"PAY-025-003", loanId:"NF-2023-025", loanType:"Education Loan", amount:13440, date:"2026-02-12", method:"Auto-Debit", status:"success", reference:"AUTODB202602120264" },
    ],
  },
  {
    id: "CUS-10280", name: "Karan Mehta", email: "karan.m@email.com", phone: "96201 34567",
    age: 50, gender: "Male", address: "5 Altamount Road", city: "Mumbai", state: "Maharashtra", pincode: "400026",
    occupation: "Real Estate Agent", employer: "Mehta Properties", annualIncome: 9000000,
    creditScore: 465, riskCategory: "Very High", status: "flagged", memberSince: "2020-08-15",
    branch: "Mumbai", accountManager: "Sunita Rao", kyc: "Pending", activeLoans: 1, totalOutstanding: 7200000,
    loans: [
      { loanId:"NF-2024-022", type:"Business Loan", amount:8000000, outstanding:7200000, rate:12.25, tenure:84, paid:24, disbursalDate:"2024-04-01", nextDue:"2026-04-05", status:"overdue" },
    ],
    payments: [
      { id:"PAY-022-010", loanId:"NF-2024-022", loanType:"Business Loan", amount:89100, date:"2026-03-05", method:"Cheque", status:"failed",  reference:"CHQ202603050280" },
      { id:"PAY-022-011", loanId:"NF-2024-022", loanType:"Business Loan", amount:89100, date:"2026-02-05", method:"Cheque", status:"failed",  reference:"CHQ202602050280" },
      { id:"PAY-022-012", loanId:"NF-2024-022", loanType:"Business Loan", amount:89100, date:"2026-01-05", method:"NEFT",   status:"success", reference:"NEFT20260105280" },
    ],
  },
];

/* ─── Helpers ─────────────────────────────────────────────────── */
export function getCreditLabel(score: number): { label: string; color: string; bg: string; bar: string } {
  if (score >= 750) return { label:"Excellent", color:"text-[#16A34A]", bg:"bg-green-50",  bar:"bg-[#16A34A]" };
  if (score >= 700) return { label:"Good",      color:"text-blue-700",  bg:"bg-blue-50",   bar:"bg-blue-500"  };
  if (score >= 650) return { label:"Fair",      color:"text-amber-700", bg:"bg-amber-50",  bar:"bg-amber-500" };
  if (score >= 550) return { label:"Poor",      color:"text-orange-700",bg:"bg-orange-50", bar:"bg-orange-500"};
  return               { label:"Very Poor", color:"text-[#DC2626]", bg:"bg-red-50",    bar:"bg-[#DC2626]" };
}

export const STATUS_CFG: Record<CustomerStatus, { label:string; badge:string; dot:string }> = {
  active:   { label:"Active",   badge:"bg-green-50 text-[#16A34A] border-green-200",   dot:"bg-[#16A34A]" },
  inactive: { label:"Inactive", badge:"bg-slate-50 text-[#64748B] border-slate-200",   dot:"bg-[#94A3B8]" },
  at_risk:  { label:"At Risk",  badge:"bg-orange-50 text-orange-700 border-orange-200",dot:"bg-orange-500" },
  flagged:  { label:"Flagged",  badge:"bg-amber-50 text-amber-700 border-amber-200",   dot:"bg-amber-500" },
  blocked:  { label:"Blocked",  badge:"bg-red-50 text-[#DC2626] border-red-200",       dot:"bg-[#DC2626]" },
};

export const LOAN_STATUS_CFG: Record<LoanStatus, { label:string; badge:string }> = {
  active:  { label:"Active",  badge:"bg-blue-50 text-blue-700 border-blue-200"       },
  closed:  { label:"Closed",  badge:"bg-slate-50 text-[#64748B] border-slate-200"   },
  overdue: { label:"Overdue", badge:"bg-red-50 text-[#DC2626] border-red-200"        },
  npa:     { label:"NPA",     badge:"bg-red-100 text-red-900 border-red-300"         },
};

export const PAY_STATUS_CFG: Record<PaymentStatus, { label:string; badge:string; icon:string }> = {
  success: { label:"Success", badge:"bg-green-50 text-[#16A34A] border-green-200",  icon:"✓" },
  failed:  { label:"Failed",  badge:"bg-red-50 text-[#DC2626] border-red-200",      icon:"✕" },
  pending: { label:"Pending", badge:"bg-amber-50 text-amber-700 border-amber-200",  icon:"⋯" },
};

export function fmtINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

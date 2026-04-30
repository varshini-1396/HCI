import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { AdminLayout } from "./components/AdminLayout";
import { Homepage } from "./components/Homepage";
import { Dashboard } from "./components/Dashboard";
import { LoanApplication } from "./components/LoanApplication";
import { EMIMarketplace } from "./components/EMIMarketplace";
import { RepaymentCenter } from "./components/RepaymentCenter";
import { Support } from "./components/Support";
import { AccountSettings } from "./components/AccountSettings";
import { AdminDashboard } from "./components/AdminDashboard";
import { Login } from "./components/Login";
import { Profile } from "./components/Profile";
import { NotFound } from "./components/NotFound";
import { AdminLogin } from "./components/AdminLogin";
import { LoanApplications } from "./components/LoanApplications";
import { ApprovedLoans } from "./components/ApprovedLoans";
import { EMITracker } from "./components/EMITracker";
import { CustomerManagement } from "./components/CustomerManagement";
import { CustomerProfile } from "./components/CustomerProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Homepage },
      { path: "dashboard", Component: Dashboard },
      { path: "loan-application", Component: LoanApplication },
      { path: "emi-marketplace", Component: EMIMarketplace },
      { path: "repayment", Component: RepaymentCenter },
      { path: "support", Component: Support },
      { path: "settings", Component: AccountSettings },
      { path: "login", Component: Login },
      { path: "profile", Component: Profile },
      { path: "admin-login", Component: AdminLogin },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "loan-applications", Component: LoanApplications },
      { path: "approved-loans", Component: ApprovedLoans },
      { path: "emi-tracker", Component: EMITracker },
      { path: "customers", Component: CustomerManagement },
      { path: "customers/:customerId", Component: CustomerProfile },
    ],
  },
]);
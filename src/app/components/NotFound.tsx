import { Link } from "react-router";
import { Home, ArrowLeft } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center py-12">
      <div className="text-center px-6">
        <div className="mb-8">
          <div className="text-[#0A2540] text-9xl font-semibold mb-4">404</div>
          <h1 className="text-4xl font-semibold text-[#0A2540] mb-4">Page Not Found</h1>
          <p className="text-xl text-[#64748B] max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0A2540] text-white rounded-lg hover:bg-[#0D2F52] transition-all"
          >
            <Home className="w-5 h-5" />
            Go to Homepage
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0A2540] rounded-lg hover:bg-[#F8FAFC] transition-all border border-[#E2E8F0]"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

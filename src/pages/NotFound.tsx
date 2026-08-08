import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";

const NotFound = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="w-full pt-20 bg-transparent min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="flex flex-col items-center text-center px-margin-mobile md:px-margin-laptop lg:px-margin-desktop py-12">
          {/* Error Code */}
          <div className="relative mb-8">
            <h1 className="font-heading text-[120px] md:text-[160px] lg:text-[200px] font-bold leading-none text-primary/10 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
                Page Not Found
              </span>
            </div>
          </div>

          {/* Message */}
          <p className="font-body text-body-lg text-on-surface-variant max-w-md mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-on-primary font-heading text-sm transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-outline text-on-surface font-heading text-sm transition-all duration-300 hover:border-primary hover:text-primary hover:-translate-y-0.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;

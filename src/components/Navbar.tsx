import { NavLink, Link as RouterLink, useLocation } from "react-router-dom";
import ThemeToggle from "../util/Theme";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Handle navigation to section from any page
  const handleNavigation = (sectionId: string) => {
    setIsMenuOpen(false);

    if (isHomePage) {
      // If on home page, use smooth scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // If on other page, navigate to home with section hash
      window.location.href = `/#${sectionId}`;
    }
  };

  // Handle hash change when navigating back to home
  useEffect(() => {
    if (isHomePage && location.hash) {
      const sectionId = location.hash.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300); // Delay to ensure DOM is ready
    }
  }, [location, isHomePage]);

  const navItems = [
    { label: "Home", href: "home" },
    { label: "About", href: "about" },
    { label: "Skills", href: "stack" },
    { label: "Projects", href: "featured_project" },
    { label: "Contact", href: "contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-surface-container/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.08)]"
            : "bg-surface-container/60 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
        }`}
      >
        <div className="flex justify-center w-full">
          <div
            className="w-full px-margin-mobile lg:px-20 md:px-18.75"
            style={{ maxWidth: "1280px" }}
          >
            <div className="h-20 flex items-center justify-between">
              {/* Logo / Brand */}
              <RouterLink
                to="/"
                className="font-heading text-headline-md tracking-tight text-on-surface font-bold whitespace-nowrap shrink-0 cursor-pointer hover:text-primary transition-colors"
              >
                <code className="text-primary">&lt;M.Awwal/&gt;</code>
              </RouterLink>

              {/* Navigation - Desktop */}
              <nav className="hidden md:flex items-center gap-6 lg:gap-gutter">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavigation(item.href)}
                    className={`font-body text-body-md transition-colors whitespace-nowrap cursor-pointer ${
                      isHomePage && location.hash === `#${item.href}`
                        ? "text-primary font-medium"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}

                <NavLink
                  to="/blog"
                  className={({ isActive }) =>
                    `font-body text-body-md transition-colors whitespace-nowrap ${
                      isActive
                        ? "text-primary font-medium"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`
                  }
                >
                  Blog
                </NavLink>
              </nav>

              {/* Right side: Theme toggle & Mobile menu */}
              <div className="flex items-center gap-4 shrink-0">
                <ThemeToggle />

                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-surface-variant transition-colors relative"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <X className="w-6 h-6 text-on-surface" />
                  ) : (
                    <Menu className="w-6 h-6 text-on-surface" />
                  )}
                  {isMenuOpen && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full animate-pulse" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed inset-0 top-20 z-40 bg-surface-container/95 backdrop-blur-xl md:hidden transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8 p-8">
          {navItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => handleNavigation(item.href)}
              className={`font-heading text-headline-xl-mobile transition-all duration-300 hover:text-primary cursor-pointer transform hover:scale-110 ${
                isMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              } ${
                isHomePage && location.hash === `#${item.href}`
                  ? "text-primary"
                  : "text-on-surface-variant"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {item.label}
            </button>
          ))}

          <NavLink
            to="/blog"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `font-heading text-headline-xl-mobile transition-all duration-300 hover:text-primary cursor-pointer transform hover:scale-110 ${
                isActive ? "text-primary" : "text-on-surface-variant"
              } ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`
            }
            style={{ transitionDelay: `${navItems.length * 100}ms` }}
          >
            Blog
          </NavLink>

          <div
            className={`absolute bottom-12 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-primary/30 rounded-full transition-all duration-500 ${
              isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
          />
        </nav>
      </div>
    </>
  );
};

export default Navbar;

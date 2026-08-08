import { Mail, ArrowUpRight, Heart, } from "lucide-react";
import { Link } from "react-scroll";

// Custom SVG Icons
const GithubIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  const year = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <GithubIcon />,
      href: "https://github.com/yourusername",
      label: "GitHub",
    },
    {
      icon: <LinkedInIcon />,
      href: "https://linkedin.com/in/yourusername",
      label: "LinkedIn",
    },
    {
      icon: <TwitterIcon />,
      href: "https://twitter.com/yourusername",
      label: "Twitter",
    },
    {
      icon: <Mail size={18} />,
      href: "mailto:you@example.com",
      label: "Email",
    },
  ];

  const quickLinks = [
    { label: "Home", href: "home" },
    { label: "About", href: "about" },
    { label: "Stack", href: "stack" },
    { label: "Contact", href: "contact" },
  ];
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer className="relative border-t border-outline-variant/20 bg-surface-container/30 backdrop-blur-sm overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-tertiary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-container px-margin-mobile md:px-margin-laptop lg:px-margin-desktop py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand Column */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="font-heading text-headline-md font-bold text-on-surface">
                  <code className="text-primary">&lt;M.Awwal/&gt;</code>
                </h2>
              </div>

              <p className="max-w-sm font-body text-body-sm leading-relaxed text-on-surface-variant">
                Full-Stack Developer crafting scalable web and mobile
                applications with clean architecture and great user experiences.
              </p>

              {/* Social Links */}
              <div className="flex flex-wrap gap-2 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg border border-outline-variant/20 text-on-surface-variant transition-all duration-300 hover:border-primary/50 hover:text-primary hover:bg-primary/5 hover:-translate-y-0.5"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 md:col-start-7 lg:col-span-2 lg:col-start-6">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    className="font-body text-body-sm text-on-surface-variant transition-all duration-300 hover:text-primary hover:translate-x-1 cursor-pointer inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div className="md:col-span-4 md:col-start-9 lg:col-span-3 lg:col-start-10">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-4">
              Let's Connect
            </h3>
            <p className="font-body text-body-sm text-on-surface-variant mb-4">
              Have a project in mind? Let's work together.
            </p>
            <Link
              to="contact"
              smooth={true}
              duration={500}
              offset={-80}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary/10 border border-primary/20 text-primary font-body text-sm transition-all duration-300 hover:bg-primary hover:text-on-primary hover:shadow-lg hover:shadow-primary/20 group cursor-pointer"
            >
              Get in Touch
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-10">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-surface-container/30">
            <Heart size={12} className="text-primary/40" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-4 font-mono text-[10px] uppercase tracking-widest text-on-surface-variant/50 md:flex-row md:items-center md:justify-between">
          <p>© {year} Muhammed Awwal. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span className="hidden sm:inline-flex items-center gap-1">
              Made with <Heart size={10} className="text-red-400 fill-red-400" />
            </span>
            <span className="w-px h-4 bg-outline-variant/20 hidden sm:block" />
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 transition-colors hover:text-primary cursor-pointer group"
            >
              Back to top
              <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
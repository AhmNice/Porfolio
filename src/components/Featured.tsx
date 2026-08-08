import React, { useEffect } from "react";
import { ArrowRight, Sparkles, Eye } from "lucide-react";
import FeaturedCard from "./card/Featured_card";
import { useNavigate } from "react-router-dom";

const Featured = () => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A modern web application built with React and TypeScript, featuring real-time inventory management and payment processing.",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1711051475117-f3a4d3ff6778?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tags: ["React", "TypeScript", "Node.js"],
      link: {
        source_code: "#",
        live_demo: "#",
      },
    },
    {
      title: "Mobile App",
      description:
        "Cross-platform mobile application built with React Native, delivering seamless user experiences on iOS and Android.",
      imageUrl:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tags: ["React Native", "Expo", "Firebase"],
      link: {
        source_code: "#",
        live_demo: "#",
      },
    },
    {
      title: "Dashboard Analytics",
      description:
        "Real-time analytics dashboard with interactive data visualizations and reporting capabilities.",
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tags: ["Vue.js", "D3.js", "Express"],
      link: {
        source_code: "#",
        live_demo: "#",
      },
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  const navigate = useNavigate()
  return (
    <section
      ref={sectionRef}
      id="featured_project"
      className="relative flex flex-col items-center py-20 overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-tertiary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "10s", animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div
        className="w-full px-margin-mobile md:px-margin-laptop mt-10 lg:px-margin-desktop"
        style={{ maxWidth: "1280px" }}
      >
        {/* Header */}
        <div className="relative z-10 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-gutter items-start">
            <div className="lg:col-span-5 xl:col-span-4">
              <div
                className={`flex items-center gap-3 mb-4 lg:mb-0 transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                <span className="w-8 h-[2px] bg-primary hidden lg:block"></span>
                <p className="font-mono text-label uppercase tracking-widest text-primary">
                  Featured Project
                </p>
              </div>
              <h2
                className={`font-heading text-headline-xl-mobile lg:text-headline-xl font-bold leading-none text-on-surface transition-all duration-700 delay-100 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                My Work Portfolio
              </h2>
            </div>
            <div className="lg:col-span-7 xl:col-span-8">
              <p
                className={`mt-4 max-w-2xl font-body text-body-lg leading-relaxed text-on-surface-variant transition-all duration-700 delay-200 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                I take pride in delivering high-quality, scalable, and
                user-centric solutions. Each project is built with clean code,
                modern technologies, and a focus on exceptional user
                experiences.
              </p>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div
          className={`relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="flex justify-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <FeaturedCard project={project} />
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div
          className={`relative z-10 flex justify-center transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <button
            onClick={()=> navigate('/projects')}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-surface-container/40 backdrop-blur-sm border border-outline-variant/10 text-on-surface font-heading text-sm transition-all duration-300 hover:border-primary/50 hover:text-primary hover:bg-surface-container/60 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
          >
            <Eye className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Decorative Bottom Line */}
        <div
          className={`relative mt-16 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-surface-container/30">
            <span className="font-mono text-[8px] uppercase tracking-widest text-on-surface-variant/30">
              Quality Meets Innovation
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
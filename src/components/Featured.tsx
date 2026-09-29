import React, { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Eye, Loader2 } from "lucide-react";
import FeaturedCard from "./card/Featured_card";
import { useNavigate } from "react-router-dom";
import { useProjectStore } from "../store/project.store";

const Featured = () => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const navigate = useNavigate();

  const { projects, loading, error, fetchProjects } = useProjectStore();
  const [isLoading, setIsLoading] = useState(true);

  // Fetch projects on mount
  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      await fetchProjects();
      setIsLoading(false);
    };
    loadProjects();
  }, [fetchProjects]);

  // Intersection Observer for animation
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

  // Filter only published projects for featured section
  const featuredProjects = projects
    .filter(project => project.status === "PUBLISHED")
    .slice(0, 3); // Show only first 3 projects

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
                  Featured Projects
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

        {/* Loading State */}
        {isLoading || loading ? (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-sm text-on-surface-variant">Loading projects...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
            <p className="text-sm text-red-400">{error}</p>
            <button
              onClick={() => fetchProjects()}
              className="mt-4 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : featuredProjects.length > 0 ? (
          <>
            {/* Projects Grid */}
            <div
              className={`relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="flex justify-center"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <FeaturedCard project={project} index={index} />
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
                onClick={() => navigate('/projects')}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-surface-container/40 backdrop-blur-sm border border-outline-variant/10 text-on-surface font-heading text-sm transition-all duration-300 hover:border-primary/50 hover:text-primary hover:bg-surface-container/60 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
              >
                <Eye className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                <span>View All Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
            <div className="p-5 rounded-2xl bg-surface-container/40 border border-outline-variant/10 mb-4">
              <Sparkles className="w-12 h-12 text-on-surface-variant/30" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-on-surface mb-2">
              No Projects Yet
            </h3>
            <p className="text-sm text-on-surface-variant max-w-sm">
              Check back later for new and exciting projects.
            </p>
          </div>
        )}

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
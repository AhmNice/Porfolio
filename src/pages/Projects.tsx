import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FeaturedCard from "../components/card/Featured_card";
import { useProjectStore } from "../store/project.store";
import { Loader2 } from "lucide-react";

const Projects = () => {
  const projects = useProjectStore((state) => state.projects);
  const loading = useProjectStore((state) => state.loading);
  const error = useProjectStore((state) => state.error);
  const fetchProjects = useProjectStore((state) => state.fetchProjects);

  useEffect(() => {
    fetchProjects();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [fetchProjects]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="w-full pt-20 bg-transparent min-h-screen">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-sm text-on-surface-variant">Loading projects...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="w-full pt-20 bg-transparent min-h-screen">
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <h2 className="font-heading text-2xl font-bold text-on-surface mb-2">
              Failed to Load Projects
            </h2>
            <p className="text-sm text-on-surface-variant mb-6">
              {error || "There was an error loading the projects. Please try again."}
            </p>
            <button
              onClick={() => fetchProjects()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-on-primary font-heading text-sm font-semibold transition-all hover:bg-primary/90"
            >
              Try Again
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="w-full pt-20 bg-transparent min-h-screen">
        <div className="flex flex-col relative overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(190,242,100,0.05),transparent_50%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(190,242,100,0.03),transparent_40%)] pointer-events-none" />

          {/* Hero Section */}
          <section className="w-full max-w-container mx-auto px-margin-mobile md:px-margin-laptop lg:px-margin-desktop pt-16 pb-12 relative z-10 animate-[fadeInUp_0.8s_ease-out_forwards]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <h1 className="font-heading text-headline-xl font-bold text-on-surface mb-4">
                  Projects
                </h1>
                <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
                  A collection of projects I've built
                </p>
              </div>
            </div>
          </section>

          {/* Projects Grid */}
          <section className="w-full max-w-container mx-auto px-margin-mobile md:px-margin-laptop lg:px-margin-desktop pb-20 relative z-10">
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <FeaturedCard key={project.id} project={project} index={index} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
                <div className="p-5 rounded-2xl bg-surface-container/40 border border-outline-variant/10 mb-4">
                  <svg
                    className="w-12 h-12 text-on-surface-variant/30"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H5.25m5.25 7.5H16.5m-6 3.75H16.5m-6 3.75H12m-3.75 3.75h.008m-.008-11.25h.008m-.008 11.25h.008M5.25 3.75h7.5a3.375 3.375 0 013.375 3.375v2.625m0 0h-7.5a3.375 3.375 0 01-3.375-3.375v-2.625"
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl font-bold text-on-surface mb-2">
                  No Projects Yet
                </h3>
                <p className="text-sm text-on-surface-variant max-w-sm">
                  Check back later for new projects and updates.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
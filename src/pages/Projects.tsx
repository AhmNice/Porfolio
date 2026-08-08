import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FeaturedCard from "../components/card/Featured_card";
const Projects = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform with real-time inventory management and payment processing.",
      imageUrl:
        "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tags: ["React", "Node.js", "PostgreSQL"],
      link: {
        source_code: "#",
        live_demo: "#",
      },
    },
    {
      id: 2,
      title: "Mobile App",
      description:
        "Cross-platform mobile application with seamless user experiences on iOS and Android.",
      imageUrl:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tags: ["React Native", "Expo", "Firebase"],
      link: {
        source_code: "#",
        live_demo: "#",
      },
    },
    {
      id: 3,
      title: "Dashboard Analytics",
      description:
        "Real-time analytics dashboard with interactive data visualizations and reporting.",
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tags: ["Vue.js", "D3.js", "Express"],
      link: {
        source_code: "#",
        live_demo: "#",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="w-full pt-20 bg-transparent min-h-screen">
        <div className="flex flex-col relative overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(190,242,100,0.05),transparent_50%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(190,242,100,0.03),transparent_40%)] pointer-events-none" />

          {/* Hero Section */}
          <section className="w-full max-w-container mx-auto px-margin-mobile md:px-margin-laptop lg:px-margin-desktop pt-16 pb-20 relative z-10 animate-[fadeInUp_0.8s_ease-out_forwards]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <h1 className="font-heading text-headline-xl font-bold text-on-surface">
                  Projects
                </h1>
              </div>

              <div className="max-w-xl">
                <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
                  A collection of projects I've built
                </p>
              </div>
            </div>
          </section>

          {/* Projects Grid */}
          <section className="w-full max-w-container mx-auto px-margin-mobile md:px-margin-laptop lg:px-margin-desktop pb-20 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <FeaturedCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2, Calendar, GitBranch, Globe, ExternalLink } from "lucide-react";
import Footer from "../components/Footer";
import { MarkdownViewer } from "../components/Markdown";
import BackToTop from "../components/BackToTop";
import { useProjectStore } from "../store/project.store";
import { normalizeMarkdown } from "../util/markdownhelper";
import type { ProjectDTO } from "../interface/project.dto";

const ProjectDetail = () => {
  const { slug } = useParams();
  const { getProjectBySlug, loading, error } = useProjectStore();
  const [project, setProject] = useState<ProjectDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const result = await getProjectBySlug(slug);
        if (result) {
          setProject(result);
        }
      } catch (err) {
        console.error("Failed to fetch project:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [slug, getProjectBySlug]);

  const formatTitle = (slug: string) => {
    return (
      slug
        ?.split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ") || ""
    );
  };

  const formatDate = (date: string | Date | null) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content?.split(/\s+/).length || 0;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  // Get source code and live demo links
  const sourceCodeLink = project?.links?.find((link) => link.type === "SOURCE_CODE")?.url || "";
  const liveDemoLink = project?.links?.find((link) => link.type === "LIVE_DEMO")?.url || "";
  const documentationLink = project?.links?.find((link) => link.type === "DOCUMENTATION")?.url || "";

  // Show loading state
  if (isLoading || loading) {
    return (
      <div id="project_detail" className="bg-background min-h-screen">
        <Navbar />
        <main className="w-full pt-20 bg-transparent min-h-screen">
          <div className="w-full max-w-container mx-auto px-margin-mobile md:px-margin-laptop lg:px-margin-desktop py-12">
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-sm text-on-surface-variant">Loading project...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Show error state
  if (error || !project) {
    return (
      <div id="project_detail" className="bg-background min-h-screen">
        <Navbar />
        <main className="w-full pt-20 bg-transparent min-h-screen">
          <div className="w-full max-w-container mx-auto px-margin-mobile md:px-margin-laptop lg:px-margin-desktop py-12">
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <h2 className="font-heading text-2xl font-bold text-on-surface mb-2">
                Project Not Found
              </h2>
              <p className="text-sm text-on-surface-variant mb-6">
                {error || "The project you're looking for doesn't exist or has been removed."}
              </p>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-on-primary font-heading text-sm font-semibold transition-all hover:bg-primary/90"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Parse markdown content
  const postContent = project.content
    ? normalizeMarkdown(project.content)
    : "No content available.";

  // Generate table of contents from markdown headings
  const generateTOC = (content: string) => {
    const headings = content?.match(/^###?\s+(.+)$/gm) || [];
    return headings.map((heading) => {
      const text = heading.replace(/^###?\s+/, "");
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return { text, id, level: heading.startsWith("###") ? 3 : 2 };
    });
  };

  const tocItems = generateTOC(project.content);

  return (
    <div id="project_detail" className="bg-background min-h-screen">
      <Navbar />
      <main className="w-full pt-20 bg-transparent min-h-screen">
        <div className="w-full max-w-container mx-auto px-margin-mobile md:px-margin-laptop lg:px-margin-desktop py-12">
          {/* Breadcrumb */}
          <div className="w-full mb-8">
            <div className="flex items-center gap-2 text-sm">
              <Link
                to="/projects"
                className="font-mono text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                projects
              </Link>
              <span className="text-on-surface-variant/30">/</span>
              <span className="font-mono text-primary truncate">
                {formatTitle(slug || "")}
              </span>
            </div>
          </div>

          {/* Project Header */}
          <div className="mb-8">
            <h1 className="font-heading font-bold text-headline-xl text-on-surface mb-4">
              {project.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-on-surface-variant">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(project.createdAt)}
              </span>
              <span className="w-1 h-1 rounded-full bg-outline-variant" />
              <span>{getReadTime(project.content)}</span>
              {/* {project.status && (
                <>
                  <span className="w-1 h-1 rounded-full bg-outline-variant" />
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    project.status === "PUBLISHED"
                      ? "bg-green-500/10 text-green-500"
                      : project.status === "DRAFT"
                      ? "bg-yellow-500/10 text-yellow-500"
                      : "bg-gray-500/10 text-gray-500"
                  }`}>
                    {project.status}
                  </span>
                </>
              )} */}
            </div>

            {/* Tech Stack */}
            {project.techStack && project.techStack.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {project.techStack.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary/70 font-mono text-[10px] uppercase tracking-widest"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Project Links */}
            {(sourceCodeLink || liveDemoLink || documentationLink) && (
              <div className="flex flex-wrap gap-3 mt-6">
                {sourceCodeLink && sourceCodeLink !== "#" && (
                  <a
                    href={sourceCodeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container/50 border border-outline-variant/20 text-on-surface hover:border-primary/50 hover:text-primary transition-all"
                  >
                    <GitBranch className="w-4 h-4" />
                    Source Code
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {liveDemoLink && liveDemoLink !== "#" && (
                  <a
                    href={liveDemoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary/90 transition-all"
                  >
                    <Globe className="w-4 h-4" />
                    Live Demo
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {documentationLink && documentationLink !== "#" && (
                  <a
                    href={documentationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container/50 border border-outline-variant/20 text-on-surface hover:border-primary/50 hover:text-primary transition-all"
                  >
                    Documentation
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Left column: Main content */}
            <div className="lg:w-2/3 w-full">
              <div className="prose prose-invert prose-lg max-w-none">
                <MarkdownViewer content={postContent} className="font-body text-body" />
              </div>
            </div>

            {/* Right column: Sticky sidebar */}
            <aside className="lg:w-1/3 w-full sticky top-28">
              <div className="w-full max-w-[280px] rounded-xl border border-outline-variant/20 bg-surface-container/40 p-4 backdrop-blur-sm">
                <div className="border-b border-primary font-mono text-sm uppercase tracking-widest text-on-surface-variant pb-2 mb-4">
                  Table of Contents
                </div>

                {tocItems.length > 0 ? (
                  <ul className="space-y-2">
                    {tocItems.map((item, index) => (
                      <li key={index}>
                        <a
                          href={`#${item.id}`}
                          className={`block font-body text-on-surface-variant hover:text-primary transition-colors cursor-pointer ${
                            item.level === 3 ? "pl-4 text-sm" : "text-sm font-medium"
                          }`}
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-on-surface-variant/60">
                    No sections available
                  </p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
      <BackToTop />
      <Footer />
    </div>
  );
};

export default ProjectDetail;
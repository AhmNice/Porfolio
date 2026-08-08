import { Monitor, ExternalLink, Code, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectData {
  id?: string | number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  link: {
    source_code: string;
    live_demo: string;
  };
  slug?: string;
}
interface FeaturedCardProps {
  project: ProjectData;
}

const FeaturedCard = ({ project: ProjectData }: FeaturedCardProps) => {
  // Generate slug from title if not provided

  const { title, description, imageUrl, tags, link, slug } = ProjectData;
  const projectSlug = slug || title.toLowerCase().replace(/\s+/g, "-");
  const projectLink = `/projects/${projectSlug}`;

  return (
    <div className="group relative w-full max-w-95 rounded-2xl overflow-hidden bg-surface-container/40 backdrop-blur-sm border border-outline-variant/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5">
      {/* Image Container */}
      <div className="relative w-full aspect-16/10 overflow-hidden bg-surface-container-high">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container/90 via-surface-container/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Live Demo Badge */}
        {link.live_demo.trim() !== "" && link.live_demo !== "#" && (
          <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container/90 backdrop-blur-md border border-outline-variant/10 text-on-surface-variant transition-all duration-300 group-hover:border-primary/30 group-hover:text-primary">
            <Monitor className="w-3.5 h-3.5" />
            <span className="font-mono text-[8px] uppercase tracking-widest">
              Live
            </span>
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
          {link.live_demo.trim() !== "" ||
            (link.live_demo !== "#" && (
              <a
                href={link.live_demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-surface-container/90 backdrop-blur-md border border-outline-variant/10 text-on-surface transition-all duration-300 hover:border-primary/50 hover:text-primary hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                aria-label="Live Demo"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            ))}
          {link.source_code.trim() !== "" ||
            (link.source_code !== "#" && (
              <a
                href={link.source_code}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-surface-container/90 backdrop-blur-md border border-outline-variant/10 text-on-surface transition-all duration-300 hover:border-primary/50 hover:text-primary hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                aria-label="Source Code"
              >
                <Code className="w-5 h-5" />
              </a>
            ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-[8px] uppercase tracking-widest"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title with link */}
        <Link to={projectLink} className="block">
          <h3 className="font-heading text-headline-md font-semibold text-on-surface transition-colors hover:text-primary">
            {title}
          </h3>
        </Link>

        {/* Description */}
        <p className="font-body text-body-sm text-on-surface-variant leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Links */}
        <div className="flex items-center gap-3 pt-2 border-t border-outline-variant/10">
          <a
            href={link.live_demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-on-primary font-body text-xs transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 group"
          >
            <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            Live Demo
          </a>
          <Link
            to={projectLink}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-outline text-on-surface font-body text-xs transition-all duration-300 hover:border-primary hover:text-primary hover:-translate-y-0.5 group"
          >
            <span>Read More</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;

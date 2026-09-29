import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ArticleDTO } from "../../interface/article.dto";
import { normalizeMarkdown } from "../../util/markdownhelper";

interface BlogCardProps {
  index: number;
  post: ArticleDTO;
}

const BlogCard = ({ post, index }: BlogCardProps) => {
  const navigate = useNavigate();

  const formatDate = (date: Date | null) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content?.split(/\s+/).length || 0;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  const handleCardClick = () => {
    navigate(`/blog/${post.slug}`);
  };

  const handleReadMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/blog/${post.slug}`);
  };

  return (
    <article
      key={post.id}
      className="group cursor-pointer flex flex-col h-full opacity-0 translate-y-8 animate-[fadeInUp_0.8s_ease-out_forwards]"
      style={{ animationDelay: `${0.2 + index * 0.1}s` }}
      onClick={handleCardClick}
    >
      <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 relative shadow-md bg-surface-container/50">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url('${post.coverImage || "/default-image.jpg"}')` }}
          onError={(e) => {
            const target = e.target as HTMLDivElement;
            target.style.backgroundImage = `url('/default-image.jpg')`;
          }}
        />
        <div className="absolute inset-0 bg-surface/20 group-hover:bg-transparent transition-colors duration-500" />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-0.5 bg-surface-container/60 backdrop-blur-md rounded-full font-mono text-[10px] text-primary shadow-sm border border-outline-variant/10">
            {post.category || "Uncategorized"}
          </span>
        </div>
        {post.featured && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-0.5 bg-yellow-500/20 backdrop-blur-md rounded-full font-mono text-[9px] text-yellow-600 shadow-sm border border-yellow-500/20">
              Featured
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-[10px] text-on-surface-variant">
            {formatDate(post.publishedAt || post.createdAt)}
          </span>
          <div className="w-1 h-1 rounded-full bg-outline-variant" />
          <span className="font-mono text-[10px] text-on-surface-variant">
            {getReadTime(post.content)}
          </span>
          <div className="w-1 h-1 rounded-full bg-outline-variant" />
          <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
            post.status === "PUBLISHED"
              ? "bg-green-500/10 text-green-500"
              : post.status === "DRAFT"
              ? "bg-yellow-500/10 text-yellow-500"
              : "bg-gray-500/10 text-gray-500"
          }`}>
            {post.status}
          </span>
        </div>

        <h4 className="font-heading text-headline-sm text-on-surface mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h4>

        <p className="font-body text-body-sm text-on-surface-variant mb-3 line-clamp-2">
          {post.excerpt && normalizeMarkdown(post.excerpt) || "No description available"}
        </p>

        {/* Tech Stack Tags */}
        {post.techStack && post.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.techStack.slice(0, 4).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-2 py-0.5 rounded-full bg-primary/5 border border-primary/10 text-primary/70 font-mono text-[6px] uppercase tracking-widest"
              >
                {tag}
              </span>
            ))}
            {post.techStack.length > 4 && (
              <span className="px-2 py-0.5 rounded-full bg-surface-container/30 border border-outline-variant/10 text-on-surface-variant/50 font-mono text-[6px] uppercase tracking-widest">
                +{post.techStack.length - 4}
              </span>
            )}
          </div>
        )}

        <div className="mt-auto flex cursor-pointer items-center text-primary font-mono text-xs uppercase tracking-widest gap-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <button onClick={handleReadMoreClick}>
            Read Article
          </button>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BlogCardProps {
  index: number;
  post: {
    id: string | number;
    title: string;
    isNew?: boolean;
    excerpt: string;
    slug: string;
    imageUrl: string;
    techTags: string[];
    category?: string;
    date: string;
    readTime: string;
  };
}
const BlogCard = ({ post, index }: BlogCardProps) => {
  const navigate = useNavigate();
  return (
    <article
      key={post.id}
      className="group cursor-pointer flex flex-col h-full opacity-0 translate-y-8 animate-[fadeInUp_0.8s_ease-out_forwards]"
      style={{ animationDelay: `${0.2 + index * 0.1}s` }}
    >
      <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 relative shadow-md">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url('${post.imageUrl}')` }}
        />
        <div className="absolute inset-0 bg-surface/20 group-hover:bg-transparent transition-colors duration-500" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-surface-container/60 backdrop-blur-md rounded-full font-mono text-label text-primary shadow-sm border border-outline-variant/10">
            {post.category}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xs text-on-surface-variant">
            {post.date}
          </span>
          <div className="w-1 h-1 rounded-full bg-outline-variant" />
          <span className="font-mono text-xs text-on-surface-variant">
            {post.readTime}
          </span>
        </div>
        <h4 className="font-heading text-headline-md text-on-surface mb-3 group-hover:text-primary transition-colors">
          {post.title}
        </h4>
        <p className="font-body text-body-md text-on-surface-variant mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.techTags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-2 py-0.5 rounded-full bg-primary/5 border border-primary/10 text-primary/70 font-mono text-[7px] uppercase tracking-widest"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center text-primary font-mono text-sm uppercase tracking-widest gap-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <button onClick={() => navigate(`/blog/${post.slug}`)}>
            Read Article
          </button>
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </article>
  );
};

export default BlogCard;

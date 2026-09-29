import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { Copy, Check } from "lucide-react";
import { isValidElement, useState, useEffect } from "react";
import toast from "react-hot-toast";

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export const MarkdownViewer = ({
  content,
  className = "",
}: MarkdownViewerProps) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Smooth scroll to anchor on page load if there's a hash
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }, 100);
      }
    }
  }, []);

  // Handle smooth scrolling for anchor clicks
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        const id = anchor.hash.replace('#', '');
        const element = document.getElementById(id);

        if (element) {
          // Update URL without causing a page reload
          history.pushState(null, '', anchor.hash);

          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
        toast.success("copied!");
      },
      (err) => {
        toast.error("Failed to copy text");
        console.error("Failed to copy: ", err);
      },
    );
  };

  // Extract text content from children
  const extractText = (children: React.ReactNode): string => {
    if (typeof children === "string") return children;
    if (Array.isArray(children)) {
      return children.map((child) => extractText(child)).join("");
    }
    if (isValidElement<{ children?: React.ReactNode }>(children)) {
      return extractText(children.props.children);
    }
    return "";
  };

  return (
    <article
      className={`
        max-w-none
        text-on-surface
        ${className}
      `}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeHighlight]}
        components={{
          // Headings with smooth scroll links
          h1: ({ children, id }) => (
            <h1
              id={id}
              className="font-heading font-bold text-headline-xl text-on-surface mb-6 scroll-mt-20"
            >
              {id ? (
                <a
                  href={`#${id}`}
                  className="group flex items-center gap-2 no-underline hover:text-primary transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(id);
                    if (element) {
                      history.pushState(null, '', `#${id}`);
                      element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      });
                    }
                  }}
                >
                  {children}
                  <span className="opacity-0 group-hover:opacity-100 text-primary text-sm transition-opacity">
                    #
                  </span>
                </a>
              ) : (
                children
              )}
            </h1>
          ),

          h2: ({ children, id }) => (
            <h2
              id={id}
              className="font-heading font-bold text-headline-lg text-on-surface mt-10 mb-4 scroll-mt-20"
            >
              {id ? (
                <a
                  href={`#${id}`}
                  className="group flex items-center gap-2 no-underline hover:text-primary transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(id);
                    if (element) {
                      history.pushState(null, '', `#${id}`);
                      element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      });
                    }
                  }}
                >
                  {children}
                  <span className="opacity-0 group-hover:opacity-100 text-primary text-sm transition-opacity">
                    #
                  </span>
                </a>
              ) : (
                children
              )}
            </h2>
          ),

          h3: ({ children, id }) => (
            <h3
              id={id}
              className="font-heading font-bold text-headline-md text-on-surface mt-8 mb-3 scroll-mt-20"
            >
              {id ? (
                <a
                  href={`#${id}`}
                  className="group flex items-center gap-2 no-underline hover:text-primary transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(id);
                    if (element) {
                      history.pushState(null, '', `#${id}`);
                      element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      });
                    }
                  }}
                >
                  {children}
                  <span className="opacity-0 group-hover:opacity-100 text-primary text-sm transition-opacity">
                    #
                  </span>
                </a>
              ) : (
                children
              )}
            </h3>
          ),

          // Paragraph
          p: ({ children }) => (
            <p className="font-body text-body-lg leading-8 text-on-surface/80 mb-6">
              {children}
            </p>
          ),

          // Links
          a: ({ children, href }) => {
            const isAnchor = href?.startsWith('#');
            return (
              <a
                href={href}
                className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity"
                target={isAnchor ? undefined : "_blank"}
                rel={isAnchor ? undefined : "noopener noreferrer"}
                onClick={isAnchor ? (e) => {
                  e.preventDefault();
                  const id = href && href.replace('#', '');
                  const element = document.getElementById(id as string);
                  if (element) {
                    history.pushState(null, '', href);
                    element.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }
                } : undefined}
              >
                {children}
              </a>
            );
          },

          // Blockquote
          blockquote: ({ children }) => (
            <blockquote className="my-6 border-l-4 border-primary bg-surface-container p-5 rounded-r-lg text-on-surface/80 italic">
              {children}
            </blockquote>
          ),

          // Lists
          ul: ({ children }) => (
            <ul className="list-disc pl-6 mb-6 space-y-2 text-on-surface/80">
              {children}
            </ul>
          ),

          ol: ({ children }) => (
            <ol className="list-decimal pl-6 mb-6 space-y-2 text-on-surface/80">
              {children}
            </ol>
          ),

          li: ({ children }) => <li className="leading-7">{children}</li>,

          // Inline code
          code: ({ children, className }) => {
            const isCodeBlock = className?.startsWith("language-");

            if (!isCodeBlock) {
              return (
                <code className="rounded-md bg-surface-container px-1.5 py-0.5 font-mono text-sm text-primary">
                  {children}
                </code>
              );
            }

            return (
              <code
                className={`
                  ${className ?? ""}
                  font-mono
                  text-sm
                  leading-7
                  text-code-text
                  bg-transparent
                `}
              >
                {children}
              </code>
            );
          },

          // Code block wrapper
          pre: ({ children }) => {
            const codeContent = extractText(children);
            const index = Math.random();

            return (
              <div className="my-8 overflow-hidden rounded-xl border border-code-border bg-code-background">
                <div className="flex items-center justify-between border-b border-code-border bg-code-surface px-4 py-2">
                  <span className="font-mono text-xs text-code-muted">
                    Code
                  </span>

                  <button
                    className="flex cursor-pointer items-center gap-2 text-xs text-code-muted transition-colors hover:text-code-accent"
                    onClick={() => handleCopy(codeContent, index)}
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span className="font-mono">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span className="font-mono">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="overflow-x-auto p-5 font-mono text-sm leading-7 text-code-text">
                  {children}
                </pre>
              </div>
            );
          },

          // Images
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt ?? ""}
              loading="lazy"
              className="my-8 w-full rounded-xl object-cover"
            />
          ),

          // Horizontal rule
          hr: () => <hr className="my-10 border-border" />,

          // Table
          table: ({ children }) => (
            <div className="my-8 w-full overflow-x-auto rounded-xl border border-outline-variant/20 bg-surface-container/40">
              <table className="w-full border-collapse">{children}</table>
            </div>
          ),

          th: ({ children }) => (
            <th className="border-b border-outline-variant/20 bg-surface-container-high px-4 py-3 text-left font-heading text-sm font-semibold text-on-surface">
              {children}
            </th>
          ),

          td: ({ children }) => (
            <td className="border-b border-outline-variant/10 px-4 py-3 font-body text-sm text-on-surface/80">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
};
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "../components/Footer";
import { MarkdownViewer } from "../components/Markdown";
import post from "../components/content/post.md?raw";
import BackToTop from "../components/BackToTop";
import { useEffect } from "react";

const Post = () => {
  const { slug } = useParams();

  // Format the slug to display as title (capitalize, replace hyphens with spaces)
  const formatTitle = (slug: string) => {
    return (
      slug
        ?.split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ") || ""
    );
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div id="blog_post" className="bg-background">
      <Navbar />
      <main className="w-full pt-20 bg-transparent min-h-screen">
        <div className="flex flex-col w-full relative overflow-hidden">
          {/* Breadcrumb */}
          <div className="w-full max-w-container mx-auto px-margin-mobile md:px-margin-laptop lg:px-margin-desktop pt-8">
            <div className="flex items-center gap-2 text-sm">
              <Link
                to="/blog"
                className="font-mono text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                blog
              </Link>
              <span className="text-on-surface-variant/30">/</span>
              <span className="font-mono text-primary truncate">
                {formatTitle(slug || "")}
              </span>
            </div>
          </div>

          <div className="w-full max-w-container mx-auto px-margin-mobile md:px-margin-laptop lg:px-margin-desktop py-12">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* left column: main content */}
              <div className="lg:w-2/3">
                <div className="w-full">
                  <h1 className="font-heading font-bold text-headline-xl text-on-surface mb-4">
                    {formatTitle(slug || "")}
                  </h1>
                  <MarkdownViewer content={post} className="font-body text-body" />
                </div>
              </div>

              {/* right column: sidebar - sticky */}
              {/* <div className="lg:w-1/3">
                <div className="lg:sticky lg:top-24">
                  <div className="w-full rounded-xl border border-outline-variant/20 bg-surface-container/40 p-4 backdrop-blur-sm">
                    <div className="border-b border-primary font-mono text-sm uppercase tracking-widest text-on-surface-variant pb-2 mb-4">
                      Content
                    </div>

                    <ul className="space-y-2">
                      <li className="font-body text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                        Section 1
                      </li>
                      <li className="font-body text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                        Section 2
                      </li>
                      <li className="font-body text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                        Section 3
                      </li>
                    </ul>
                  </div>
                </div>
              </div> */}

            </div>
          </div>
        </div>
      </main>
      <BackToTop />
      <Footer />
    </div>
  );
};

export default Post;
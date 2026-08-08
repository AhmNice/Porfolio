import { useEffect } from "react";
import BlogCard from "../components/card/BlogCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ArrowRight, Clock } from "lucide-react";

const Blog = () => {
  const featuredPost = {
    title: "Architecting Scalable Micro-frontends with Next.js",
    excerpt:
      "A comprehensive guide to building resilient, independently deployable frontend architectures. We explore module federation, edge routing strategies, and managing shared state across isolated React applications without sacrificing performance.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBKN8yXilnpgRrnCbQxG4M28nu3U49UlIwzMsPpIlKRfek3kuFuOFTGKd03Yk3j4jBlSmuC4dCXHTcHRE9bIgB46FfVEQkyp1G6xZNaHrJZgwnhvq27StvDNeG0_qUxQF6RCGtCdXMuhzB1KM_bV9eDQ-P3SMqIO_-VMsgZds3PmM3-gRL_15K3P9N82O4ebPz-9Fu-xWEUGsXoas4ftxjnzX8WFey8KC6PXCLQypZi_Z5WuTMzfRB_KA",
    date: "OCT 24, 2024",
    readTime: "12 MIN READ",
    category: "ARCHITECTURE",
    tag: "NEW",
    slug: "architecting-scalable-micro-frontends",
    techTags: ["Next.js", "React", "Module Federation", "TypeScript"],
  };

  const blogPosts = [
    {
      id: 1,
      title: "The Physics of Animation: Bringing UI to Life",
      excerpt:
        "Moving beyond standard easing curves. Implementing spring physics for natural, intuitive user interfaces that react to gesture velocity.",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC_sopZqCsRc0koRttYqiSvxx0hMtd6_RAiRuCe9oAiavW8eVEj8Wk1kZbCDmzps9pFhS_T_H0oV8eYVeSZUwKRVeyH-S-3puRySuldaqTeFQ335MxKXrAx6kl0_wkZ8PrhkzgnhIW6NAYHV4zZMIB0DokObMvX_fi3pH2hfW8i7t0nhkHn2AEWaNul8fHf99jERambNupaV8AReCM2-OUqszqyS_SfJo7V6KcHpYgivM2qvE6x1tsCLg",
      date: "SEP 18, 2024",
      readTime: "8 MIN READ",
      category: "UI/UX",
      slug: "physics-of-animation-bringing-ui-to-life",
      techTags: ["Framer Motion", "React", "CSS", "Animation"],
    },
    {
      id: 2,
      title: "Optimizing WebGL Render Loops for Mobile Devices",
      excerpt:
        "Techniques for maintaining 60fps in Three.js scenes on constrained devices. From instanced meshes to custom shader optimization.",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuABFDiqxL-JMjcKRKhuPId6UqLKbOCiHcDLxzvVWPW6szkvXSaKjlIlC4zXfX4Xip-77RswiYIkqWfhHDi-Rcmy9u8RUz7lm_7MzRByRIeaVl02dTV0fk_VU8HZcr3Z17UTSW4xpsVA5ySlPz7GtJLHC6_tT39NS7aAHsO-kWw0LRvCoWsbGRrJ8VEwuILct0KuCXKx1t8qhLn3yAp45kY7I-FChD5fqL1ahTl1AYMEtAxuY7tDNzEjNw",
      date: "AUG 02, 2024",
      readTime: "15 MIN READ",
      category: "PERFORMANCE",
      slug: "optimizing-webgl-render-loops-for-mobile",
      techTags: ["Three.js", "WebGL", "Shader", "Mobile"],
    },
    {
      id: 3,
      title: "Designing for the Edge: Serverless State",
      excerpt:
        "How edge computing is reshaping application state management. Strategies for dealing with latency, synchronization, and eventual consistency.",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCgCipJH1RoCHfMJxD4ngeRqpxgDTbOzDXMXZNAXY_OoISvh8ZuK1wyINJ1CCw4qpzNS5MpaipUwM26U8ZqtUdfroCgz8TZOjgmvtjo08AYhOj4IXpWX939S8Da4-U1TEp0wRbnsJ_KQJf-_37n6ivmkN1vSZ6LCBgB4TJT0fAQ629cxqyFPhDn_Nbq0kd8d06x5B0E1CLM9BhqYxHxJPifG4SzNNV5g7JOXePUpxgCvhjNqhIjx60NHw",
      date: "JUL 14, 2024",
      readTime: "6 MIN READ",
      category: "SYSTEMS",
      slug: "designing-for-the-edge-serverless-state",
      techTags: ["Serverless", "Edge", "Cloud", "AWS"],
    },
  ];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="w-full pt-20 bg-transparent min-h-screen">
        <div className="flex flex-col w-full relative overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(190,242,100,0.05),transparent_50%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(190,242,100,0.03),transparent_40%)] pointer-events-none" />

          {/* Hero Section */}
          <section className="w-full max-w-container mx-auto px-margin-mobile md:px-margin-laptop lg:px-margin-desktop pt-16 pb-20 relative z-10 animate-[fadeInUp_0.8s_ease-out_forwards]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <h1 className="font-heading text-headline-xl font-bold text-on-surface mb-6">
                  Technical
                  <br />
                  Perspectives
                </h1>
              </div>

              <div className="max-w-xl">
                <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
                  Deep dives into performance engineering, rendering pipelines,
                  and the subtle art of crafting digital experiences that feel
                  inherently human.
                </p>
              </div>
            </div>
          </section>

          {/* Featured Post */}
          <section className="w-full max-w-container mx-auto px-margin-mobile md:px-margin-laptop lg:px-margin-desktop mb-24 relative z-10">
            <div className="w-full rounded-2xl bg-surface-container-low overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-500 relative flex flex-col md:flex-row min-h-[400px]">
              <div className="w-full md:w-[55%] relative h-[300px] md:h-auto overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${featuredPost.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent md:bg-gradient-to-r opacity-90" />
                <div className="absolute top-6 left-6 flex items-center gap-3">
                  <span className="px-3 py-1 bg-primary/10 backdrop-blur-sm rounded-full font-mono text-label text-primary shadow-sm border border-primary/20">
                    {featuredPost.category}
                  </span>
                  <span className="px-3 py-1 bg-surface/40 backdrop-blur-sm rounded-full font-mono text-label text-on-surface-variant border border-outline-variant/20">
                    {featuredPost.tag}
                  </span>
                </div>
              </div>

              <div className="w-full md:w-[45%] p-8 md:p-12 flex flex-col justify-center bg-surface-container-low/90 backdrop-blur-xl relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-mono text-xs text-on-surface-variant">
                    {featuredPost.date}
                  </span>
                  <div className="w-1 h-1 rounded-full bg-outline-variant" />
                  <span className="font-mono text-xs text-on-surface-variant flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <h2 className="font-heading text-headline-xl-mobile md:text-headline-xl text-on-surface mb-6 group-hover:text-primary transition-colors duration-300">
                  {featuredPost.title}
                </h2>
                <p className="font-body text-body-md text-on-surface-variant mb-6 line-clamp-3">
                  {featuredPost.excerpt}
                </p>

                {/* Tech Tags - Featured Post */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredPost.techTags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary/80 font-mono text-[8px] uppercase tracking-widest"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex -space-x-2">
                    <div
                      className="w-8 h-8 rounded-full border border-surface-container-low overflow-hidden bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB1ISd080K87bBrMdVsjCBvDMBsW4zRss_NzSYup6GrWNb5CuYlqcUZiwdXQ2EHQVCpcFMqWXyfB86mMgKldZfLELOnR7EjDEwE1-cHgj4wFi-_ajFHvStXbNHmlUyxHlbvc6SWtGwsTBrO_XI9LmPD52IBopHnpPxQ13e88XVdTl6ND-O-1MnaJC28vo4mDpJzrJ87X4NEn1jYiPWIKFr_TyTCk66A2H1VbU7WBg9thjuoiqzImniQnQ')",
                        backgroundSize: "cover",
                      }}
                    />
                  </div>
                  <a
                    href={`/blog/${featuredPost.slug}`}
                    className="w-10 h-10 rounded-full bg-surface-variant group-hover:bg-primary flex items-center justify-center transition-colors duration-300 shadow-md"
                  >
                    <ArrowRight className="w-5 h-5 text-on-surface-variant group-hover:text-on-primary transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Posts */}
          <section className="w-full max-w-container mx-auto px-margin-mobile md:px-margin-laptop lg:px-margin-desktop pb-20">
            <div className="flex items-center gap-4 mb-12">
              <h3 className="font-heading text-headline-md text-on-surface">
                Recent Dispatches
              </h3>
              <div className="flex-1 h-px bg-outline-variant/20" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>

            {/* Load More */}
            <div className="w-full flex justify-center mt-16">
              <button className="px-8 py-4 bg-transparent border-none text-on-surface font-mono text-sm tracking-widest uppercase hover:text-primary transition-colors flex flex-col items-center gap-2 group relative">
                <span>Load More Articles</span>
                <div className="w-px h-8 bg-outline-variant group-hover:bg-primary transition-colors" />
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;

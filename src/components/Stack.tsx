import { useEffect, useRef, useState } from "react";
import StackCard from "./card/StackCard";

type StackCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "Mobile"
  | "Other"
  | "DevOps";

type StackItem = {
  type: StackCategory;
  title: string;
  list: string[];
  icon: string;
};

const Stack = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stackData: StackItem[] = [
    {
      type: "Frontend",
      title: "Frontend Stack",
      list: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      icon: "Globe",
    },
    {
      type: "Backend",
      title: "Backend Stack",
      list: ["Node.js", "Express", "Go", "REST APIs"],
      icon: "Server",
    },
    {
      type: "Database",
      title: "Database Stack",
      list: ["PostgreSQL", "MongoDB", "Redis", "Prisma"],
      icon: "Database",
    },
    {
      type: "Mobile",
      title: "Mobile Stack",
      list: ["React Native", "Expo", "iOS", "Android"],
      icon: "Smartphone",
    },
    {
      type: "Other",
      title: "DevOps Stack",
      list: ["Docker", "AWS", "CI/CD", "Terraform"],
      icon: "Cloud",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="stack"
      className="relative flex flex-col min-h-svh items-center pt-20 pb-20 overflow-hidden "
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-tertiary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "10s", animationDelay: "2s" }}
        />
      </div>

      <div
        className="w-full px-margin-mobile md:px-margin-laptop mt-10 lg:px-margin-desktop"
        style={{ maxWidth: "1280px" }}
      >
        {/* Header Section with Animation */}
        <div
          className={`relative z-10 mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-gutter items-start">
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="flex items-center gap-3 mb-4 lg:mb-0">
                <span className="w-8 h-[2px] bg-primary hidden lg:block" />
                <p className="font-mono text-label uppercase tracking-widest text-primary">
                  Capabilities
                </p>
              </div>
              <h2 className="font-heading text-headline-xl-mobile lg:text-headline-xl font-bold leading-none text-on-surface">
                Tech Stack
              </h2>
            </div>

            <div className="lg:col-span-7 xl:col-span-8">
              <p className="max-w-3xl font-body text-body-md leading-relaxed text-on-surface-variant">
                I build full-stack web and mobile applications using modern
                technologies across the frontend, backend, databases, and cloud.
                Every tool in my stack is chosen to create fast, scalable, and
                maintainable products.
              </p>
            </div>
          </div>
        </div>

        {/* Stack Cards Grid with Staggered Animation */}
        <div className="relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {stackData.map((stack, index) => (
              <div
                key={stack.type}
                className={`w-full flex justify-center transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-16"
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <StackCard
                  type={stack.type}
                  title={stack.title}
                  list={stack.list}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div
          className={`relative z-10 mt-16 pt-8 border-t border-outline-variant/10 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
                </span>
                <span className="font-mono text-xs text-on-surface-variant">
                  {stackData.reduce((acc, curr) => acc + curr.list.length, 0)}{" "}
                  Technologies
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary/50" />
                <span className="font-mono text-xs text-on-surface-variant">
                  {stackData.length} Categories
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {stackData.map((stack) => (
                <span
                  key={stack.type}
                  className="px-3 py-1 rounded-full bg-surface-variant/30 text-[8px] font-mono uppercase tracking-wider text-on-surface-variant/60 border border-outline-variant/10 hover:border-primary/30 hover:text-primary transition-colors cursor-default"
                >
                  {stack.type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stack;

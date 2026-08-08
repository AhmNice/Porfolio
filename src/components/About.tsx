import { useEffect, useRef, useState } from "react";
import ImageCard from "./card/Image";

const About = () => {
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

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative flex flex-col items-center py-20 overflow-hidden"
    >
      {/* Background Decoration */}
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
        className="w-full px-margin-mobile mt-10 md:px-margin-laptop lg:px-margin-desktop"
        style={{ maxWidth: "1280px" }}
      >
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-gutter items-start">
          {/* Left Column - Title & Image */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div
              className={`flex items-center gap-3 mb-4 lg:mb-0 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <span className="w-8 h-[2px] bg-primary hidden lg:block"></span>
              <p className="font-mono text-label uppercase tracking-widest text-primary">
                About Me
              </p>
            </div>

            <h2
              className={`font-heading text-headline-xl-mobile lg:text-headline-xl font-bold leading-none text-on-surface transition-all duration-700 delay-100 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              Who I Am
            </h2>

            {/* Image Card - Hidden on mobile, visible on desktop */}
            <div
              className={`hidden lg:block mt-6 transition-all duration-700 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <ImageCard />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
            <p
              className={`font-body text-body-lg leading-relaxed text-on-surface-variant transition-all duration-700 delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              I am a passionate and dedicated software developer with a strong
              interest in building innovative and efficient solutions. With a
              solid foundation in programming languages and frameworks, I enjoy
              tackling complex problems and continuously learning new
              technologies.
            </p>

            <p
              className={`font-body text-body-md leading-relaxed text-on-surface-variant/80 transition-all duration-700 delay-400 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              My goal is to contribute to impactful projects that make a
              difference in the world of technology, while delivering clean,
              maintainable, and scalable code.
            </p>

            {/* Image Card - Visible on mobile only */}
            <div
              className={`lg:hidden flex justify-center transition-all duration-700 delay-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <ImageCard />
            </div>

            {/* Stats or highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              {[
                { value: "3+", label: "Years Experience", delay: 500 },
                { value: "10+", label: "Projects", delay: 600 },
                { value: "5+", label: "Technologies", delay: 700 },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`bg-surface-container/40 backdrop-blur-sm rounded-lg p-4 border border-outline-variant/10 transition-all duration-700 hover:border-primary/30 hover:bg-surface-container/60 ${
                    index === 2 ? "col-span-2 sm:col-span-1" : ""
                  } ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${stat.delay}ms` }}
                >
                  <span className="block font-heading text-headline-xl-mobile text-primary">
                    {stat.value}
                  </span>
                  <span className="font-body text-body-sm text-on-surface-variant">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

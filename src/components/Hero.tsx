import Terminal from "./Terminal";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex flex-col  items-center py-20 overflow-hidden"
    >
      {/* Background Decorations */}
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

      <div className="w-full px-margin-mobile mt-10 md:px-margin-laptop  lg:px-margin-desktop" style={{ maxWidth: "1280px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center gap-6 lg:col-span-7">
            {/* Availability Badge */}
            <div className="inline-flex w-fit items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 backdrop-blur-md animate-fade-in-up">
              <div className="relative flex h-3 w-3 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-fixed-dim opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-primary-container shadow-[0_0_8px_rgba(190,242,100,0.6)]" />
              </div>
              <span className="font-mono text-label-small uppercase tracking-widest text-primary">
                Available for new opportunities
              </span>
            </div>

            <div className="space-y-4 max-w-2xl">
              <p
                className="font-mono text-label-small uppercase tracking-[0.2em] text-primary animate-fade-in-up"
                style={{ animationDelay: "0.1s" }}
              >
                Hello, I'm
              </p>

              <h1
                className="font-heading text-headline-xl-mobile font-bold leading-none text-on-surface lg:text-headline-xl animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                Muhammed Awwal
              </h1>

              <h2
                className="font-heading text-headline-md text-on-surface animate-fade-in-up"
                style={{ animationDelay: "0.3s" }}
              >
                Full-Stack Developer building modern web & mobile applications.
              </h2>

              <p
                className="font-body text-body-lg leading-relaxed text-on-surface-variant animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                I build scalable, high-performance web and mobile applications
                using React, React Native, Node.js, TypeScript, and PostgreSQL,
                with a strong focus on clean architecture, performance, and user
                experience.
              </p>
            </div>

            <div
              className="flex flex-wrap gap-4 animate-fade-in-up"
              style={{ animationDelay: "0.5s" }}
            >
              <a
                href="#projects"
                className="rounded-lg bg-primary-container px-6 py-3 font-heading text-on-primary-container transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="rounded-lg border border-outline px-6 py-3 font-heading text-on-surface transition-all duration-300 hover:border-primary hover:text-primary hover:-translate-y-1"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Right Content - Terminal */}
          <div
            className="hidden lg:col-span-5 lg:flex lg:items-center lg:justify-end animate-fade-in-right"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="w-full max-w-md">
              <Terminal />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in-up"
        style={{ animationDelay: "0.7s" }}
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant/40">
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border-2 border-outline-variant/20 flex justify-center p-1">
          <div className="w-1 h-2 bg-primary/40 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

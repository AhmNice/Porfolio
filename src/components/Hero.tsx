import Terminal from "./Terminal";

const STACK = ["React", "React Native", "Node.js", "TypeScript", "PostgreSQL"] as const;

const enter = (delaySeconds: number) => ({ animationDelay: `${delaySeconds}s` });

const HeroBackground = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    {/* Faint engineering-paper grid, faded toward the edges. Colour comes from the text colour token. */}
    <div
      className="absolute inset-0 text-outline-variant/15"
      style={{
        backgroundImage:
          "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage: "radial-gradient(ellipse at 60% 40%, black 20%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse at 60% 40%, black 20%, transparent 70%)",
      }}
    />

    {/* One quiet glow, sitting behind the terminal. */}
    <div
      className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl motion-safe:animate-pulse"
      style={{ animationDuration: "8s" }}
    />
    <div
      className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-tertiary/5 blur-3xl motion-safe:animate-pulse"
      style={{ animationDuration: "10s", animationDelay: "2s" }}
    />
  </div>
);

const Hero = () => {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex flex-col items-center overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-28"
    >
      <HeroBackground />

      <div
        className="relative mt-10 w-full px-margin-mobile md:px-margin-laptop lg:px-margin-desktop"
        style={{ maxWidth: "1280px" }}
      >
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-gutter">
          {/* Left: identity, value proposition, stack, actions */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            {/* Availability */}
            <div
              className="inline-flex w-fit items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 motion-safe:animate-fade-in-up"
              style={enter(0)}
            >
              <span className="relative flex h-3 w-3 items-center justify-center" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary-fixed-dim opacity-75 motion-safe:animate-ping" />
                <span className="relative h-2 w-2 rounded-full bg-primary-container" />
              </span>
              <span className="font-mono text-label-small text-primary">
                Available for new opportunities
              </span>
            </div>

            {/* Who I am / what I do */}
            <div className="space-y-3 motion-safe:animate-fade-in-up" style={enter(0.1)}>
              <p className="font-mono text-label-small text-on-surface-variant">
                <span aria-hidden="true" className="text-primary">
                  //{" "}
                </span>
                Hi, I&apos;m
              </p>

              <h1
                id="hero-heading"
                className="font-heading text-headline-xl-mobile font-bold leading-none tracking-tight text-on-surface lg:text-headline-xl"
              >
                Muhammed Awwal
              </h1>

              <h2 className="max-w-xl text-balance font-heading text-headline-md text-on-surface">
                I build reliable web and mobile apps, from the database to the interface.
              </h2>
            </div>

            {/* Detail, stack, actions */}
            <div className="flex flex-col gap-6 motion-safe:animate-fade-in-up" style={enter(0.25)}>
              <p className="max-w-xl font-body text-body-lg leading-relaxed text-on-surface-variant">
                Full-stack developer and recent Computer Science graduate, focused on clean
                architecture, performance, and user experience. I take features from schema and API
                to a polished interface, on the web and in React Native.
              </p>

              {/* On mobile the CTAs come first so they stay above the fold. */}
              <ul aria-label="Core technologies" className="flex flex-wrap gap-2 max-sm:order-last">
                {STACK.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-outline-variant/40 bg-surface-container px-3 py-1 font-mono text-label-small text-on-surface-variant"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="rounded-lg bg-primary-container px-6 py-3 font-heading text-on-primary-container transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-safe:hover:-translate-y-0.5"
                >
                  View projects
                </a>

                <a
                  href="#contact"
                  className="rounded-lg border border-outline px-6 py-3 font-heading text-on-surface transition-all duration-300 hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-safe:hover:-translate-y-0.5"
                >
                  Contact me
                </a>
              </div>
            </div>
          </div>

          {/* Right (below on mobile): terminal */}
          <div
            className="w-full max-w-xl lg:col-span-5 lg:max-w-none motion-safe:animate-fade-in-right"
            style={enter(0.3)}
          >
            <Terminal />
          </div>
        </div>
      </div>

      {/* Scroll cue: desktop only, where it won't collide with stacked content */}
      <a
        href="#projects"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary lg:flex"
      >
        <span className="font-mono text-label-small text-on-surface-variant/60">Scroll</span>
        <span className="sr-only">to projects</span>
        <span
          aria-hidden="true"
          className="flex h-8 w-5 justify-center rounded-full border-2 border-outline-variant/30 p-1"
        >
          <span className="h-2 w-1 rounded-full bg-primary/50 motion-safe:animate-bounce" />
        </span>
      </a>
    </section>
  );
};

export default Hero;
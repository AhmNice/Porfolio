import { useCallback, useEffect, useRef, useState } from "react";

interface Token {
  text: string;
  className?: string;
}

type OutputLine = Token[];

interface Entry {
  command: string;
  output: OutputLine[];
}

const KEY = "text-tertiary";
const STRING = "text-primary";
const MUTED = "text-on-surface-variant";
const SUCCESS = "text-green-400";

const tok = (text: string, className?: string): Token => ({
  text,
  className,
});

const ENTRIES: Entry[] = [
  {
    command: "whoami",
    output: [
      [tok("Muhammed Awwal")],
      [tok("full-stack developer", MUTED)],
    ],
  },
  {
    command: "stack",
    output: [
      [tok("frontend", KEY), tok(" → "), tok("React", STRING), tok(" · "), tok("React Native", STRING)],
      [tok("backend", KEY), tok(" → "), tok("Node.js", STRING), tok(" · "), tok("TypeScript", STRING)],
      [tok("database", KEY), tok(" → "), tok("PostgreSQL", STRING)],
    ],
  },
  {
    command: "status",
    output: [[tok("✓ ", SUCCESS), tok("Available for new opportunities", SUCCESS)]],
  },
];

const CHAR_TYPING_MS = 28;
const BEFORE_TYPING_MS = 250;
const AFTER_COMMAND_PAUSE_MS = 300;
const AFTER_OUTPUT_PAUSE_MS = 450;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

const Prompt = () => (
  <span className="select-none">
    <span className="text-primary">➜</span>{" "}
    <span className="text-tertiary">portfolio</span>{" "}
    <span className={MUTED}>git:(</span>
    <span className="text-primary">main</span>
    <span className={MUTED}>)</span>{" "}
  </span>
);

const Cursor = () => (
  <span
    aria-hidden="true"
    className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-primary motion-safe:terminal-cursor"
  />
);

const CommandLine = ({
  text,
  cursor = false,
}: {
  text: string;
  cursor?: boolean;
}) => (
  <p className="whitespace-pre-wrap break-words">
    <Prompt />
    <span className="text-on-surface">{text}</span>
    {cursor && <Cursor />}
  </p>
);

const OutputBlock = ({ lines }: { lines: OutputLine[] }) => (
  <div className="pl-4">
    {lines.map((line, i) => (
      <p
        key={i}
        className="whitespace-pre-wrap break-words text-on-surface"
      >
        {line.map((token, j) => (
          <span key={j} className={token.className}>
            {token.text}
          </span>
        ))}
      </p>
    ))}
  </div>
);

const BranchIcon = () => (
  <svg
    viewBox="0 0 16 16"
    className="h-3.5 w-3.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <circle cx="4.5" cy="3.5" r="1.5" />
    <circle cx="4.5" cy="12.5" r="1.5" />
    <circle cx="11.5" cy="6" r="1.5" />
    <path d="M4.5 5v6M11.5 7.5c0 2-2.5 2.5-7 3.5" />
  </svg>
);

const StaticSession = () => (
  <div className="space-y-3">
    {ENTRIES.map((entry) => (
      <div key={entry.command}>
        <CommandLine text={entry.command} />
        <OutputBlock lines={entry.output} />
      </div>
    ))}

    <CommandLine text="" />
  </div>
);

const Terminal = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [runId, setRunId] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [typed, setTyped] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [idle, setIdle] = useState(false);

  /*
   * Respect prefers-reduced-motion.
   * When enabled, show the completed terminal immediately.
   */
  useEffect(() => {
    if (!prefersReducedMotion()) return;

    setReduceMotion(true);
    setCompleted(ENTRIES.length);
    setIdle(true);
  }, []);

  /*
   * Start the animation when the terminal enters the viewport.
   */
  useEffect(() => {
    const element = rootRef.current;

    if (!element || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setInView(true);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  /*
   * Terminal typewriter animation.
   */
  useEffect(() => {
    if (!inView || reduceMotion) return;

    let cancelled = false;

    setCompleted(0);
    setTyped("");
    setShowOutput(false);
    setIdle(false);

    const run = async () => {
      for (let i = 0; i < ENTRIES.length; i += 1) {
        const { command } = ENTRIES[i];

        await wait(BEFORE_TYPING_MS);

        if (cancelled) return;

        for (let c = 1; c <= command.length; c += 1) {
          setTyped(command.slice(0, c));

          await wait(CHAR_TYPING_MS);

          if (cancelled) return;
        }

        await wait(AFTER_COMMAND_PAUSE_MS);

        if (cancelled) return;

        setShowOutput(true);

        await wait(AFTER_OUTPUT_PAUSE_MS);

        if (cancelled) return;

        setCompleted(i + 1);
        setTyped("");
        setShowOutput(false);
      }

      setIdle(true);
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [inView, reduceMotion, runId]);

  const handleReplay = useCallback(() => {
    setRunId((id) => id + 1);
  }, []);

  const activeEntry =
    completed < ENTRIES.length ? ENTRIES[completed] : null;

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label="Terminal session summarising my profile"
      className="w-full overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container shadow-xl"
    >
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-outline-variant/20 bg-surface-container-high px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-outline-variant/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-outline-variant/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-outline-variant/60" />
          </div>

          <span
            className="font-mono text-xs text-on-surface-variant"
            aria-hidden="true"
          >
            portfolio — zsh
          </span>
        </div>

        {!reduceMotion && (
          <button
            type="button"
            onClick={handleReplay}
            className="rounded-md px-2 py-1 font-mono text-xs text-on-surface-variant transition-colors hover:bg-surface-container-highest hover:text-on-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label="Replay terminal intro animation"
          >
            ↺ replay
          </button>
        )}
      </div>

      {/* Terminal body */}
      <div
        className="grid min-h-[280px] p-5 font-mono text-xs leading-relaxed"
        aria-hidden="true"
      >
        {/* Invisible copy reserves the terminal height */}
        <div className="invisible col-start-1 row-start-1">
          <StaticSession />
        </div>

        {/* Animated session */}
        <div className="col-start-1 row-start-1 space-y-3">
          {ENTRIES.slice(0, completed).map((entry) => (
            <div key={entry.command}>
              <CommandLine text={entry.command} />
              <OutputBlock lines={entry.output} />
            </div>
          ))}

          {!idle && activeEntry && (
            <div>
              <CommandLine
                text={typed}
                cursor={!showOutput}
              />

              {showOutput && (
                <OutputBlock lines={activeEntry.output} />
              )}
            </div>
          )}

          {idle && <CommandLine text="" cursor />}
        </div>
      </div>

      {/* Status bar */}
      <div
        className="flex items-center justify-between border-t border-outline-variant/20 bg-surface-container-high px-4 py-2 font-mono text-xs text-on-surface-variant"
        aria-hidden="true"
      >
        <span className="flex items-center gap-2">
          <BranchIcon />

          main

          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            clean
          </span>
        </span>

        <span>TypeScript</span>
      </div>

      {/* Accessible static content */}
      <dl className="sr-only">
        {ENTRIES.map((entry) => (
          <div key={entry.command}>
            <dt>{entry.command}</dt>
            <dd>
              {entry.output
                .map((line) => line.map((token) => token.text).join(""))
                .join(" ")}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default Terminal;
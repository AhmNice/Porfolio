import React from "react";

const Terminal = () => {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-outline-variant/20 bg-surface-container-high px-4 py-3">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="h-3 w-3 rounded-full bg-green-500" />
        </div>

        <span className="font-mono text-xs text-on-surface-variant">
          awwal@portfolio
        </span>
      </div>

      <div className="space-y-4 p-6 font-mono text-sm">
        <div>
          <p
            className="animate-type text-primary"
            style={{ animationDelay: "0s" }}
          >
            $ whoami
          </p>

          <p
            className="animate-type text-on-surface"
            style={{ animationDelay: "1.2s" }}
          >
            Muhammed Awwal
          </p>
        </div>

        <div>
          <p
            className="animate-type text-primary"
            style={{ animationDelay: "2.5s" }}
          >
            $ stack
          </p>

          <p
            className="animate-type text-on-surface-variant"
            style={{ animationDelay: "3.8s" }}
          >
            React • React Native • Node.js • TypeScript • PostgreSQL
          </p>
        </div>

        <div>
          <p
            className="animate-type text-primary"
            style={{ animationDelay: "5.4s" }}
          >
            $ currently_building
          </p>

          <p
            className="animate-type text-primary-container"
            style={{ animationDelay: "6.8s" }}
          >
            Servo 🚀
          </p>
        </div>

        <div>
          <p
            className="animate-type text-primary"
            style={{ animationDelay: "8.4s" }}
          >
            $ status
          </p>

          <p
            className="animate-type text-green-400"
            style={{ animationDelay: "9.6s" }}
          >
            Available for opportunities
          </p>
        </div>

        <div className="mt-2 flex items-center gap-1">
          <span className="text-primary">$</span>
          <span className="h-5 w-[2px]  delay-1000 animate-cursor bg-primary" />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
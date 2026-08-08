import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system";

    const saved = localStorage.getItem("theme");

    return saved === "light" || saved === "dark" || saved === "system"
      ? saved
      : "system";
  });

  const applyTheme = (selectedTheme: Theme) => {
    const isDark =
      selectedTheme === "dark" ||
      (selectedTheme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    document.documentElement.classList.toggle("dark", isDark);
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const listener = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [theme]);

  return (
    <div className="flex items-center rounded-full border border-outline bg-surface-container p-1 shadow-md">
      <button
        onClick={() => handleThemeChange("light")}
        className={`rounded-full p-2 transition-all ${
          theme === "light"
            ? "bg-primary text-on-primary"
            : "text-on-surface-variant hover:bg-surface-variant"
        }`}
        aria-label="Light mode"
      >
        <Sun className="h-4 w-4" />
      </button>

      <button
        onClick={() => handleThemeChange("system")}
        className={`rounded-full p-2 transition-all ${
          theme === "system"
            ? "bg-primary text-on-primary"
            : "text-on-surface-variant hover:bg-surface-variant"
        }`}
        aria-label="System mode"
      >
        <Monitor className="h-4 w-4" />
      </button>

      <button
        onClick={() => handleThemeChange("dark")}
        className={`rounded-full p-2 transition-all ${
          theme === "dark"
            ? "bg-primary text-on-primary"
            : "text-on-surface-variant hover:bg-surface-variant"
        }`}
        aria-label="Dark mode"
      >
        <Moon className="h-4 w-4" />
      </button>
    </div>
  );
};

export default ThemeToggle;

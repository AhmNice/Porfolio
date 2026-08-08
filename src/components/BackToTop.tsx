import { MoveUp } from "lucide-react";
import React, { useState, useEffect } from "react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className="rounded-full bg-primary/90 p-3 shadow-lg hover:bg-primary transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-primary/20 cursor-pointer group"
      >
        <MoveUp className="h-5 w-5 text-on-primary transition-transform duration-300 group-hover:-translate-y-1" />
      </button>
    </div>
  );
};

export default BackToTop;
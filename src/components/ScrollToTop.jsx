import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    showScrollTop && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-techno_main text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        data-aos="fade-up"
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    )
  );
}

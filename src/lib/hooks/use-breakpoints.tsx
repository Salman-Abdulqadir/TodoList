import { useEffect, useState } from "react";

function useBreakpoint() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Tailwind's default breakpoints
  if (width < 640) return "base"; // < sm
  if (width >= 640 && width < 768) return "sm"; // sm: 640px
  if (width >= 768 && width < 1024) return "md"; // md: 768px
  if (width >= 1024 && width < 1280) return "lg"; // lg: 1024px
  if (width >= 1280 && width < 1536) return "xl"; // xl: 1280px
  return "2xl"; // ≥ 1536px
}

export default useBreakpoint;

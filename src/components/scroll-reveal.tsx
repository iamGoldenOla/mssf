import { useEffect, useRef, useState } from "react";

export function ScrollReveal({
  children,
  delay = 0,
  duration = 800,
  translateY = 24,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  translateY?: number;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px", // triggers slightly before entering 75% of viewport
      }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0)"
          : `translateY(${translateY}px)`,
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
        transitionProperty: "opacity, transform",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
}

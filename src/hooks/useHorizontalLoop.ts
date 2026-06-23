import { useCallback, useEffect, useRef } from "react";

type HorizontalLoopOptions = {
  speed?: number;
};

export function useHorizontalLoop({ speed = 1 }: HorizontalLoopOptions = {}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);
  const visibleRef = useRef(true);

  const pause = useCallback(() => {
    pausedRef.current = true;
  }, []);

  const resume = useCallback(() => {
    pausedRef.current = false;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number;
    let totalScroll = container.scrollWidth / 2;

    const updateTotalScroll = () => {
      totalScroll = container.scrollWidth / 2;
    };

    const animate = () => {
      if (!pausedRef.current && visibleRef.current) {
        container.scrollLeft += speed;
        if (container.scrollLeft >= totalScroll) {
          container.scrollLeft -= totalScroll;
        }
      }

      rafId = window.requestAnimationFrame(animate);
    };

    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              visibleRef.current = entry.isIntersecting;
            },
            { threshold: 0.05 }
          )
        : null;

    updateTotalScroll();
    observer?.observe(container);
    rafId = window.requestAnimationFrame(animate);
    window.addEventListener("resize", updateTotalScroll);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updateTotalScroll);
      observer?.disconnect();
    };
  }, [speed]);

  return { containerRef, pause, resume };
}

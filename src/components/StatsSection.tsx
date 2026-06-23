"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { num: 10, label: "anos de experiência" },
  { num: 3, label: "participações em jogos olímpicos" },
  { num: 200, label: "bolsas atribuídas" },
  { num: 10, label: "medalhas continentais conquistadas" },
] as const;

const numberFormatter = new Intl.NumberFormat("pt-PT");

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-16 border-t">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          {STATS.map((item) => (
            <StatItem key={item.label} end={item.num} label={item.label} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({
  end,
  label,
  started,
}: {
  end: number;
  label: string;
  started: boolean;
}) {
  const value = useCountUp(end, started);

  return (
    <div className="p-4">
      <div className="text-4xl sm:text-5xl font-extrabold text-blue-900">
        +{numberFormatter.format(value)}
      </div>
      <div className="mt-2 text-base font-medium text-gray-700">{label}</div>
    </div>
  );
}

function useCountUp(end: number, started: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!started) return;

    const duration = 1500;
    const startTime = performance.now();
    let frameId: number;

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setValue(Math.floor(progress * end));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      } else {
        setValue(end);
      }
    };

    frameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frameId);
  }, [end, started]);

  return value;
}

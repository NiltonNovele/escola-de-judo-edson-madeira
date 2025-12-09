"use client";

import { useEffect, useRef, useState } from "react";

export default function StatsSection() {
  const stats = [
    { num: 2000, label: "alunos formados" },
    { num: 20, label: "anos de experiência" },
    { num: 400, label: "bolsas atribuídas" },
    { num: 1500, label: "medalhas conquistadas" },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  // Start count-up when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
  }, []);

  const animateValue = (end: number) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
      if (!started) return;

      let start = 0;
      const duration = 1500;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = end / steps;

      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          setValue(end);
          clearInterval(counter);
        } else {
          setValue(Math.floor(start));
        }
      }, stepTime);

      return () => clearInterval(counter);
    }, [started, end]);

    return value;
  };

  return (
    <section ref={sectionRef} className="bg-white py-16 border-t">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          {stats.map((item, index) => {
            const value = animateValue(item.num);

            return (
              <div key={index} className="p-4">
                <div className="text-4xl sm:text-5xl font-extrabold text-blue-900">
                  +{value.toLocaleString("pt-PT")}
                </div>
                <div className="mt-2 text-base font-medium text-gray-700">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

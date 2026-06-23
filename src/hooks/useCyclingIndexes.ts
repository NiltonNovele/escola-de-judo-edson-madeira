import { useEffect, useState } from "react";

type CyclingItem = {
  id: number;
  images?: readonly string[];
};

export function useCyclingIndexes<T extends CyclingItem>(
  items: readonly T[],
  intervalMs = 3000
) {
  const [indexes, setIndexes] = useState<Record<number, number>>({});

  useEffect(() => {
    if (!items.some((item) => item.images?.length)) return;

    const interval = window.setInterval(() => {
      if (document.hidden) return;

      setIndexes((prev) => {
        const updated = { ...prev };

        items.forEach((item) => {
          if (item.images?.length) {
            updated[item.id] = ((updated[item.id] ?? 0) + 1) % item.images.length;
          }
        });

        return updated;
      });
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [intervalMs, items]);

  return indexes;
}

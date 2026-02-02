import { useEffect, useMemo, useState } from "react";

export function useActiveSection(ids: string[], topOffsetPx = 260) {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "");

  const idSet = useMemo(() => new Set(ids), [ids]);

  useEffect(() => {
    if (!ids.length) return;

    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    // Чем больше "видно" — тем вероятнее, что это активная секция
    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = (e.target as HTMLElement).id;
          if (!idSet.has(id)) continue;
          visible.set(id, e.isIntersecting ? e.intersectionRatio : 0);
        }

        // Берём секцию с максимальной видимостью
        let bestId = activeId;
        let best = -1;
        for (const [id, ratio] of visible.entries()) {
          if (ratio > best) {
            best = ratio;
            bestId = id;
          }
        }
        if (bestId && bestId !== activeId) setActiveId(bestId);
      },
      {
        // Важно: учитываем фиксированный верх (header/отступ)
        // Верхняя граница "сдвигается" вниз на topOffsetPx
        root: null,
        rootMargin: `-${topOffsetPx}px 0px -25% 0px`,
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join("|"), topOffsetPx]);

  return { activeId, setActiveId };
}

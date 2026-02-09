import { useEffect, useRef, useState } from "react";

export function useActiveSection(ids: string[], topOffsetPx = 260) {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "");
  const idsRef = useRef(ids);

  useEffect(() => {
    idsRef.current = ids;
    if (ids[0]) setActiveId(ids[0]);
  }, [ids.join("|")]);

  useEffect(() => {
    if (!ids.length) return;

    let ticking = false;
    const updateActive = () => {
      ticking = false;
      const currentIds = idsRef.current;
      if (!currentIds.length) return;

      let nextId = currentIds[0];
      for (const id of currentIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top - topOffsetPx;
        if (top <= 0) {
          nextId = id;
          continue;
        }
        break;
      }

      setActiveId((prev) => (prev === nextId ? prev : nextId));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids.join("|"), topOffsetPx]);

  return { activeId, setActiveId };
}

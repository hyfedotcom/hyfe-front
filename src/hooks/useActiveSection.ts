import { useEffect, useRef, useState } from "react";

export function useActiveSection(ids: string[], topOffsetPx = 260) {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "");
  const idsRef = useRef(ids);
  const idsKey = ids.join("|");
  const elementsByIdRef = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    idsRef.current = ids;
  }, [ids, idsKey]);

  useEffect(() => {
    const nextElements: Record<string, HTMLElement | null> = {};
    for (const id of ids) {
      nextElements[id] = document.getElementById(id);
    }
    elementsByIdRef.current = nextElements;
  }, [ids, idsKey]);

  useEffect(() => {
    if (!idsKey) return;

    let ticking = false;
    const updateActive = () => {
      ticking = false;
      const currentIds = idsRef.current;
      if (!currentIds.length) return;

      let nextId = currentIds[0];
      for (const id of currentIds) {
        let el = elementsByIdRef.current[id];
        if (!el) {
          el = document.getElementById(id);
          if (el) {
            elementsByIdRef.current[id] = el;
          }
        }
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
  }, [idsKey, topOffsetPx]);

  return { activeId, setActiveId };
}

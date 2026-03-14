"use client";

import { useSyncExternalStore } from "react";

type WindowContextProps = {
  width: number;
  height: number;
  isReady: boolean;
};

const SERVER_SNAPSHOT: WindowContextProps = {
  width: 1200,
  height: 800,
  isReady: false,
};

let snapshot = SERVER_SNAPSHOT;
const subscribers = new Set<() => void>();
let unsubscribeResize: (() => void) | null = null;

function emitChange() {
  subscribers.forEach((listener) => listener());
}

function readWindowMetrics(): WindowContextProps {
  if (typeof window === "undefined") return SERVER_SNAPSHOT;

  return {
    width: window.innerWidth || SERVER_SNAPSHOT.width,
    height: window.innerHeight || SERVER_SNAPSHOT.height,
    isReady: true,
  };
}

function syncSnapshot() {
  const nextSnapshot = readWindowMetrics();

  if (
    snapshot.width === nextSnapshot.width &&
    snapshot.height === nextSnapshot.height &&
    snapshot.isReady === nextSnapshot.isReady
  ) {
    return;
  }

  snapshot = nextSnapshot;
  emitChange();
}

function ensureResizeSubscription() {
  if (typeof window === "undefined" || unsubscribeResize) return;

  let frameId: number | null = null;
  const onResize = () => {
    if (frameId !== null) return;

    frameId = window.requestAnimationFrame(() => {
      frameId = null;
      syncSnapshot();
    });
  };

  syncSnapshot();
  window.addEventListener("resize", onResize, { passive: true });

  unsubscribeResize = () => {
    if (frameId !== null) {
      window.cancelAnimationFrame(frameId);
    }

    window.removeEventListener("resize", onResize);
    unsubscribeResize = null;
    snapshot = SERVER_SNAPSHOT;
  };
}

function subscribe(listener: () => void) {
  subscribers.add(listener);
  ensureResizeSubscription();

  return () => {
    subscribers.delete(listener);

    if (!subscribers.size && unsubscribeResize) {
      unsubscribeResize();
    }
  };
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return SERVER_SNAPSHOT;
}

export function useWindowMetrics() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

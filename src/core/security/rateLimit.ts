type RateLimitBucket = {
  count: number;
  resetAt: number;
};

type ConsumeRateLimitInput = {
  key: string;
  windowMs: number;
  max: number;
};

type ConsumeRateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

const globalForRateLimit = globalThis as typeof globalThis & {
  __hyfeRateLimitStore?: Map<string, RateLimitBucket>;
};

const rateLimitStore =
  globalForRateLimit.__hyfeRateLimitStore ?? new Map<string, RateLimitBucket>();

if (!globalForRateLimit.__hyfeRateLimitStore) {
  globalForRateLimit.__hyfeRateLimitStore = rateLimitStore;
}

function cleanupExpiredBuckets(now: number) {
  if (rateLimitStore.size < 1000) return;

  for (const [key, bucket] of rateLimitStore.entries()) {
    if (bucket.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }
}

export function consumeRateLimit({
  key,
  windowMs,
  max,
}: ConsumeRateLimitInput): ConsumeRateLimitResult {
  const now = Date.now();
  cleanupExpiredBuckets(now);

  const bucket = rateLimitStore.get(key);

  if (!bucket || bucket.resetAt <= now) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });

    return {
      allowed: true,
      remaining: Math.max(0, max - 1),
      retryAfterSeconds: 0,
    };
  }

  if (bucket.count >= max) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  rateLimitStore.set(key, bucket);

  return {
    allowed: true,
    remaining: Math.max(0, max - bucket.count),
    retryAfterSeconds: 0,
  };
}

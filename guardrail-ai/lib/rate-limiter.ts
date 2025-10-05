import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// A single user (identified by their API key) can make 10 requests per 10 seconds.
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
  prefix: "@guardrail/ratelimit",
});
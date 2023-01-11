import { createUpstashRedisCache } from "@jonbilous/utils/cache";
import brand from "brand";

const upstashCache = createUpstashRedisCache(
  {
    url: process.env.UPSTASH_URL!,
    token: process.env.UPSTASH_TOKEN!,
  },
  10000,
  brand.name
);

export const defaultCacheHeaders = {
  "Cache-Control": "",
};

export default upstashCache;

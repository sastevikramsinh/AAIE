import { Subscriber } from "../models/Subscriber.js";
import { Workshop } from "../models/Workshop.js";
import { AppStat } from "../models/AppStat.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getCache, setCache } from "../utils/cache.js";

const STATS_CACHE_KEY = "public-stats";
const ONE_HOUR = 60 * 60 * 1000;

export const getPublicStats = asyncHandler(async (_req, res) => {
  const cached = getCache(STATS_CACHE_KEY);
  if (cached) return res.status(200).json({ source: "cache", data: cached });

  const [totalSubscribers, workshopsConducted, newsletterCounter] = await Promise.all([
    Subscriber.countDocuments({ unsubscribed: false }),
    Workshop.countDocuments({ status: "completed" }),
    AppStat.findOne({ key: "newsletterSentCount" }).lean(),
  ]);

  const data = {
    totalSubscribers,
    newsletterSentCount: newsletterCounter?.value || 0,
    workshopsConducted,
  };

  setCache(STATS_CACHE_KEY, data, ONE_HOUR);
  return res.status(200).json({ source: "db", data });
});


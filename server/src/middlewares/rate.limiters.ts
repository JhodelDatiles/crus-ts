import { type Request, type Response, type NextFunction } from "express";
import { rateLimiter } from "../config/upstash.ts";

export const rateLimitMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Identify the user by their IP address (fallback to a generic string if missing)
    const ip =
      req.ip || req.headers["x-forwarded-for"]?.toString() || "127.0.0.1";

    // Check rate limit status for this IP
    const { success, limit, reset, remaining } = await rateLimiter.limit(ip);

    // Set standard rate limit headers on the response
    res.setHeader("X-RateLimit-Limit", limit);
    res.setHeader("X-RateLimit-Remaining", remaining);
    res.setHeader("X-RateLimit-Reset", reset);

    if (!success) {
      res.status(429).json({
        success: false,
        message: "Too many requests. Please slow down.",
      });
      return; // Stop the request cycle here
    }

    // Everything is fine, move to the next controller/middleware
    next();
  } catch (error: any) {
    // Fail-safe: If Redis goes down, you might still want to let traffic through
    console.error("Rate limiter error, failing open:", error.message);
    // res.status(500).json({ success: false, message: error.message });
    next();
  }
};

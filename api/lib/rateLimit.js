// Rate limiting for API routes
// Prevents abuse and DoS attacks

// In-memory store for rate limiting (resets on function cold start)
// For production, consider using Redis or Vercel KV
const rateLimitStore = new Map();

/**
 * Simple rate limiter middleware
 * @param {Object} options - Configuration
 * @param {number} options.windowMs - Time window in milliseconds
 * @param {number} options.maxRequests - Maximum requests per window
 * @returns {Function} - Middleware function
 */
export const rateLimit = (options = {}) => {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutes default
    maxRequests = 10, // 10 requests per window default
    message = 'Too many requests, please try again later.'
  } = options;

  return (req, res) => {
    // Get client identifier (IP address)
    const identifier = getClientIdentifier(req);

    // Get current time
    const now = Date.now();

    // Get or create rate limit entry
    let rateLimitEntry = rateLimitStore.get(identifier);

    if (!rateLimitEntry) {
      // First request from this client
      rateLimitEntry = {
        count: 1,
        resetTime: now + windowMs
      };
      rateLimitStore.set(identifier, rateLimitEntry);
      return { allowed: true, remaining: maxRequests - 1 };
    }

    // Check if window has expired
    if (now > rateLimitEntry.resetTime) {
      // Reset the window
      rateLimitEntry = {
        count: 1,
        resetTime: now + windowMs
      };
      rateLimitStore.set(identifier, rateLimitEntry);
      return { allowed: true, remaining: maxRequests - 1 };
    }

    // Increment request count
    rateLimitEntry.count++;

    // Check if limit exceeded
    if (rateLimitEntry.count > maxRequests) {
      const retryAfter = Math.ceil((rateLimitEntry.resetTime - now) / 1000);

      // Set rate limit headers
      res.setHeader('X-RateLimit-Limit', maxRequests.toString());
      res.setHeader('X-RateLimit-Remaining', '0');
      res.setHeader('X-RateLimit-Reset', rateLimitEntry.resetTime.toString());
      res.setHeader('Retry-After', retryAfter.toString());

      return {
        allowed: false,
        error: message,
        retryAfter
      };
    }

    // Request allowed
    const remaining = maxRequests - rateLimitEntry.count;

    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', maxRequests.toString());
    res.setHeader('X-RateLimit-Remaining', remaining.toString());
    res.setHeader('X-RateLimit-Reset', rateLimitEntry.resetTime.toString());

    return {
      allowed: true,
      remaining
    };
  };
};

/**
 * Get client identifier from request
 * Uses IP address and User-Agent to identify unique clients
 * @param {Object} req - Request object
 * @returns {string} - Client identifier
 */
const getClientIdentifier = (req) => {
  // Get IP address from various headers (Vercel provides these)
  const ip =
    req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for']?.split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  // Optionally include user agent for more specific identification
  const userAgent = req.headers['user-agent'] || 'unknown';

  return `${ip}:${userAgent}`;
};

/**
 * Clean up expired entries periodically
 * Call this in background or on function startup
 */
export const cleanupExpiredEntries = () => {
  const now = Date.now();
  let cleaned = 0;

  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
      cleaned++;
    }
  }

  if (cleaned > 0) {
    console.log(`🧹 Cleaned up ${cleaned} expired rate limit entries`);
  }
};

/**
 * Specific rate limiters for different endpoints
 */

// Strict rate limit for booking creation (5 per 15 minutes)
export const bookingRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5,
  message: 'Too many booking attempts. Please try again in 15 minutes.'
});

// Moderate rate limit for contact form (10 per 15 minutes)
export const contactRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 10,
  message: 'Too many contact form submissions. Please try again in 15 minutes.'
});

// Lenient rate limit for email sending (3 per 5 minutes)
export const emailRateLimit = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  maxRequests: 3,
  message: 'Too many email requests. Please try again in a few minutes.'
});

// General API rate limit (20 per 15 minutes)
export const generalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 20,
  message: 'Too many requests. Please slow down.'
});

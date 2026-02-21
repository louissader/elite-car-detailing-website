// Security middleware for API routes
// Handles CORS, CSRF protection, and request validation

/* eslint-disable no-undef */
const ALLOWED_ORIGINS = [
  process.env.ALLOWED_ORIGIN || 'https://elitedetailing.com',
  'https://elite-detailing-website.vercel.app',
  'https://elite-car-detailing-website.vercel.app',
  // Allow localhost for development
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
];

const isDevelopment = process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'development';
/* eslint-enable no-undef */

/**
 * Validate request origin for CSRF protection
 * @param {Object} req - Request object
 * @returns {Object} - { valid: boolean, origin: string|null, error: string|null }
 */
export const validateOrigin = (req) => {
  const origin = req.headers['origin'];
  const referer = req.headers['referer'];

  // In development, be more lenient
  if (isDevelopment) {
    return { valid: true, origin: origin || 'development' };
  }

  // Check Origin header first (preferred)
  if (origin) {
    if (ALLOWED_ORIGINS.includes(origin)) {
      return { valid: true, origin };
    }
    return {
      valid: false,
      origin,
      error: 'Request origin not allowed'
    };
  }

  // Fall back to Referer header
  if (referer) {
    try {
      const refererUrl = new URL(referer);
      const refererOrigin = refererUrl.origin;
      if (ALLOWED_ORIGINS.includes(refererOrigin)) {
        return { valid: true, origin: refererOrigin };
      }
    } catch {
      // Invalid referer URL
    }
    return {
      valid: false,
      origin: referer,
      error: 'Request referer not allowed'
    };
  }

  // No origin or referer - reject in production
  return {
    valid: false,
    origin: null,
    error: 'Missing origin header'
  };
};

/**
 * Set secure CORS headers
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {string|null} - The allowed origin or null
 */
export const setCorsHeaders = (req, res) => {
  const origin = req.headers['origin'];

  // Only allow specific origins (not wildcard)
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (isDevelopment) {
    // In development, allow the requesting origin
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  } else {
    // Default to primary domain
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGINS[0]);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Idempotency-Key');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours

  return origin;
};

/**
 * Handle CORS preflight request
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {boolean} - True if this was a preflight request
 */
export const handlePreflight = (req, res) => {
  if (req.method === 'OPTIONS') {
    setCorsHeaders(req, res);
    res.status(200).end();
    return true;
  }
  return false;
};

/**
 * Set security headers for responses
 * @param {Object} res - Response object
 */
export const setSecurityHeaders = (res) => {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');

  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Enable XSS filter
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Referrer policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
};

// In-memory idempotency store (for demo - use Redis/KV in production)
const idempotencyStore = new Map();
const IDEMPOTENCY_TTL = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Check idempotency key to prevent duplicate requests
 * @param {Object} req - Request object
 * @returns {Object} - { isDuplicate: boolean, cachedResponse: Object|null }
 */
export const checkIdempotency = (req) => {
  const idempotencyKey = req.headers['x-idempotency-key'];

  if (!idempotencyKey) {
    return { isDuplicate: false, cachedResponse: null };
  }

  const cached = idempotencyStore.get(idempotencyKey);

  if (cached) {
    // Check if still valid
    if (Date.now() - cached.timestamp < IDEMPOTENCY_TTL) {
      return { isDuplicate: true, cachedResponse: cached.response };
    }
    // Expired, remove it
    idempotencyStore.delete(idempotencyKey);
  }

  return { isDuplicate: false, cachedResponse: null, key: idempotencyKey };
};

/**
 * Store response for idempotency
 * @param {string} key - Idempotency key
 * @param {Object} response - Response to cache
 */
export const storeIdempotencyResponse = (key, response) => {
  if (!key) return;

  idempotencyStore.set(key, {
    response,
    timestamp: Date.now()
  });

  // Cleanup old entries periodically
  if (idempotencyStore.size > 1000) {
    cleanupIdempotencyStore();
  }
};

/**
 * Clean up expired idempotency entries
 */
const cleanupIdempotencyStore = () => {
  const now = Date.now();
  for (const [key, value] of idempotencyStore.entries()) {
    if (now - value.timestamp > IDEMPOTENCY_TTL) {
      idempotencyStore.delete(key);
    }
  }
};

/**
 * Get client IP address safely
 * @param {Object} req - Request object
 * @returns {string} - IP address or 'unknown'
 */
export const getClientIP = (req) => {
  // Vercel provides these headers
  const ip =
    req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for']?.split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  return ip;
};

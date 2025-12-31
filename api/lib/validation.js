// Server-side validation utilities
// Provides comprehensive input validation and sanitization

import validator from 'validator';

/**
 * Sanitize string input to prevent XSS attacks
 * @param {string} input - Raw input string
 * @returns {string} - Sanitized string
 */
export const sanitizeString = (input) => {
  if (typeof input !== 'string') return '';

  // Remove HTML tags and encode special characters
  return validator.escape(input.trim());
};

/**
 * Validate and sanitize email address
 * @param {string} email - Email to validate
 * @returns {Object} - { valid: boolean, sanitized: string, error?: string }
 */
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' };
  }

  const trimmed = email.trim();

  // Check format
  if (!validator.isEmail(trimmed)) {
    return { valid: false, error: 'Invalid email format' };
  }

  // Check length
  if (trimmed.length > 254) {
    return { valid: false, error: 'Email is too long' };
  }

  // Normalize and sanitize
  const normalized = validator.normalizeEmail(trimmed, {
    all_lowercase: true,
    gmail_remove_dots: false
  });

  return {
    valid: true,
    sanitized: normalized
  };
};

/**
 * Validate and sanitize phone number
 * @param {string} phone - Phone number to validate
 * @returns {Object} - { valid: boolean, sanitized: string, error?: string }
 */
export const validatePhone = (phone) => {
  if (!phone || typeof phone !== 'string') {
    return { valid: false, error: 'Phone number is required' };
  }

  const trimmed = phone.trim();

  // Check length (US numbers typically 10-14 chars with formatting)
  if (trimmed.length < 10 || trimmed.length > 20) {
    return { valid: false, error: 'Phone number length invalid' };
  }

  // Allow only digits, spaces, dashes, parentheses, and plus sign
  const phoneRegex = /^[+\d\s\-()]+$/;
  if (!phoneRegex.test(trimmed)) {
    return { valid: false, error: 'Phone number contains invalid characters' };
  }

  // Count digits only
  const digitsOnly = trimmed.replace(/\D/g, '');
  if (digitsOnly.length < 10 || digitsOnly.length > 15) {
    return { valid: false, error: 'Phone number must have 10-15 digits' };
  }

  return {
    valid: true,
    sanitized: trimmed
  };
};

/**
 * Validate and sanitize name
 * @param {string} name - Name to validate
 * @returns {Object} - { valid: boolean, sanitized: string, error?: string }
 */
export const validateName = (name) => {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'Name is required' };
  }

  const trimmed = name.trim();

  // Check length
  if (trimmed.length < 2) {
    return { valid: false, error: 'Name is too short' };
  }

  if (trimmed.length > 100) {
    return { valid: false, error: 'Name is too long' };
  }

  // Allow letters, spaces, hyphens, apostrophes
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  if (!nameRegex.test(trimmed)) {
    return { valid: false, error: 'Name contains invalid characters' };
  }

  // Sanitize to prevent XSS
  const sanitized = sanitizeString(trimmed);

  return {
    valid: true,
    sanitized
  };
};

/**
 * Validate and sanitize text message
 * @param {string} message - Message to validate
 * @param {Object} options - { minLength, maxLength }
 * @returns {Object} - { valid: boolean, sanitized: string, error?: string }
 */
export const validateMessage = (message, options = {}) => {
  const { minLength = 10, maxLength = 5000 } = options;

  if (!message || typeof message !== 'string') {
    return { valid: false, error: 'Message is required' };
  }

  const trimmed = message.trim();

  // Check length
  if (trimmed.length < minLength) {
    return { valid: false, error: `Message must be at least ${minLength} characters` };
  }

  if (trimmed.length > maxLength) {
    return { valid: false, error: `Message must be less than ${maxLength} characters` };
  }

  // Sanitize to prevent XSS
  const sanitized = sanitizeString(trimmed);

  return {
    valid: true,
    sanitized
  };
};

/**
 * Validate price
 * @param {number} price - Price to validate
 * @returns {Object} - { valid: boolean, sanitized: number, error?: string }
 */
export const validatePrice = (price) => {
  if (price === undefined || price === null) {
    return { valid: false, error: 'Price is required' };
  }

  const numPrice = Number(price);

  if (isNaN(numPrice)) {
    return { valid: false, error: 'Price must be a number' };
  }

  if (numPrice < 0) {
    return { valid: false, error: 'Price cannot be negative' };
  }

  if (numPrice > 100000) {
    return { valid: false, error: 'Price exceeds maximum allowed' };
  }

  // Round to 2 decimal places
  const sanitized = Math.round(numPrice * 100) / 100;

  return {
    valid: true,
    sanitized
  };
};

/**
 * Validate date string
 * @param {string} dateString - Date to validate (YYYY-MM-DD)
 * @returns {Object} - { valid: boolean, sanitized: string, error?: string }
 */
export const validateDate = (dateString) => {
  if (!dateString || typeof dateString !== 'string') {
    return { valid: false, error: 'Date is required' };
  }

  // Check ISO date format
  if (!validator.isISO8601(dateString, { strict: true })) {
    return { valid: false, error: 'Invalid date format (use YYYY-MM-DD)' };
  }

  const date = new Date(dateString);
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  // Check if date is in the past
  if (date < now) {
    return { valid: false, error: 'Date cannot be in the past' };
  }

  // Check if date is too far in the future (1 year)
  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

  if (date > oneYearFromNow) {
    return { valid: false, error: 'Date cannot be more than 1 year in the future' };
  }

  return {
    valid: true,
    sanitized: dateString.split('T')[0] // Return just YYYY-MM-DD
  };
};

/**
 * Validate time string
 * @param {string} time - Time to validate (HH:MM AM/PM)
 * @returns {Object} - { valid: boolean, sanitized: string, error?: string }
 */
export const validateTime = (time) => {
  if (!time || typeof time !== 'string') {
    return { valid: false, error: 'Time is required' };
  }

  const trimmed = time.trim();

  // Check format: HH:MM AM/PM
  const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;
  if (!timeRegex.test(trimmed)) {
    return { valid: false, error: 'Invalid time format (use HH:MM AM/PM)' };
  }

  return {
    valid: true,
    sanitized: trimmed.toUpperCase()
  };
};

/**
 * Validate service category
 * @param {string} category - Service category
 * @returns {Object} - { valid: boolean, sanitized: string, error?: string }
 */
export const validateServiceCategory = (category) => {
  const allowedCategories = ['auto', 'jet'];

  if (!category || typeof category !== 'string') {
    return { valid: false, error: 'Service category is required' };
  }

  const lower = category.toLowerCase().trim();

  if (!allowedCategories.includes(lower)) {
    return { valid: false, error: 'Invalid service category' };
  }

  return {
    valid: true,
    sanitized: lower
  };
};

/**
 * Validate vehicle size
 * @param {string} size - Vehicle size
 * @returns {Object} - { valid: boolean, sanitized: string, error?: string }
 */
export const validateVehicleSize = (size) => {
  const allowedSizes = [
    'sedan', 'suv', 'truck', 'van', 'exotic',
    'small-jet', 'medium-jet', 'large-jet', 'ultra-long-range'
  ];

  if (!size || typeof size !== 'string') {
    return { valid: false, error: 'Vehicle size is required' };
  }

  const lower = size.toLowerCase().trim();

  if (!allowedSizes.includes(lower)) {
    return { valid: false, error: 'Invalid vehicle size' };
  }

  return {
    valid: true,
    sanitized: lower
  };
};

/**
 * Sanitize optional text field
 * @param {string} text - Text to sanitize
 * @param {number} maxLength - Maximum length
 * @returns {string|null} - Sanitized text or null
 */
export const sanitizeOptionalText = (text, maxLength = 1000) => {
  if (!text || typeof text !== 'string') {
    return null;
  }

  const trimmed = text.trim();
  if (trimmed.length === 0) {
    return null;
  }

  if (trimmed.length > maxLength) {
    return sanitizeString(trimmed.substring(0, maxLength));
  }

  return sanitizeString(trimmed);
};

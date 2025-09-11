/**
 * Utility functions for ALX Polly app.
 * Add reusable helpers here and write unit tests for critical logic.
 */

/**
 * Returns true if the given string is a valid email address.
 */
export function isValidEmail(email: string): boolean {
  // Simple regex for email validation
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

/**
 * Returns true if all options in the array are unique and non-empty.
 */
export function areUniqueOptions(options: string[]): boolean {
  const filtered = options.map(opt => opt.trim()).filter(Boolean);
  return new Set(filtered).size === filtered.length && filtered.length >= 2;
}

// Utility functions for the app
export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

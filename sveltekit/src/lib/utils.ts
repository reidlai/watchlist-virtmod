import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import pino from "pino";

/**
 * Merge class names with Tailwind CSS conflict resolution
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Type utility to extract element reference props from a component
 */
export type WithElementRef<T> = T & {
  ref?: T extends { ref?: infer R } ? R : HTMLElement | null;
};

/**
 * Shared logger instance for the watchlist module
 *
 * Configuration:
 * - JSON logging for structured logs
 * - Log level: Configurable via LOG_LEVEL env var (default: 'info')
 */
const isBrowser = typeof process === "undefined";
const logLevel =
  !isBrowser && process.env.LOG_LEVEL ? process.env.LOG_LEVEL : "info";

export const logger = pino({
  name: "watchlist",
  level: logLevel,
  browser: {
    asObject: true,
  },
});

/**
 * Analytics tracking mock
 */
export function trackEvent(eventName, properties = {}) {
  if (typeof window !== 'undefined') {
    console.log(`[Analytics Event] ${eventName}:`, properties);
  }
}

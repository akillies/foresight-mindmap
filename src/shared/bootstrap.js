/**
 * Shared bootstrap — Sentry + web-vitals init.
 * Called by both classic/main.jsx and planetary/main.jsx.
 */
import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals';
import * as Sentry from '@sentry/react';

export function initBootstrap() {
  // Initialize Sentry for error tracking (only if DSN is configured)
  const sentryDsn = import.meta.env.VITE_SENTRY_DSN;
  if (sentryDsn) {
    Sentry.init({
      dsn: sentryDsn,
      environment: import.meta.env.MODE,
      tracesSampleRate: 0.1,
      replaysSessionSampleRate: 0.01,
      replaysOnErrorSampleRate: 1.0,
      beforeSend(event) {
        if (import.meta.env.DEV) {
          console.log('[Sentry] Would send:', event);
          return null;
        }
        return event;
      },
    });
  }

  // Web Vitals performance monitoring
  const sendToAnalytics = ({ name, delta, id }) => {
    if (import.meta.env.DEV) {
      console.log(`[Web Vitals] ${name}:`, delta.toFixed(2), `(id: ${id})`);
    }

    if (typeof window.plausible !== 'undefined') {
      window.plausible('Web Vitals', {
        props: {
          metric: name,
          value: Math.round(name === 'CLS' ? delta * 1000 : delta),
        }
      });
    }
  };

  onCLS(sendToAnalytics);
  onINP(sendToAnalytics);
  onLCP(sendToAnalytics);
  onFCP(sendToAnalytics);
  onTTFB(sendToAnalytics);

  return { sentryDsn, Sentry };
}

import { createRoot } from 'react-dom/client'
import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals'
import * as Sentry from '@sentry/react'
import './index.css'
import App from './App.jsx'

// Initialize Sentry for error tracking (only if DSN is configured)
const sentryDsn = import.meta.env.VITE_SENTRY_DSN;
if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    environment: import.meta.env.MODE,
    // Performance monitoring sample rate (10% of transactions)
    tracesSampleRate: 0.1,
    // Session replay for debugging (1% of sessions, 100% on error)
    replaysSessionSampleRate: 0.01,
    replaysOnErrorSampleRate: 1.0,
    // Filter out non-error console messages
    beforeSend(event) {
      // Don't send events in development
      if (import.meta.env.DEV) {
        console.log('[Sentry] Would send:', event);
        return null;
      }
      return event;
    },
  });
}

// Web Vitals performance monitoring
// Sends metrics to Plausible via custom events (if available)
const sendToAnalytics = ({ name, delta, id }) => {
  // Log to console in development
  if (import.meta.env.DEV) {
    console.log(`[Web Vitals] ${name}:`, delta.toFixed(2), `(id: ${id})`);
  }

  // Send to Plausible if available
  if (typeof window.plausible !== 'undefined') {
    window.plausible('Web Vitals', {
      props: {
        metric: name,
        value: Math.round(name === 'CLS' ? delta * 1000 : delta), // CLS is unitless, multiply for visibility
      }
    });
  }
};

// Register Core Web Vitals
onCLS(sendToAnalytics);   // Cumulative Layout Shift
onINP(sendToAnalytics);   // Interaction to Next Paint (replaced FID in v4)
onLCP(sendToAnalytics);   // Largest Contentful Paint
onFCP(sendToAnalytics);   // First Contentful Paint
onTTFB(sendToAnalytics);  // Time to First Byte

// Wrap App with Sentry error boundary if Sentry is initialized
const AppWithErrorBoundary = sentryDsn
  ? Sentry.withProfiler(App)
  : App;

createRoot(document.getElementById('root')).render(
  // StrictMode disabled - causes double mounting with Three.js
  // <StrictMode>
    <AppWithErrorBoundary />
  // </StrictMode>,
)

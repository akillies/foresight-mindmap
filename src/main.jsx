import { createRoot } from 'react-dom/client'
import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals'
import './index.css'
import App from './App.jsx'

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

createRoot(document.getElementById('root')).render(
  // StrictMode disabled - causes double mounting with Three.js
  // <StrictMode>
    <App />
  // </StrictMode>,
)

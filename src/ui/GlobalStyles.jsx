/**
 * GlobalStyles Component
 * CSS animations and global styles for the application
 */
import React from 'react';
import { COLORS } from '../constants';

/**
 * Global Styles Component - renders CSS in a style tag
 */
export function GlobalStyles() {
  return (
    <style>{`
      @keyframes slideIn {
        from {
          right: -450px;
          opacity: 0;
        }
        to {
          right: 0;
          opacity: 1;
        }
      }

      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.4;
        }
      }

      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

      * {
        box-sizing: border-box;
      }

      ::-webkit-scrollbar {
        width: 8px;
      }

      ::-webkit-scrollbar-track {
        background: rgba(26, 26, 46, 0.5);
      }

      ::-webkit-scrollbar-thumb {
        background: ${COLORS.primary};
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: ${COLORS.secondary};
      }
    `}</style>
  );
}

export default GlobalStyles;

/**
 * ErrorBoundary — catches React render crashes.
 * Used by both classic and planetary entry points.
 */
import React, { Component } from 'react';
import { COLORS } from '@shared/constants';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React Error Boundary caught error:', {
      error: error.toString(),
      errorInfo: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: COLORS.background,
            color: COLORS.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            fontFamily: 'monospace',
            padding: '40px',
          }}
        >
          <h1 style={{ color: COLORS.pink, marginBottom: '20px' }}>SYSTEM ERROR</h1>
          <p style={{ maxWidth: '600px', lineHeight: '1.6', marginBottom: '20px' }}>
            A critical rendering error occurred. Please refresh the page to continue.
          </p>
          <button
            onClick={() => window.location.reload()}
            aria-label="Reload the application"
            style={{
              background: COLORS.primary,
              color: COLORS.background,
              border: 'none',
              padding: '12px 24px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              fontFamily: 'monospace',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = `0 0 20px ${COLORS.primary}60`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            RELOAD APPLICATION
          </button>
          <details style={{ marginTop: '40px', maxWidth: '800px' }}>
            <summary style={{ cursor: 'pointer', color: COLORS.secondary }}>Technical Details</summary>
            <pre style={{
              background: COLORS.panel,
              padding: '20px',
              borderRadius: '10px',
              overflow: 'auto',
              marginTop: '10px',
              fontSize: '12px',
            }}>
              {this.state.error && this.state.error.toString()}
              {'\n\n'}
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

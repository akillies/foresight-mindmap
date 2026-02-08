/**
 * Classic entry point — Strategic Foresight 3D Mind Map
 */
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';
import { initBootstrap } from '@shared/bootstrap';
import '../index.css';
import ClassicApp from './ClassicApp';

const { sentryDsn } = initBootstrap();

const AppWithProfiler = sentryDsn
  ? Sentry.withProfiler(ClassicApp)
  : ClassicApp;

createRoot(document.getElementById('root')).render(
  <AppWithProfiler />
);

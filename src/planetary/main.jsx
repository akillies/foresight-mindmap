/**
 * Planetary entry point — Foresight Planetary Explorer
 */
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';
import { initBootstrap } from '@shared/bootstrap';
import '../index.css';
import PlanetaryApp from './PlanetaryApp';

const { sentryDsn } = initBootstrap();

const AppWithProfiler = sentryDsn
  ? Sentry.withProfiler(PlanetaryApp)
  : PlanetaryApp;

createRoot(document.getElementById('root')).render(
  <AppWithProfiler />
);

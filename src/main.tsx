import { StrictMode } from 'react';

import { ThemeProvider } from 'next-themes';
import { createRoot } from 'react-dom/client';

import { QueryProvider } from '@/app/providers/QueryProvider.tsx';
import { App } from '@/App.tsx';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryProvider>
        <App />
      </QueryProvider>
    </ThemeProvider>
  </StrictMode>,
);

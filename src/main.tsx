import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { DataProvider } from '@/context/DataContext';
import { getStore } from '@/lib/storage/db';
import App from './App';
import TempleWisdomChat from '@/components/ai/TempleWisdomChat';
import './index.css';

getStore();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter
      basename={import.meta.env.BASE_URL.replace(/\/$/, '') || undefined}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <DataProvider>
        <AuthProvider>
          <App />
          <TempleWisdomChat />
        </AuthProvider>
      </DataProvider>
    </BrowserRouter>
  </StrictMode>
);

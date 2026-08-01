import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './context/AppContext';
import { Home } from './pages/Home';

export default function App() {
  return (
    <HelmetProvider>
      <AppProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#0B0F19',
              color: '#F8FAFC',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '12px',
              fontSize: '13px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
            }
          }}
        />
        <Home />
      </AppProvider>
    </HelmetProvider>
  );
}

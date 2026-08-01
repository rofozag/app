import React, { createContext, useContext, useState, useEffect } from 'react';
import { SITE_CONFIG } from '../constants';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [waitlistCount, setWaitlistCount] = useState(SITE_CONFIG.currentWaitlistCount);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [activeTermsTab, setActiveTermsTab] = useState('terms');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Live counter animation increment simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setWaitlistCount(prev => prev + (Math.random() > 0.4 ? 1 : 0));
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const openLegalModal = (tab = 'terms') => {
    setActiveTermsTab(tab);
    setIsTermsOpen(true);
  };

  const closeLegalModal = () => {
    setIsTermsOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        waitlistCount,
        isTermsOpen,
        activeTermsTab,
        openLegalModal,
        closeLegalModal,
        mobileMenuOpen,
        setMobileMenuOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

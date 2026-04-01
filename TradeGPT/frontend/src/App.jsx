import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { BottomNav } from './components/BottomNav';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { StocksPage } from './pages/StocksPage';
import { NewsPage } from './pages/NewsPage';
import { CryptoPage } from './pages/CryptoPage';
import { MetalsPage } from './pages/MetalsPage';

import './styles/index.css';

function AppLayout() {
  const location = useLocation();
  const showBottomNav = ['/dashboard', '/stocks', '/news', '/crypto', '/metals'].includes(location.pathname);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/stocks"
          element={
            <ProtectedRoute>
              <StocksPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/news"
          element={
            <ProtectedRoute>
              <NewsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/crypto"
          element={
            <ProtectedRoute>
              <CryptoPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/metals"
          element={
            <ProtectedRoute>
              <MetalsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {showBottomNav ? <BottomNav /> : null}
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <AppLayout />
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

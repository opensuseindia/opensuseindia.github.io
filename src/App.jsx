import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/common/CustomCursor';
import TerminalPalette from './components/common/TerminalPalette';
import Preloader from './components/common/Preloader';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Pages
import Home from './pages/Home';
import Events from './pages/Events';
import Tracks from './pages/Tracks';
import Schedule from './pages/Schedule';
import Speakers from './pages/Speakers';
import Arcade from './pages/Arcade';
import Quest from './pages/Quest';
import BugHunt from './pages/BugHunt';
import DemoArena from './pages/DemoArena';
import Prizes from './pages/Prizes';
import Sponsors from './pages/Sponsors';
import Merchandise from './pages/Merchandise';
import About from './pages/About';
import Venue from './pages/Venue';
import FAQ from './pages/FAQ';
import Register from './pages/Register';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function ProtectedParticipantRoute({ children }) {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div className="min-h-screen bg-cyber-black text-white p-20 font-mono text-center">Loading Session...</div>;
  return user ? children : <Navigate to="/login" replace />;
}

function ProtectedAdminRoute({ children }) {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div className="min-h-screen bg-cyber-black text-white p-20 font-mono text-center">Loading Admin Session...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin' && user.role !== 'judge') {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

function AppContent() {
  const [isCrtActive, setIsCrtActive] = useState(() => {
    return localStorage.getItem('geeko_crt_active') === 'true';
  });

  const toggleCrt = () => {
    setIsCrtActive((prev) => {
      const next = !prev;
      localStorage.setItem('geeko_crt_active', String(next));
      return next;
    });
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#040807] text-slate-100 ${isCrtActive ? 'crt-overlay' : ''}`}>
      <Preloader />
      <ScrollToTop />
      <CustomCursor />
      <Navbar toggleCrt={toggleCrt} isCrtActive={isCrtActive} />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/tracks" element={<Tracks />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/speakers" element={<Speakers />} />
          <Route path="/arcade" element={<Arcade />} />
          <Route path="/quest" element={<Quest />} />
          <Route path="/bug-hunt" element={<BugHunt />} />
          <Route path="/demo-arena" element={<DemoArena />} />
          <Route path="/prizes" element={<Prizes />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/merch" element={<Merchandise />} />
          <Route path="/about" element={<About />} />
          <Route path="/venue" element={<Venue />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedParticipantRoute>
                <Dashboard />
              </ProtectedParticipantRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <Admin />
              </ProtectedAdminRoute>
            }
          />
          
          {/* Fallback 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <TerminalPalette />
    </div>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('App ErrorBoundary caught:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#040807] text-white flex flex-col items-center justify-center p-6 text-center font-mono">
          <div className="text-geeko-400 font-pixel text-sm mb-3">SYSTEM RESCUE TERMINAL</div>
          <p className="text-slate-300 text-xs max-w-md mb-4">
            An interface component experienced a glitch: {this.state.error?.message}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.href = '/';
            }}
            className="px-4 py-2 bg-geeko-500 text-black font-pixel text-[10px] rounded"
          >
            REBOOT SYSTEM
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

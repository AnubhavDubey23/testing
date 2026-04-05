import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/* ── Codexveer SVG Logo ─────────────────────────────────── */
function CodexveerLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#1a1a2e"/>
      <path d="M16 12 L10 20 L16 28" stroke="#f5c518" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M20 18 L24 26 L32 12" stroke="#f5c518" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

/* ── Dark Mode Toggle ────────────────────────────────────── */
function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  const toggle = () => {
    const newVal = !isDark;
    setIsDark(newVal);
    if (newVal) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggle}
      className="relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-300 focus:outline-none"
      style={{ background: isDark ? '#2f8e92' : '#cbd5e0' }}
      aria-label="Toggle dark mode"
    >
      <span
        className="inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-300"
        style={{ transform: isDark ? 'translateX(22px)' : 'translateX(2px)' }}
      />
    </button>
  );
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const mainNav = document.getElementById('main-nav');
      if (mainNav) {
        if (window.scrollY > 100) mainNav.classList.add('nav-scrolled');
        else mainNav.classList.remove('nav-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinkClass = (path) => {
    const base = "text-sm font-medium transition-colors";
    const active = location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
    return active
      ? `${base} text-teal dark:text-teal-light`
      : `${base} text-navy/70 dark:text-white/70 hover:text-navy dark:hover:text-white`;
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Service' },
    { to: '/templates', label: 'Templates' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header
      id="main-nav"
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 bg-transparent py-5"
    >
      <nav className="w-full px-6 lg:px-10">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <CodexveerLogo />
            <span className="font-display font-semibold text-lg text-navy dark:text-white hidden sm:inline">
              Codexveer
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className={navLinkClass(link.to)}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <DarkModeToggle />

            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-navy/70 dark:text-white/70 hover:text-navy dark:hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 rounded-full px-3 py-1.5 border border-navy/10 dark:border-white/10">
                  <div className="w-7 h-7 rounded-full bg-teal flex items-center justify-center text-white text-xs font-bold">
                    {user.avatar}
                  </div>
                  <span className="text-xs font-medium text-navy dark:text-white">{user.name.split(' ')[0]}</span>
                </div>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-navy/50 dark:text-white/50 hover:text-red-500 transition-colors"
                >
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:inline-block bg-teal text-white font-medium px-5 py-2.5 rounded-xl text-sm btn-primary-style no-underline"
              >
                Login
              </Link>
            )}
            <button
              type="button"
              id="mobile-menu-button"
              className="md:hidden p-2 text-navy dark:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="bg-white/95 dark:bg-dark-800/95 backdrop-blur-xl border-t border-navy/5 dark:border-white/5 py-4 px-6 shadow-glass">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className={`${navLinkClass(link.to)} link-underline`}>
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/dashboard" className={`${navLinkClass('/dashboard')} link-underline`}>Dashboard</Link>
                <button onClick={logout} className="text-sm font-medium text-red-500 text-left">Logout</button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-teal text-white font-medium px-5 py-3 rounded-xl text-sm text-center btn-primary-style mt-2 no-underline"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

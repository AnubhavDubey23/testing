import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const result = login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cloud dark:bg-dark-900 py-20 px-4">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-teal/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <span className="font-display font-semibold text-xl text-navy dark:text-white">Codexveer</span>
          </Link>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-navy dark:text-white mt-4">
            Welcome back
          </h1>
          <p className="text-navy/60 dark:text-white/60 text-sm mt-2">
            Log in to your account
          </p>
        </div>

        <div className="glass-card p-8 sm:p-10">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Demo accounts info */}
          <div className="mb-6 p-3 rounded-xl bg-teal/5 border border-teal/10 text-xs text-navy/60 dark:text-white/60">
            <p className="font-semibold mb-1 text-teal">Demo Accounts:</p>
            <p>admin@codexveer.com / admin123</p>
            <p>manager@codexveer.com / manager123</p>
            <p>intern@codexveer.com / intern123</p>
            <p>user@codexveer.com / user123</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-navy/80 dark:text-white/80 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-navy/40 dark:text-white/40">
                  <i className="fas fa-envelope text-sm"></i>
                </span>
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-navy/10 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 text-navy dark:text-white text-sm placeholder:text-navy/30 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-navy/80 dark:text-white/80 mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-navy/40 dark:text-white/40">
                  <i className="fas fa-lock text-sm"></i>
                </span>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-navy/10 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 text-navy dark:text-white text-sm placeholder:text-navy/30 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/40 dark:text-white/40 hover:text-navy dark:hover:text-white transition-colors"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-navy dark:bg-teal text-white font-semibold px-6 py-3.5 rounded-xl btn-primary-style flex items-center justify-center gap-2 text-sm transition-all duration-300 hover:shadow-glow"
            >
              Sign In
              <i className="fas fa-arrow-right text-sm"></i>
            </button>
          </form>

          <p className="text-center text-sm text-navy/50 dark:text-white/50 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-teal hover:text-teal-dark transition-colors">
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

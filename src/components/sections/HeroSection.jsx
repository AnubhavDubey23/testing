import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="hero-premium relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background: concentric waves + soft glow (same as original_page.html) */}
      <div className="hero-waves-wrap absolute inset-0 z-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
        <svg className="hero-waves-svg w-full h-full min-w-[200%] min-h-[200%]" viewBox="0 0 800 800" fill="none">
          <circle className="hero-wave-ring" cx="400" cy="400" r="80" />
          <circle className="hero-wave-ring" cx="400" cy="400" r="140" />
          <circle className="hero-wave-ring" cx="400" cy="400" r="200" />
          <circle className="hero-wave-ring" cx="400" cy="400" r="260" />
          <circle className="hero-wave-ring" cx="400" cy="400" r="320" />
          <circle className="hero-wave-ring" cx="400" cy="400" r="380" />
          <circle className="hero-wave-ring" cx="400" cy="400" r="440" />
          <circle className="hero-wave-ring" cx="400" cy="400" r="500" />
          <circle className="hero-wave-ring" cx="400" cy="400" r="560" />
        </svg>
      </div>
      <div className="hero-glow hero-glow-center absolute inset-0 z-0" aria-hidden="true"></div>
      <div className="hero-glow hero-glow-edge hero-glow-edge-1 absolute inset-0 z-0" aria-hidden="true"></div>
      <div className="hero-glow hero-glow-edge hero-glow-edge-2 absolute inset-0 z-0" aria-hidden="true"></div>
      <div className="hero-bg-bottom absolute inset-0 z-0 pointer-events-none" aria-hidden="true"></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 lg:pt-28 lg:pb-32">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16 gap-12">
          {/* LEFT: Headline, subtext, CTAs */}
          <div className="relative z-10 max-w-xl lg:max-w-[30rem]">
            {/* Badge */}
            <div
              id="hero-badge"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 shadow-[0_0_0_1px_rgba(15,23,42,0.4)] backdrop-blur-sm mb-6"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <i className="fas fa-star text-[10px]"></i>
              </span>
              YOUR DIGITAL PARTNER
            </div>

            <h1
              id="hero-headline"
              className="font-display text-display-1 font-semibold tracking-tight leading-[1.08] mb-5"
            >
              <span className="block">Empower Your</span>
              <span className="block">Digital</span>
              <span className="block bg-gradient-to-r from-emerald-500 via-teal to-cyan-500 bg-clip-text text-transparent">Journey.</span>
            </h1>

            {/* Tagline with gradient */}
            <div className="flex items-center gap-3 mb-5">
              <span className="hero-tagline-line font-display text-xl sm:text-2xl font-semibold">Think.</span>
              <span className="hero-tagline-line font-display text-xl sm:text-2xl font-semibold">Build.</span>
              <span className="hero-tagline-line font-display text-xl sm:text-2xl font-semibold">Transform.</span>
              <span className="hero-tagline-cursor text-teal text-2xl active">|</span>
            </div>

            <p
              id="hero-sub"
              className="text-base sm:text-lg leading-relaxed mb-8 max-w-lg text-slate-500 dark:text-slate-400"
            >
              We craft stunning websites, powerful mobile apps, and digital solutions that elevate your business. From vision to launch, we build what matters.
            </p>

            <div id="hero-cta" className="flex flex-wrap items-center gap-4">
              <Link
                to="/services"
                className="hero-cta-primary-new inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white no-underline"
              >
                Get Started
                <i className="fas fa-arrow-right text-sm"></i>
              </Link>
              <Link
                to="/contact"
                className="watch-demo-btn inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-sm font-medium transition-all no-underline border-slate-300/40 bg-white/90 text-slate-600 dark:border-white/15 dark:bg-white/5 dark:text-slate-300 hover:bg-white hover:text-navy dark:hover:bg-white/10 dark:hover:text-white"
              >
                <i className="fas fa-phone text-xs text-slate-400"></i>
                Contact Us
              </Link>
            </div>
          </div>

          {/* RIGHT: Interactive Dashboard Card (glassmorphism) */}
          <div className="relative z-10 w-full max-w-md lg:max-w-lg flex-1 mx-auto lg:mx-0">
            <div
              id="hero-dashboard"
              className="hero-dashboard-card rounded-[28px] p-5 sm:p-6 border border-white/8"
            >
              {/* Top bar */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal flex items-center justify-center">
                    <i className="fas fa-chart-line text-white text-xs"></i>
                  </div>
                  <span className="text-sm font-semibold text-slate-200 dark:text-slate-200">Our Solutions</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-soft"></span>
                  <span className="text-xs text-slate-400">Live</span>
                </div>
              </div>

              {/* Metric cards grid */}
              <div id="hero-metrics" className="grid grid-cols-2 gap-3 mb-4 bg-slate-900/70 dark:bg-slate-900/70 rounded-2xl p-3 border border-white/5">
                <div className="hero-metric-card bg-slate-900/80 dark:bg-slate-900/80 rounded-xl p-3 border border-white/6">
                  <div className="text-[10px] text-slate-500 mb-1 uppercase tracking-wide">Projects</div>
                  <div className="text-xl font-bold text-slate-50">150+</div>
                </div>
                <div className="hero-metric-card bg-slate-900/80 dark:bg-slate-900/80 rounded-xl p-3 border border-white/6">
                  <div className="text-[10px] text-slate-500 mb-1 uppercase tracking-wide">Happy Clients</div>
                  <div className="text-xl font-bold text-emerald-400">98%</div>
                </div>
                <div className="hero-metric-card bg-slate-900/80 dark:bg-slate-900/80 rounded-xl p-3 border border-white/6">
                  <div className="text-[10px] text-slate-500 mb-1 uppercase tracking-wide">Technologies</div>
                  <div className="text-xl font-bold text-slate-50">25+</div>
                </div>
                <div className="hero-metric-card bg-slate-900/80 dark:bg-slate-900/80 rounded-xl p-3 border border-white/6">
                  <div className="text-[10px] text-slate-500 mb-1 uppercase tracking-wide">Team Members</div>
                  <div className="text-xl font-bold text-slate-50">12</div>
                </div>
              </div>

              {/* Interactive chart area */}
              <div id="hero-trading-chart-wrap" className="bg-slate-900/80 dark:bg-slate-900/80 rounded-2xl p-3 border border-white/6">
                {/* Range buttons */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-1">
                    {['Web', 'App', 'Design', 'SEO'].map((label, i) => (
                      <button
                        key={label}
                        className={`hero-chart-range-btn px-2.5 py-1 rounded-lg text-[10px] font-medium ${i === 0 ? 'active' : 'text-slate-400 hover:bg-slate-800'}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span className="text-[10px] text-slate-400">Growth</span>
                  </div>
                </div>
                {/* SVG Chart */}
                <svg viewBox="0 0 400 120" className="w-full h-auto">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.02"/>
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,100 Q40,90 80,75 T160,60 T240,45 T320,30 T400,15 L400,120 L0,120 Z"
                    fill="url(#chartGrad)"
                  />
                  <path
                    className="hero-chart-line-draw"
                    d="M0,100 Q40,90 80,75 T160,60 T240,45 T320,30 T400,15"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <circle className="hero-tooltip-dot" cx="400" cy="15" r="4"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative bg-dark-900 dark:bg-dark-900 border-t border-white/5 overflow-hidden">
      {/* Subtle glow background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/4 w-96 h-48 opacity-20" style={{ background: 'radial-gradient(ellipse, rgba(47,142,146,0.3), transparent 70%)', filter: 'blur(40px)' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* About Us */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="8" fill="#1a1a2e"/>
                <path d="M16 12 L10 20 L16 28" stroke="#f5c518" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <path d="M20 18 L24 26 L32 12" stroke="#f5c518" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
              <span className="font-display font-semibold text-lg text-white">Codexveer</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              We are dedicated to providing a comprehensive solution for all your digital needs. From web development to mobile apps, we build what matters.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: 'fab fa-facebook-f', href: '#' },
                { icon: 'fab fa-youtube', href: '#' },
                { icon: 'fab fa-twitter', href: '#' },
                { icon: 'fab fa-instagram', href: 'https://www.instagram.com/' },
                { icon: 'fab fa-linkedin-in', href: '#' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-white/50 hover:bg-teal/20 hover:text-teal hover:border-teal/30 transition-all duration-300 no-underline"
                >
                  <i className={`${s.icon} text-sm`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'Services', to: '/services' },
                { label: 'Templates', to: '/templates' },
                { label: 'Blog', to: '/blog' },
                { label: 'Contact', to: '/contact' },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/50 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-5">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <i className="fas fa-envelope text-teal mt-0.5 text-sm"></i>
                <a href="mailto:codexveer.lltd@gmail.com" className="text-sm text-white/50 hover:text-white transition-colors no-underline">
                  codexveer.lltd@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <i className="fas fa-phone text-teal mt-0.5 text-sm"></i>
                <a href="tel:+919580608314" className="text-sm text-white/50 hover:text-white transition-colors no-underline">
                  +91 9580608314
                </a>
              </li>
              <li className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt text-teal mt-0.5 text-sm"></i>
                <span className="text-sm text-white/50">Based in Noida, U.P. India</span>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-5">Legal</h3>
            <ul className="space-y-3">
              {[
                { label: 'Privacy Policy', to: '/privacy' },
                { label: 'Terms of Service', to: '/terms' },
                { label: 'About Us', to: '/about' },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/50 hover:text-white inline-block transition-all duration-200 no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/30">
            &copy; 2026 Codexveer. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            Crafted with <span className="text-teal">♥</span> in India
          </p>
        </div>
      </div>
    </footer>
  );
}

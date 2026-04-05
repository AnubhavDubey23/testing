import React, { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    workType: '',
    message: '',
    date: '',
    time: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="relative z-10 overflow-hidden">
      {/* Header Banner with overlay */}
      <div className="relative py-16 sm:py-20 overflow-hidden" style={{ background: '#0f172a' }}>
        {/* Animated glow blobs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(47, 142, 146, 0.4), transparent 70%)', filter: 'blur(60px)' }}></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3), transparent 70%)', filter: 'blur(60px)' }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/10 px-4 py-1.5 text-xs font-medium text-emerald-300 mb-5">
            <i className="fas fa-envelope text-[10px]"></i>
            LET'S CONNECT
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
            Ready to start your project? We'd love to hear from you.
          </p>
        </div>
      </div>

      {/* Form Area */}
      <div className="relative py-12 sm:py-16 bg-cloud dark:bg-dark-900">
        <div className="bg-grid-subtle absolute inset-0 pointer-events-none" aria-hidden="true"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Contact Form */}
            <div className="flex-1 glass-card p-8 sm:p-10">
              <h3 className="font-display text-xl font-semibold text-navy dark:text-white mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal flex items-center justify-center">
                  <i className="fas fa-paper-plane text-white text-sm"></i>
                </div>
                Send us a Message
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-medium text-navy/50 dark:text-white/50 uppercase tracking-wide mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800/60 border border-navy/10 dark:border-white/10 text-sm text-navy dark:text-white focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all placeholder:text-navy/30 dark:placeholder:text-white/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-navy/50 dark:text-white/50 uppercase tracking-wide mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800/60 border border-navy/10 dark:border-white/10 text-sm text-navy dark:text-white focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all placeholder:text-navy/30 dark:placeholder:text-white/30"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-medium text-navy/50 dark:text-white/50 uppercase tracking-wide mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800/60 border border-navy/10 dark:border-white/10 text-sm text-navy dark:text-white focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all placeholder:text-navy/30 dark:placeholder:text-white/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-navy/50 dark:text-white/50 uppercase tracking-wide mb-2">Work Type</label>
                    <select
                      name="workType"
                      value={formData.workType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800/60 border border-navy/10 dark:border-white/10 text-sm text-navy dark:text-white focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 cursor-pointer transition-all"
                    >
                      <option value="">Select type</option>
                      <option value="portfolio">Portfolio Website</option>
                      <option value="business">Business Website</option>
                      <option value="mobile">Mobile App</option>
                      <option value="maintenance">Maintenance & Upgrade</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-xs font-medium text-navy/50 dark:text-white/50 uppercase tracking-wide mb-2">Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your project..."
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800/60 border border-navy/10 dark:border-white/10 text-sm text-navy dark:text-white focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all resize-none placeholder:text-navy/30 dark:placeholder:text-white/30"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="hero-cta-primary-new inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-all"
                >
                  {submitted ? (
                    <>
                      <i className="fas fa-check"></i> Sent!
                    </>
                  ) : (
                    <>
                      Submit
                      <i className="fas fa-arrow-right text-xs"></i>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right: Time Slot Picker */}
            <div className="lg:w-80 rounded-[28px] p-8 flex flex-col" style={{ background: '#0f172a', boxShadow: '0 8px 32px rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal flex items-center justify-center">
                  <i className="fas fa-calendar-alt text-white text-sm"></i>
                </div>
                <h3 className="font-display text-lg font-semibold text-white">
                  Pick a Time Slot
                </h3>
              </div>
              <div className="mb-5">
                <label className="block text-xs font-medium text-emerald-400 uppercase tracking-wide mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal/40 transition-all"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#e2e8f0' }}
                />
              </div>
              <div className="mb-6">
                <label className="block text-xs font-medium text-emerald-400 uppercase tracking-wide mb-2">Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal/40 transition-all"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#e2e8f0' }}
                />
              </div>
              <div className="mt-auto pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 text-sm text-slate-400 mb-3">
                  <i className="fas fa-envelope text-teal"></i>
                  codexveer.lltd@gmail.com
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-400 mb-3">
                  <i className="fas fa-phone text-teal"></i>
                  +91 9580608314
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <i className="fas fa-map-marker-alt text-teal"></i>
                  Noida, U.P. India
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

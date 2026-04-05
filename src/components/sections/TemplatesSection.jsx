import React from 'react';

const templates = [
  {
    title: 'Restaurants & Cafes',
    desc: 'Elegant templates designed to highlight your menu, location, and online booking features.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
    accent: 'from-amber-400 to-orange-500',
  },
  {
    title: 'Lawyers & Advocates',
    desc: 'Professional templates showcasing legal expertise, case studies, and easy client contact options.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop',
    accent: 'from-slate-500 to-slate-700',
  },
  {
    title: 'Hotels & Resorts',
    desc: 'Stylish templates featuring reservation systems, photo galleries, and amenity highlights.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
    accent: 'from-cyan-400 to-blue-500',
  },
  {
    title: 'Fitness & Wellness',
    desc: 'Dynamic templates with schedules, trainer profiles, and customizable membership plans.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop',
    accent: 'from-emerald-400 to-teal',
  },
  {
    title: 'Catering Service',
    desc: 'Attractive templates focusing on menu options, client testimonials, and service bookings.',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&h=400&fit=crop',
    accent: 'from-rose-400 to-pink-500',
  },
  {
    title: 'Doctors & Clinics',
    desc: 'Modern templates tailored for clinic services, appointment booking, and doctor profiles.',
    image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600&h=400&fit=crop',
    accent: 'from-violet-400 to-purple-500',
  },
];

export default function TemplatesSection() {
  return (
    <section
      id="templates"
      className="relative py-20 sm:py-28 z-10 overflow-hidden bg-section-soft"
    >
      <div className="bg-grid-subtle absolute inset-0 pointer-events-none" aria-hidden="true"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/5 px-4 py-1.5 text-xs font-medium text-teal mb-5">
            <i className="fas fa-palette text-[10px]"></i>
            READY-MADE DESIGNS
          </div>
          <h2 className="font-display text-display-2 text-navy dark:text-white mb-4">
            Explore Templates
          </h2>
          <p className="text-navy/60 dark:text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
            Unique, Stunning Designs to Elevate Your Brand
          </p>
        </div>

        {/* Template Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 reveal-stagger">
          {templates.map((template, idx) => (
            <div
              key={idx}
              className="glass-card overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-glass-hover"
            >
              <div className="relative overflow-hidden aspect-[3/2]">
                <img
                  src={template.image}
                  alt={template.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {/* Floating badge */}
                <div className={`absolute top-3 right-3 bg-gradient-to-r ${template.accent} text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0`}>
                  Explore
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-navy dark:text-white mb-2">
                  {template.title}
                </h3>
                <p className="text-navy/60 dark:text-white/60 text-sm leading-relaxed">
                  {template.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

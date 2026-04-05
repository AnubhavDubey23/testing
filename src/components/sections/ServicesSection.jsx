import React from 'react';

const services = [
  {
    icon: 'fas fa-laptop-code',
    color: 'from-emerald-400 to-teal',
    title: 'Portfolio Websites',
    desc: 'Stand out with a Stunning Portfolio of your own, showcase your work, Attract clients.',
  },
  {
    icon: 'fas fa-building',
    color: 'from-cyan-400 to-blue-500',
    title: 'Business Websites',
    desc: 'Get Professional Web Site for your Business, Extend your Reach, Stand apart & More.',
  },
  {
    icon: 'fas fa-tools',
    color: 'from-amber-400 to-orange-500',
    title: 'Website Maintenance & Upgrade',
    desc: 'Keep your website running smoothly with regular updates, security patches, and performance tuning.',
  },
  {
    icon: 'fas fa-mobile-alt',
    color: 'from-pink-400 to-rose-500',
    title: 'Mobile App Development',
    desc: 'Empower Your Business with a Custom Mobile App, Connect With Customer, and Thrive.',
  },
  {
    icon: 'fas fa-code',
    color: 'from-violet-400 to-purple-500',
    title: 'Custom Mobile Apps',
    desc: 'Reach your Audience Anywhere with a Tailor-made mobile App, unleash Your potential.',
  },
  {
    icon: 'fas fa-sync-alt',
    color: 'from-teal to-emerald-500',
    title: 'Version Upgrade & Maintenance',
    desc: 'Stay current with the latest tech standards through seamless version upgrades and ongoing support.',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-20 sm:py-28 z-10 overflow-hidden bg-cloud dark:bg-dark-900"
    >
      {/* Subtle background */}
      <div className="bg-grid-subtle absolute inset-0 pointer-events-none" aria-hidden="true"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/5 px-4 py-1.5 text-xs font-medium text-teal mb-5">
            <i className="fas fa-cubes text-[10px]"></i>
            WHAT WE DO
          </div>
          <h2 className="font-display text-display-2 text-navy dark:text-white mb-4">
            Our Digital Solutions
          </h2>
          <p className="text-navy/60 dark:text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
            Making Digital Simple, Effective, and Impactful
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-stagger">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="feature-card-premium p-8 flex flex-col group cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 shadow-lg feature-card-icon`}>
                <i className={`${service.icon} text-white text-lg`}></i>
              </div>
              <h3 className="font-display text-lg font-semibold text-navy dark:text-white mb-3">
                {service.title}
              </h3>
              <p className="text-navy/60 dark:text-white/60 text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

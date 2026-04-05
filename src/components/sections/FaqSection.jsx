import React, { useState } from 'react';

const faqs = [
  {
    question: 'What services does Codexveer offer?',
    answer: 'We offer comprehensive digital solutions including portfolio websites, business websites, mobile app development (Android & iOS), website maintenance & upgrades, custom web applications, SEO optimization, and UI/UX design services.',
  },
  {
    question: 'How long does it take to build a website?',
    answer: 'A typical business website takes 2-4 weeks from design to launch. More complex projects like e-commerce platforms or custom web applications may take 4-8 weeks. We provide detailed timelines during our initial consultation.',
  },
  {
    question: 'Do you provide website maintenance after launch?',
    answer: 'Yes! We offer ongoing maintenance packages that include security updates, performance optimization, content updates, and technical support. We ensure your website stays up-to-date and runs smoothly.',
  },
  {
    question: 'Can I see examples of your previous work?',
    answer: 'Absolutely! Check out our Templates section to see the types of designs we create. We also provide custom portfolios during consultations based on your industry and requirements.',
  },
  {
    question: 'What technologies do you use?',
    answer: 'We work with modern technologies including React.js, Next.js, Node.js, MongoDB, React Native for mobile apps, and more. We choose the best tech stack based on your project requirements for optimal performance.',
  },
  {
    question: 'How do I get started with Codexveer?',
    answer: 'Simply reach out through our Contact form, WhatsApp, or email. We\'ll schedule a free consultation to understand your needs, provide a quote, and outline a project plan. No commitment required for the initial discussion!',
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggleFaq = (index) => {
    setOpenIdx(openIdx === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-20 sm:py-28 bg-cloud dark:bg-dark-900 overflow-hidden bg-grid-subtle"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/5 px-4 py-1.5 text-xs font-medium text-teal mb-5">
            <i className="fas fa-question-circle text-[10px]"></i>
            GOT QUESTIONS?
          </div>
          <h2 className="font-display text-display-2 text-navy dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-navy/60 dark:text-white/60 text-base sm:text-lg max-w-xl mx-auto">
            Everything you need to know about our services
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4 reveal-stagger">
          {faqs.map((faq, index) => {
            const isActive = openIdx === index;
            return (
              <div key={index} className="glass-card overflow-hidden">
                <button
                  className="faq-toggle flex justify-between items-center w-full text-left px-6 py-5"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isActive}
                >
                  <h3 className="text-base font-semibold text-navy dark:text-white pr-4">
                    {faq.question}
                  </h3>
                  <i
                    className={`fas fa-chevron-down text-teal text-sm flex-shrink-0 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
                  ></i>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: isActive ? '200px' : '0px',
                    opacity: isActive ? 1 : 0,
                  }}
                >
                  <p className="text-navy/70 dark:text-white/70 px-6 pb-5 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

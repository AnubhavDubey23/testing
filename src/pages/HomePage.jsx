import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import TemplatesSection from '../components/sections/TemplatesSection';
import SocialFeedSection from '../components/sections/SocialFeedSection';
import ContactSection from '../components/sections/ContactSection';
import FaqSection from '../components/sections/FaqSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <TemplatesSection />
      <SocialFeedSection />
      <ContactSection />
      <FaqSection />
    </>
  );
}

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/ui/WhatsAppButton';
import ProtectedRoute from './components/ui/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import TemplatesPage from './pages/TemplatesPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BlogListPage from './pages/BlogListPage';
import BlogDetailPage from './pages/BlogDetailPage';
import DashboardPage from './pages/DashboardPage';
import BlogEditorPage from './pages/BlogEditorPage';
import AppointmentPage from './pages/AppointmentPage';
import TemplatesManagementPage from './pages/TemplatesManagementPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Shared layout with reveal observer
function Layout({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    // Dark mode init
    const isDark =
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Re-run reveal observer on every route change
  useEffect(() => {
    let observer;
    const timeoutId = setTimeout(() => {
      const revealElements = document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger, [data-anim]'
      );

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
            }
          });
        },
        { rootMargin: '50px 0px 50px 0px', threshold: 0 }
      );

      revealElements.forEach((el) => observer.observe(el));
    }, 50);

    // Safety fallback — always fire after 800ms regardless
    const safetyId = setTimeout(() => {
      document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger, [data-anim]'
      ).forEach((el) => el.classList.add('is-visible'));
    }, 800);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(safetyId);
      if (observer) observer.disconnect();
    };
  }, [pathname]);

  return (
    <>
      <div className="font-sans antialiased text-navy dark:text-slate-200 bg-cloud dark:bg-dark-900 min-h-screen app-wrap">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
      <WhatsAppButton />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* ─── Public Pages ─── */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
        <Route path="/templates" element={<Layout><TemplatesPage /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
        <Route path="/blog" element={<Layout><BlogListPage /></Layout>} />
        <Route path="/blog/:id" element={<Layout><BlogDetailPage /></Layout>} />
        <Route path="/appointment" element={<Layout><AppointmentPage /></Layout>} />

        {/* ─── Auth Pages ─── */}
        <Route path="/login" element={<Layout><LoginPage /></Layout>} />
        <Route path="/register" element={<Layout><RegisterPage /></Layout>} />

        {/* ─── Protected: Dashboard (All authenticated users) ─── */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            </Layout>
          }
        />

        {/* ─── Protected: Blog Editor (Admin + Intern) ─── */}
        <Route
          path="/dashboard/editor"
          element={
            <Layout>
              <ProtectedRoute roles={['Admin', 'Intern']}>
                <BlogEditorPage />
              </ProtectedRoute>
            </Layout>
          }
        />

        {/* ─── Protected: Templates Management (Admin only) ─── */}
        <Route
          path="/dashboard/templates"
          element={
            <Layout>
              <ProtectedRoute roles={['Admin']}>
                <TemplatesManagementPage />
              </ProtectedRoute>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile } from '../config/profile';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
      >
        {/* LOGO */}
        <motion.a
          href="#hero"
          className="navbar-brand"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          {'<'}{profile.name}{' />'}
        </motion.a>

        {/* DESKTOP LINKS */}
        <div className="navbar-links">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="nav-link"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <motion.button
          className="navbar-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <motion.span
            animate={{
              rotate: mobileOpen ? 45 : 0,
              y: mobileOpen ? 7 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="hamburger-line"
          />
          <motion.span
            animate={{ opacity: mobileOpen ? 0 : 1, scaleX: mobileOpen ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className="hamburger-line"
          />
          <motion.span
            animate={{
              rotate: mobileOpen ? -45 : 0,
              y: mobileOpen ? -7 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="hamburger-line"
          />
        </motion.button>
      </motion.nav>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setMobileOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              zIndex: 998,
              backdropFilter: 'blur(4px)',
            }}
          />
        )}
      </AnimatePresence>

      {/* MOBILE MENU PANEL */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{
              padding: '20px 36px 10px',
              fontSize: '0.7rem',
              fontWeight: 700,
              color: 'rgba(99,102,241,0.7)',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              Navigation
            </div>

            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="mobile-link"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 * i, duration: 0.3 }}
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </motion.a>
            ))}

            {/* Social in mobile menu */}
            <div style={{
              marginTop: 'auto',
              padding: '30px 36px 10px',
              display: 'flex',
              gap: 14,
            }}>
              <a
                href="https://github.com/tushar-singhal736"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 40, height: 40,
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#94a3b8', fontSize: 18, textDecoration: 'none',
                  transition: 'all 0.3s',
                }}
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/tushar-singhal-a51a40339/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 40, height: 40,
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#94a3b8', fontSize: 18, textDecoration: 'none',
                  transition: 'all 0.3s',
                }}
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { href: '#home', label: 'HOME' },
  { href: '#skills', label: 'SKILLS' },
  { href: '#experience', label: 'EXPERIENCE' },
  { href: '#projects', label: 'PROJECTS' },
  { href: '#blog', label: 'BLOG' },
  { href: '#contact', label: 'CONTACT' }
];

const menuVariants = {
  closed: {
    opacity: 0,
    x: '100%',
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
      staggerDirection: -1
    }
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
      staggerDirection: 1,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  closed: { opacity: 0, x: 50 },
  open: { opacity: 1, x: 0 }
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="max-w-6xl mx-auto px-8 py-6 flex justify-between items-center">
        <a href="#" className="text-4xl font-bold brutal-logo">DD</a>
        
        <button 
          onClick={toggleMenu}
          className="burger-menu z-50 relative"
          aria-label="Toggle Menu"
        >
          <div className={`burger-line ${isMenuOpen ? 'open' : ''}`} />
          <div className={`burger-line ${isMenuOpen ? 'open' : ''}`} />
          <div className={`burger-line ${isMenuOpen ? 'open' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-white"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="h-full flex items-center justify-center">
              <nav className="text-center">
                <motion.ul className="space-y-8">
                  {links.map((item, index) => (
                    <motion.li 
                      key={index}
                      variants={itemVariants}
                      className="overflow-hidden"
                    >
                      <a
                        href={item.href}
                        onClick={closeMenu}
                        className="text-5xl font-bold hover:text-red-600 transition-colors duration-300"
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

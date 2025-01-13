'use client';

import { useState, useEffect } from 'react';
import { FiTerminal } from 'react-icons/fi';
import { motion } from 'framer-motion';
import TerminalPopup from './TerminalPopup';

export default function FloatingTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPulse, setShowPulse] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setShowPulse(false);
    }
  }, [isOpen]);

  return (
    <>
      <motion.div 
        className="fixed left-0 top-1/2 -translate-y-1/2 z-50"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          className="brutal-btn brutal-btn-black flex items-center gap-2 px-4 py-3 text-sm relative group overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        >
          <motion.div
            className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-10 
            transition-opacity duration-300"
          />
          <motion.div
            initial={{ y: 0 }}
            whileHover={{ 
              y: [-2, 2, -2],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="relative z-10"
          >
            <FiTerminal className="w-5 h-5 group-hover:text-green-400 transition-colors duration-300" />
          </motion.div>
          <span className="relative z-10 group-hover:text-green-400 transition-colors duration-300 uppercase tracking-wider"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
            Terminal
          </span>
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-green-500"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />

          {/* Pulse Indicator */}
          {showPulse && (
            <div className="absolute -right-1 top-1/2 -translate-y-1/2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </div>
          )}
        </motion.button>
      </motion.div>

      <TerminalPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <style jsx global>{`
        .brutal-btn {
          @apply relative inline-flex items-center justify-center font-medium transition-all duration-200;
          box-shadow: 3px 3px 0 rgba(255, 255, 255, 0.2);
        }
        .brutal-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 rgba(255, 255, 255, 0.2);
        }
        .brutal-btn:active {
          transform: translate(0, 0);
          box-shadow: 0 0 0 rgba(255, 255, 255, 0.2);
        }
        .brutal-btn-black {
          @apply bg-black text-white border-2 border-white/20;
        }
      `}</style>
    </>
  );
}

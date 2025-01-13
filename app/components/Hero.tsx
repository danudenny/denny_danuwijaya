'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiDevdotto } from 'react-icons/si';
import { 
  SiTypescript, 
  SiPython, 
  SiReact, 
  SiVuedotjs, 
  SiAngular,
  SiLaravel,
  SiPostgresql,
  SiDocker 
} from 'react-icons/si';
import { IoTerminal } from 'react-icons/io5';
import TerminalPopup from './TerminalPopup';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/danudenny',
    icon: FaGithub
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/dennydanuwijaya/',
    icon: FaLinkedin
  },
  {
    name: 'Dev.to',
    url: 'https://dev.to/danudenny',
    icon: SiDevdotto
  }
];

const skillIcons = [
  { icon: SiTypescript, name: 'TypeScript' },
  { icon: SiPython, name: 'Python' },
  { icon: SiReact, name: 'React' },
  { icon: SiVuedotjs, name: 'Vue.js' },
  { icon: SiAngular, name: 'Angular' },
  { icon: SiLaravel, name: 'Laravel' },
  { icon: SiPostgresql, name: 'PostgreSQL' },
  { icon: SiDocker, name: 'Docker' }
];

export default function Hero() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <motion.section 
      className="py-12 md:py-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="brutal-box brutal-box-blue">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">
              Hi, I&apos;m Denny Danuwijaya👋
            </h1>
            <h2 className="text-2xl md:text-3xl opacity-80">
              Full Stack Developer & GIS Specialist
            </h2>
          </div>
          
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl">
            I specialize in building robust web applications with modern technologies. 
            With expertise in both front-end and back-end development, I create 
            scalable solutions that solve real-world problems.
          </p>

          {/* Skill Icons */}
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {skillIcons.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <skill.icon 
                  className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" 
                />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                  text-sm whitespace-nowrap">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Social Links and Terminal Button */}
          <motion.div 
            className="flex gap-6 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {socialLinks.map(link => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:scale-110 transition-transform duration-200"
              >
                <link.icon />
              </a>
            ))}
            
            {/* Terminal Button */}
            <motion.button
              onClick={() => setIsTerminalOpen(true)}
              className="brutal-btn brutal-btn-black flex items-center gap-2 px-4 py-2 text-sm relative group overflow-hidden"
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
                <IoTerminal className="w-5 h-5 group-hover:text-green-400 transition-colors duration-300" />
              </motion.div>
              <span className="relative z-10 group-hover:text-green-400 transition-colors duration-300">
                Open Terminal
              </span>
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-green-500"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Terminal Popup */}
      <TerminalPopup 
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </motion.section>
  );
}

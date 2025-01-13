'use client';

import { motion } from 'framer-motion';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const contactInfo = [
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    value: '+628975780504',
    href: 'https://wa.me/628975780504',
    hoverColor: 'hover:bg-[#25D366]'
  },
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'danudenny@gmail.com',
    href: 'mailto:danudenny@gmail.com',
    hoverColor: 'hover:bg-[#EA4335]'
  },
  {
    icon: FaMapMarkerAlt,
    label: 'Location',
    value: 'South Jakarta, DKI Jakarta',
    href: 'https://maps.google.com/?q=South+Jakarta,+DKI+Jakarta',
    hoverColor: 'hover:bg-[#4285F4]'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Contact() {
  return (
    <motion.section 
      className="py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="brutal-heading mb-12">GET IN TOUCH</h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {contactInfo.map((contact, index) => (
          <motion.a
            key={index}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            className={`brutal-box p-6 hover:text-white transition-all duration-300 group relative
              ${contact.hoverColor} border-2 border-black hover:border-transparent`}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"
            />
            <motion.div
              className="relative z-10"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <contact.icon className="w-8 h-8 mb-4 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-xl font-bold mb-2">{contact.label}</h3>
              <p className="text-lg opacity-90 group-hover:opacity-100">{contact.value}</p>
            </motion.div>
            <motion.div
              className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <svg 
                className="w-5 h-5 transform rotate-45" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M14 5l7 7m0 0l-7 7m7-7H3" 
                />
              </svg>
            </motion.div>
          </motion.a>
        ))}
      </motion.div>
    </motion.section>
  );
}

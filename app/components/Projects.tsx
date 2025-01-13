'use client';

import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Official Travel Information System',
    description: 'Comprehensive travel management system for Wijaya Karya Industri dan Konstruksi with real-time updates.',
    tech: ['Angular 12', 'PostgreSQL', 'Node.js WebSocket', 'Laravel 9'],
    category: 'Enterprise System',
    color: 'hover:bg-purple-600'
  },
  {
    title: 'BKSDA Palembang Monitoring System',
    description: 'A comprehensive monitoring system for Natural Resources Conservation Agency.',
    tech: ['Angular 5', 'Node.js', 'Express', 'PostgreSQL', 'GeoServer', 'LeafletJS'],
    category: 'GIS Application',
    color: 'hover:bg-blue-600'
  },
  {
    title: 'Environmental Impact Analysis System',
    description: 'Advanced system for the Ministry of Environment and Forestry to analyze environmental impacts.',
    tech: ['Vue', 'Laravel 10', 'PostgreSQL', 'ArcGIS Server', 'ArcGIS JS API'],
    category: 'Government System',
    color: 'hover:bg-green-600'
  },
  {
    title: 'Spatial Planning Information System',
    description: 'Comprehensive spatial planning system implemented for multiple regencies including Banyuasin and Belitung.',
    tech: ['Vue', 'Laravel 10', 'PostgreSQL', 'Python', 'OpenLayers'],
    category: 'GIS Application',
    color: 'hover:bg-blue-600'
  },
  {
    title: 'KKPR Information System',
    description: 'Land Use Permit system for Banyuasin Regency with advanced spatial features.',
    tech: ['Vue', 'Laravel 10', 'PostgreSQL', 'Python', 'OpenLayers'],
    category: 'Government System',
    color: 'hover:bg-green-600'
  },
  {
    title: 'HRIS for PT Pesonna Optima Jasa',
    description: 'Complete Human Resource Information System with modern features.',
    tech: ['Vue', 'Laravel 10', 'PostgreSQL', 'Python', 'Minio'],
    category: 'Enterprise System',
    color: 'hover:bg-purple-600'
  },
  {
    title: 'Heartful Tower Apartment Website',
    description: 'Modern and responsive website for luxury apartment complex.',
    tech: ['Next.js', 'React', 'Tailwind CSS'],
    category: 'Web Development',
    color: 'hover:bg-red-600'
  },
  {
    title: 'Galaksi Mineral Indonesia',
    description: 'Corporate website with modern design and optimal performance.',
    tech: ['Next.js', 'React', 'Tailwind CSS'],
    category: 'Web Development',
    color: 'hover:bg-red-600'
  },
  {
    title: 'Monitoring and Evaluation System',
    description: 'Comprehensive system for Banyuasin Regency to track and evaluate projects.',
    tech: ['Vue', 'Laravel 8', 'MySQL'],
    category: 'Government System',
    color: 'hover:bg-green-600'
  },
  {
    title: 'Judging Information System',
    description: 'Specialized system for the Ministry of Youth and Sports.',
    tech: ['Laravel 8', 'MySQL', 'Bootstrap'],
    category: 'Government System',
    color: 'hover:bg-green-600'
  },
  {
    title: 'Billboard Information System',
    description: 'GIS-based system for managing billboard locations in Semarang City.',
    tech: ['PHP', 'CodeIgniter', 'MySQL', 'LeafletJS'],
    category: 'GIS Application',
    color: 'hover:bg-blue-600'
  },
  {
    title: 'Project Management System',
    description: 'Custom project management solution with comprehensive features.',
    tech: ['PHP', 'CodeIgniter', 'MySQL'],
    category: 'Enterprise System',
    color: 'hover:bg-purple-600'
  },
  {
    title: 'South Sumatra BKSDA Website',
    description: 'Official website for the Natural Resources Conservation Agency.',
    tech: ['CodeIgniter', 'Bootstrap', 'MySQL'],
    category: 'Government Website',
    color: 'hover:bg-green-600'
  },
  {
    title: 'Billboard Marketplace',
    description: 'E-commerce platform for PT Adpoint specializing in billboard spaces.',
    tech: ['Magento', 'PHP', 'MySQL'],
    category: 'E-commerce',
    color: 'hover:bg-orange-600'
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

export default function Projects() {
  return (
    <motion.section 
      className="py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="brutal-heading mb-12">PROJECTS</h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`brutal-box p-6 transition-all duration-300 group relative overflow-hidden
              ${project.color} hover:text-white border-2 border-black`}
            whileHover={{ 
              scale: 1.03,
              transition: { duration: 0.2 }
            }}
          >
            <motion.div 
              className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"
            />
            <div className="relative z-10">
              <span className="text-sm font-mono opacity-60">{project.category}</span>
              <h3 className="text-xl font-bold mb-2 mt-1">{project.title}</h3>
              <p className="text-lg mb-4 opacity-80 group-hover:opacity-100">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span 
                    key={i}
                    className="px-2 py-1 text-sm border border-current bg-white text-black 
                      group-hover:bg-transparent group-hover:text-white group-hover:border-white
                      transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}

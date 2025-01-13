'use client';

import { motion } from 'framer-motion';

const experienceData = [
  {
    period: '09/2023 - Present',
    role: 'Geographic Information System Developer',
    company: 'Koltiva',
    location: 'South Jakarta',
    description: 'Develop and maintain GIS maps for agricultural projects using Geoserver and GeoPandas.',
    achievements: [
      'Develop and maintain GIS maps for agricultural projects using Geoserver and GeoPandas, ensuring accurate spatial data representation',
      'Analyze spatial data to support decision-making processes, improving project efficiency by 20%',
      'Collaborate with cross-functional teams to integrate diverse data sources into web GIS applications',
      'Design and implement GIS solutions that enhance data visualization and usability for stakeholders'
    ],
    tech: ['Geoserver', 'GeoPandas', 'Python', 'PostgreSQL', 'PostGIS']
  },
  {
    period: '01/2023 - 09/2023',
    role: 'API Engineer',
    company: 'Yummy Corp',
    location: 'South Tangerang',
    description: 'Designed and developed REST APIs for ordering platform systems.',
    achievements: [
      'Designed and developed REST APIs for ordering platform systems using NestJS, improving system performance by 15%',
      'Implemented microservice integration using Google Pub/Sub, enabling seamless communication between services',
      'Managed production releases and resolved critical issues in staging and production environments, ensuring 99.9% uptime'
    ],
    tech: ['NestJS', 'TypeScript', 'Google Cloud', 'Pub/Sub', 'Docker']
  },
  {
    period: '09/2020 - 11/2022',
    role: 'Senior Backend Engineer',
    company: 'Sicepat Express Indonesia',
    location: 'Jakarta',
    description: 'Led backend development for various internal systems and integrations.',
    achievements: [
      'Architected and implemented REST API for a petty cash program using NestJS, reducing processing time by 30%',
      'Integrated third-party services (Sunfish & Odoo) and Krakend API Gateway, streamlining data flow',
      'Developed a data reporting service using Go, enhancing data accessibility and reporting efficiency'
    ],
    tech: ['NestJS', 'Go', 'Krakend', 'Redis', 'PostgreSQL']
  },
  {
    period: '09/2017 - 09/2020',
    role: 'Full Stack Developer',
    company: 'Imani Prima',
    location: 'Jakarta',
    description: 'Led full-stack development of web applications and IoT systems.',
    achievements: [
      'Led full-stack development of web applications, including IoT monitoring systems and e-commerce platforms',
      'Utilized GraphQL, Node.js, Angular, Laravel, and Vue.js to deliver scalable and user-friendly solutions',
      'Implemented new technologies to enhance product offerings'
    ],
    tech: ['Node.js', 'Angular', 'Laravel', 'Vue.js', 'GraphQL']
  },
  {
    period: '04/2017 - 09/2017',
    role: 'GIS Programmer',
    company: 'eKomoditi Solutions Indonesia',
    location: 'Jakarta',
    description: 'Developed GIS web applications and ERP systems.',
    achievements: [
      'Developed GIS web applications using LeafletJS, Bootstrap, and PHP CodeIgniter, improving data visualization for clients',
      'Built an ERP system using PHP, streamlining internal processes and reducing manual workload by 40%'
    ],
    tech: ['PHP', 'CodeIgniter', 'LeafletJS', 'MySQL', 'Bootstrap']
  },
  {
    period: '09/2015 - 09/2016',
    role: 'GIS Developer',
    company: 'CV Java Desain',
    location: 'Indonesia',
    description: 'Developed various GIS-based websites and desktop applications for government and institutional clients.',
    achievements: [
      'Developed Spatial Planning Information System for Banjarnegara Regency (Web)',
      'Created Disaster Risk Information System for Semarang City (Web)',
      'Built Spatial Planning Information System for Jepara Regency (Web)',
      'Implemented Spatial Planning Information System for Batam City (Desktop)',
      'Developed Public Street Lighting Information System for Temanggung Regency (Desktop)',
      'Created Public Street Lighting Information System for Cilacap Regency (Desktop)',
      'Built Asset Inventory Information System for Universitas Negeri Semarang (Desktop)'
    ],
    tech: ['GIS', 'Web Development', 'Desktop Applications', 'Spatial Planning']
  },
  {
    period: '01/2014 - 07/2015',
    role: 'Surveyor',
    company: 'PT Dharma Satya Nusantara Tbk',
    location: 'Indonesia',
    description: 'Conducted land surveys and analysis for agricultural cultivation projects.',
    achievements: [
      'Made decisions on land to be cultivated',
      'Generated reports using maps',
      'Provided land analysis for cultivation to the site manager',
      'Conducted field surveys'
    ],
    tech: ['Land Surveying', 'Mapping', 'GIS', 'Field Analysis']
  },
  {
    period: '07/2011 - 12/2013',
    role: 'GIS Specialist',
    company: 'CV Tunas Konsultan',
    location: 'Indonesia',
    description: 'Led GIS projects and managed technical aspects of consulting projects.',
    achievements: [
      'Assisted the team leader in project preparation',
      'Prepared technical proposals for projects',
      'Developed Terms of Reference (ToR) for projects',
      'Created project cost estimates (Bill of Quantities)',
      'Mentored junior staff and interns',
      'Handled all GIS-related tasks',
      'Conducted field surveys'
    ],
    tech: ['GIS', 'Project Management', 'Technical Writing', 'Field Surveys']
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Experience() {
  return (
    <motion.section 
      className="py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="brutal-box brutal-box-red"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "tween" }}
      >
        <h2 className="brutal-heading mb-12">EXPERIENCE</h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-16"
        >
          {experienceData.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative pl-8 ${
                index !== experienceData.length - 1 ? 'experience-line' : ''
              }`}
            >
              <div className="experience-dot" />
              <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
                <div className="md:w-48 flex-shrink-0">
                  <span className="text-lg font-mono font-bold">{exp.period}</span>
                </div>
                <div className="flex-grow">
                  <div className="flex flex-wrap items-baseline gap-2 mb-2">
                    <h3 className="text-2xl font-bold">{exp.role}</h3>
                    <span className="text-xl">@</span>
                    <span className="text-xl font-bold">{exp.company}</span>
                  </div>
                  <p className="text-lg text-gray-600 mb-2">{exp.location}</p>
                  <p className="mb-4 text-lg">{exp.description}</p>
                  <ul className="list-none space-y-3 mb-4">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-block w-2 h-2 mt-2.5 mr-3 bg-current flex-shrink-0" />
                        <span className="text-lg">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 text-sm font-bold border-2 border-current"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

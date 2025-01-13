'use client';

import { motion } from 'framer-motion';

const skillsData = {
  techStack: [
    { name: 'JavaScript / Node.js', level: 90 },
    { name: 'Go', level: 85 },
    { name: 'Python', level: 85 },
    { name: 'PHP', level: 80 },
    { name: 'NestJS', level: 90 },
    { name: 'Vue.js', level: 85 }
  ],
  frameworks: [
    { name: 'Laravel', level: 85 },
    { name: 'FastAPI', level: 80 },
    { name: 'Geoserver', level: 85 },
    { name: 'Pandas', level: 80 }
  ],
  databases: [
    { name: 'PostgreSQL', level: 90 },
    { name: 'MySQL', level: 85 },
    { name: 'Redshift', level: 80 }
  ],
  cloud: [
    { name: 'AWS Lambda', level: 85 },
    { name: 'AWS ECR', level: 85 },
    { name: 'AWS S3', level: 90 },
    { name: 'AWS ECS', level: 85 }
  ]
};

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
};

const SkillBar = ({ name, level }: { name: string; level: number }) => (
  <motion.div 
    className="mb-4"
    variants={itemVariants}
  >
    <div className="flex justify-between mb-2">
      <span className="font-bold">{name}</span>
      <span className="font-mono">{level}%</span>
    </div>
    <div className="w-full h-3 border-2 border-current">
      <motion.div
        className="h-full bg-current"
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
      />
    </div>
  </motion.div>
);

const SkillSection = ({ title, skills }: { title: string; skills: Array<{ name: string; level: number }> }) => (
  <div className="mb-8">
    <h4 className="text-xl font-bold mb-4">{title}</h4>
    <motion.div
      variants={listVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {skills.map((skill, index) => (
        <SkillBar key={index} {...skill} />
      ))}
    </motion.div>
  </div>
);

export default function Skills() {
  return (
    <motion.section 
      className="py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
          className="brutal-box"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "tween" }}
        >
          <h3 className="brutal-heading mb-8">LANGUAGES</h3>
          <SkillSection title="Core Languages" skills={skillsData.techStack} />
        </motion.div>

        <motion.div 
          className="brutal-box brutal-box-blue"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "tween" }}
        >
          <h3 className="brutal-heading mb-8">FRAMEWORKS</h3>
          <SkillSection title="Web & Data" skills={skillsData.frameworks} />
        </motion.div>

        <motion.div 
          className="brutal-box brutal-box-green"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "tween" }}
        >
          <h3 className="brutal-heading mb-8">DATABASES</h3>
          <SkillSection title="SQL & NoSQL" skills={skillsData.databases} />
        </motion.div>

        <motion.div 
          className="brutal-box brutal-box-red"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "tween" }}
        >
          <h3 className="brutal-heading mb-8">CLOUD</h3>
          <SkillSection title="AWS Services" skills={skillsData.cloud} />
        </motion.div>
      </div>
    </motion.section>
  );
}

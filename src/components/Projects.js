import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { profile } from '../config/profile';

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const projects = profile.projects || [];

  return (
    <section id="projects" className="section projects projects-v2" ref={ref}>
      <div className="container">
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Featured <span className="accent">Projects</span>
          </h2>
          <p className="projects-subtitle">A few things I’ve built recently.</p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
              initial={{ opacity: 0, y: 34 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08 * i }}
              whileHover={{ y: -10 }}
            >
              <div
                className="project-card-glow"
                style={{ background: project.gradient || 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}
                aria-hidden="true"
              />

              <div className="project-card-content">
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <div className="project-tech">
                  {project.tech.map((t) => (
                    <span key={t} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="project-link">
                  View Project <span aria-hidden="true">→</span>
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
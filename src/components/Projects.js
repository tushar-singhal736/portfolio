import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { profile } from '../config/profile';

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const projects = profile.projects || [];

  return (
    <section id="projects" className="section projects projects-v2" ref={ref}>

      <style>{`

        /* ===========================
           PROJECTS SECTION
        =========================== */

        .projects-v2 {
          background: #020617;
          padding: 100px 24px;
        }

        .projects-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .projects-header .section-title {
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 800;
          color: #e2e8f0;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .projects-subtitle {
          color: #94a3b8;
          font-size: 0.97rem;
          margin: 0;
        }


        /* ===========================
           GRID
        =========================== */

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 28px;
          max-width: 1100px;
          margin: 0 auto;
        }


        /* ===========================
           CARD
        =========================== */

        .project-card {
          position: relative;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          display: block;
          text-decoration: none;
          cursor: pointer;
        }

        .project-card:hover {
          border-color: rgba(99, 102, 241, 0.45);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
          transform: translateY(-8px);
        }


        /* ===========================
           TOP GRADIENT BAR
        =========================== */

        .project-card-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          opacity: 0;
          transition: opacity 0.3s;
          z-index: 2;
        }

        .project-card:hover .project-card-glow {
          opacity: 1;
        }


        /* ===========================
           SCREENSHOT IMAGE
        =========================== */

        .project-img-wrap {
          width: 100%;
          height: 190px;
          overflow: hidden;
          position: relative;
          background: #0f172a;
        }

        .project-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          transition: transform 0.5s ease;
          display: block;
        }

        .project-card:hover .project-img-wrap img {
          transform: scale(1.05);
        }

        /* Gradient fade at bottom of image into card */
        .project-img-wrap::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: linear-gradient(to bottom, transparent, rgba(2, 6, 23, 0.9));
          pointer-events: none;
        }


        /* ===========================
           CARD CONTENT
        =========================== */

        .project-card-content {
          padding: 22px 24px 24px;
        }

        .project-card-content h3 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 8px;
          color: #e2e8f0;
          line-height: 1.3;
        }

        .project-card-content p {
          color: #94a3b8;
          font-size: 0.88rem;
          margin-bottom: 16px;
          line-height: 1.65;
        }


        /* ===========================
           TECH TAGS
        =========================== */

        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-bottom: 16px;
        }

        .tech-tag {
          font-size: 0.75rem;
          padding: 4px 10px;
          background: rgba(99, 102, 241, 0.1);
          color: #a5b4fc;
          border-radius: 6px;
          border: 1px solid rgba(99, 102, 241, 0.18);
          font-weight: 500;
        }


        /* ===========================
           VIEW LINK
        =========================== */

        .project-link {
          font-size: 0.85rem;
          font-weight: 700;
          color: #6366f1;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          transition: gap 0.3s ease;
          text-decoration: none;
          letter-spacing: 0.01em;
        }

        .project-card:hover .project-link {
          gap: 10px;
        }


        /* ===========================
           RESPONSIVE
        =========================== */

        @media (max-width: 768px) {
          .projects-v2 {
            padding: 80px 18px;
          }

          .projects-grid {
            grid-template-columns: 1fr;
          }

          .project-img-wrap {
            height: 170px;
          }
        }

        @media (max-width: 480px) {
          .project-img-wrap {
            height: 150px;
          }
        }

      `}</style>


      <div className="container">

        {/* HEADER */}
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Featured <span className="accent">Projects</span>
          </h2>
          <p className="projects-subtitle">A few things I've built recently.</p>
        </motion.div>


        {/* CARDS GRID */}
        <div className="projects-grid">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
              initial={{ opacity: 0, y: 36 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 * i }}
            >
              {/* TOP GRADIENT BAR */}
              <div
                className="project-card-glow"
                style={{ background: project.gradient }}
                aria-hidden="true"
              />

              {/* SCREENSHOT */}
              {project.image && (
                <div className="project-img-wrap">
                  <img src={project.image} alt={project.title} />
                </div>
              )}

              {/* TEXT CONTENT */}
              <div className="project-card-content">
                <h3>{project.title}</h3>
                <p>{project.desc}</p>

                <div className="project-tech">
                  {project.tech.map((t) => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>

                <span className="project-link">
                  View on GitHub <span aria-hidden="true">→</span>
                </span>
              </div>

            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
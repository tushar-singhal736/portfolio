import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { profile } from "../config/profile";

const categoryIcons = {
  Frontend: "💻",
  Backend: "🗄️",
};

function groupByCategory(skills) {
  const groups = { Frontend: [], Backend: [] };
  skills.forEach((skill) => {
    if (skill.category === "Frontend") groups.Frontend.push(skill);
    if (skill.category === "Backend") groups.Backend.push(skill);
  });
  return groups;
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const skills = profile.skills || [];
  const grouped = groupByCategory(skills);
  const categories = ["Frontend", "Backend"];
  const [active, setActive] = useState("Frontend");

  const filtered = grouped[active] || [];

  return (
    <section id="skills" className="skills-section" ref={ref}>

      <style>{`

        /* ===========================
           SKILLS SECTION
        =========================== */

        .skills-section {
          background: #020617;
          padding: 100px 24px 110px;
          color: white;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        /* Subtle radial glow background */
        .skills-section::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 65%);
          pointer-events: none;
        }


        /* ===========================
           TITLE
        =========================== */

        .sk-title {
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 800;
          margin-bottom: 50px;
          letter-spacing: -0.02em;
          color: #e2e8f0;
          font-family: 'Outfit', sans-serif;
        }

        .sk-title span {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }


        /* ===========================
           WRAPPER (Left + Right)
        =========================== */

        .sk-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 64px;
          max-width: 1100px;
          margin: 0 auto;
        }


        /* ===========================
           LEFT SIDE
        =========================== */

        .sk-left {
          flex: 1.1;
          min-width: 0;
        }


        /* ===========================
           TABS
        =========================== */

        .sk-tabs {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .sk-tab {
          padding: 10px 26px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.03);
          color: #94a3b8;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          letter-spacing: 0.02em;
        }

        .sk-tab:hover {
          border-color: rgba(99, 102, 241, 0.5);
          color: #e2e8f0;
          background: rgba(99, 102, 241, 0.08);
        }

        .sk-tab.active {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border-color: transparent;
          box-shadow: 0 4px 18px rgba(99, 102, 241, 0.45);
        }


        /* ===========================
           SKILL CIRCLES GRID
        =========================== */

        .sk-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 30px;
          padding-bottom: 24px;
        }


        /* ===========================
           SINGLE SKILL CIRCLE
        =========================== */

        .sk-circle {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.95);
          border: 1px solid rgba(99, 102, 241, 0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow:
            0 0 16px rgba(99, 102, 241, 0.15),
            inset 0 1px 0 rgba(255,255,255,0.05);
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 20px;
        }

        .sk-circle img {
          width: 40px;
          height: 40px;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .sk-circle:hover {
          transform: translateY(-6px) scale(1.08);
          box-shadow:
            0 8px 30px rgba(99, 102, 241, 0.6),
            0 0 0 1px rgba(99, 102, 241, 0.4);
          border-color: #6366f1;
        }

        .sk-circle:hover img {
          transform: scale(1.1);
        }


        /* ===========================
           SKILL LEVEL BADGE (hover)
        =========================== */

        .sk-level {
          position: absolute;
          top: -16px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          font-size: 11px;
          padding: 3px 9px;
          border-radius: 6px;
          opacity: 0;
          transition: opacity 0.25s ease, top 0.25s ease;
          font-weight: 700;
          white-space: nowrap;
          pointer-events: none;
          box-shadow: 0 3px 10px rgba(99,102,241,0.5);
          font-family: 'JetBrains Mono', monospace;
        }

        /* Triangle pointer below badge */
        .sk-level::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          border: 5px solid transparent;
          border-top-color: #8b5cf6;
          border-bottom: 0;
        }

        .sk-circle:hover .sk-level {
          opacity: 1;
          top: -20px;
        }


        /* ===========================
           SKILL NAME (below circle)
        =========================== */

        .sk-name {
          position: absolute;
          bottom: -22px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 10px;
          color: rgba(148, 163, 184, 0.65);
          white-space: nowrap;
          font-weight: 500;
          letter-spacing: 0.03em;
          transition: color 0.3s;
          font-family: 'Outfit', sans-serif;
        }

        .sk-circle:hover .sk-name {
          color: #818cf8;
        }


        /* ===========================
           RIGHT SIDE IMAGE
        =========================== */

        .sk-right {
          flex: 0.9;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .sk-right img {
          max-width: 400px;
          width: 100%;
          border-radius: 20px;
          filter: drop-shadow(0 20px 40px rgba(99,102,241,0.12));
        }


        /* ===========================
           RESPONSIVE — Tablet
        =========================== */

        @media (max-width: 900px) {
          .sk-wrapper {
            flex-direction: column;
            gap: 40px;
          }

          .sk-left {
            width: 100%;
          }

          .sk-right img {
            max-width: 260px;
          }
        }


        /* ===========================
           RESPONSIVE — Mobile
        =========================== */

        @media (max-width: 480px) {
          .skills-section {
            padding: 80px 16px 90px;
          }

          .sk-title {
            margin-bottom: 36px;
          }

          .sk-circle {
            width: 74px;
            height: 74px;
          }

          .sk-circle img {
            width: 32px;
            height: 32px;
          }

          .sk-grid {
            gap: 18px 20px;
          }

          .sk-tab {
            padding: 8px 18px;
            font-size: 0.82rem;
          }

          .sk-right img {
            max-width: 220px;
          }
        }

      `}</style>


      {/* ===== TITLE ===== */}
      <h2 className="sk-title">
        My <span>Skills</span>
      </h2>


      <div className="sk-wrapper">

        {/* ===== LEFT SIDE ===== */}
        <div className="sk-left">

          {/* TABS */}
          <div className="sk-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`sk-tab ${cat === active ? "active" : ""}`}
                onClick={() => setActive(cat)}
              >
                {categoryIcons[cat]} {cat}
              </button>
            ))}
          </div>

          {/* SKILL CIRCLES */}
          <div className="sk-grid">
            {filtered.map((skill, i) => (
              <motion.div
                key={skill.name}
                className="sk-circle"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07, duration: 0.4, ease: "easeOut" }}
              >
                <img src={skill.icon} alt={skill.name} />
                <div className="sk-level">{skill.level}%</div>
                <div className="sk-name">{skill.name}</div>
              </motion.div>
            ))}
          </div>

        </div>


        {/* ===== RIGHT IMAGE ===== */}
        <div className="sk-right">
          <motion.img
            src="/developer.gif"
            alt="developer animation"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          />
        </div>

      </div>

    </section>
  );
}
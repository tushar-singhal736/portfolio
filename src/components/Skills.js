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

      <h2 className="title">
        My <span>Skills</span>
      </h2>

      <div className="skills-wrapper">

        {/* LEFT SIDE SKILLS */}

        <div className="skills-left">

          <div className="tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`tab ${cat === active ? "active" : ""}`}
                onClick={() => setActive(cat)}
              >
                {categoryIcons[cat]} {cat}
              </button>
            ))}
          </div>

          <div className="skills-grid">

            {filtered.map((skill, i) => (

              <motion.div
                key={skill.name}
                className="skill-circle"
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 }}
              >

                <img src={skill.icon} alt={skill.name} />

                <div className="skill-level">
                  {skill.level}%
                </div>

              </motion.div>

            ))}

          </div>

        </div>


        {/* RIGHT SIDE IMAGE */}

        <div className="skills-right">

          <img
            src="/developer.gif"
            alt="developer"
          />

        </div>

      </div>


<style>{`

.skills-section{
background:#020617;
padding:120px 24px;
color:white;
text-align:center;
}

/* TITLE */

.title{
font-size:36px;
margin-bottom:40px;
}

.title span{
color:#6366f1;
}

/* WRAPPER */

.skills-wrapper{
display:flex;
align-items:center;
justify-content:center;
gap:60px;
max-width:1200px;
margin:auto;
}

/* LEFT */

.skills-left{
flex:1;
}

.tabs{
display:flex;
justify-content:center;
gap:20px;
margin-bottom:40px;
}

.tab{
padding:10px 25px;
border:none;
background:#0f172a;
color:white;
border-radius:25px;
cursor:pointer;
transition:0.3s;
}

.tab.active{
background:#6366f1;
color:white;
}

/* GRID */

.skills-grid{
display:flex;
flex-wrap:wrap;
justify-content:center;
gap:35px;
}

/* SKILL CIRCLE */

.skill-circle{
width:90px;
height:90px;
border-radius:50%;
background:#0f172a;
display:flex;
align-items:center;
justify-content:center;
position:relative;
box-shadow:0 0 15px rgba(99,102,241,0.3);
cursor:pointer;
transition:0.3s;
}

.skill-circle img{
width:42px;
height:42px;
}

.skill-circle:hover{
transform:scale(1.1);
box-shadow:0 0 25px rgba(99,102,241,0.9);
}

/* PERCENT */

.skill-level{
position:absolute;
top:-12px;
background:#6366f1;
color:white;
font-size:12px;
padding:4px 8px;
border-radius:6px;
opacity:0;
transition:0.3s;
font-weight:600;
}

.skill-circle:hover .skill-level{
opacity:1;
}

/* RIGHT IMAGE */

.skills-right{
flex:1;
display:flex;
justify-content:center;
}

.skills-right img{
max-width:420px;
width:100%;
}

/* MOBILE */

@media(max-width:900px){

.skills-wrapper{
flex-direction:column;
}

.skills-right img{
max-width:300px;
}

}

`}</style>

    </section>
  );
}
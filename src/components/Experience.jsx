import { useState } from "react";

const experiences = [
  {
    company: "ODL Software Company Islamabad",
    role: "MERN Stack Developer",
    period: "Jan 2026 – Present",
    type: "Full-time",
    description:
      "Joined as a MERN Stack Developer, working on scalable web applications using MongoDB, Express.js, React.js, and Node.js.",
    expanded:
      "At ODL Software, I collaborate with a cross-functional team to architect, develop, and maintain modern full-stack web applications. My responsibilities include building responsive user interfaces with React.js, developing secure RESTful APIs using Node.js and Express.js, designing efficient MongoDB database structures, and integrating third-party services. I actively participate in code reviews, debugging, performance optimization, and deployment processes while following industry best practices. Working in an agile environment has strengthened my problem-solving, teamwork, and software development skills.",
    color: "#a855f7",
  },
  {
    company: "Self Development",
    role: "MERN Stack Developer",
    period: "Jan 2024 – May 2025",
    type: "Learning",
    description:
      "Built e-commerce platforms, library management systems and AI applications.",
    expanded:
      "During my self-learning journey, I dedicated significant time to mastering the MERN stack by building real-world projects from scratch. I developed e-commerce platforms, library management systems, portfolio websites, and AI-powered applications while gaining hands-on experience with React.js, Node.js, Express.js, and MongoDB. I explored authentication systems, API integrations, state management, responsive design, and deployment workflows. This period helped me establish a strong foundation in full-stack development, software architecture, debugging, and modern web development practices.",
    color: "#f59e0b",
  },
];

function NavBtn({ color, onClick, children }) {
  const [hov, setHov] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flexShrink: 0,
        width: 38,
        height: 38,
        borderRadius: 10,
        border: `1px solid ${color}35`,
        background: hov ? `${color}22` : `${color}0d`,
        color,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: hov ? "scale(1.08)" : "scale(1)",
        transition: "all 0.2s ease",
      }}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        {children}
      </svg>
    </button>
  );
}

export default function Experience() {
  const [current, setCurrent] = useState(0);
  const [animDir, setAnimDir] = useState("right");
  const [animKey, setAnimKey] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const go = (dir) => {
    setAnimDir(dir === "prev" ? "left" : "right");
    setExpanded(false);
    setAnimKey((k) => k + 1);

    if (dir === "prev") {
      setCurrent((c) => (c === 0 ? experiences.length - 1 : c - 1));
    } else {
      setCurrent((c) => (c === experiences.length - 1 ? 0 : c + 1));
    }
  };

  const jumpTo = (i) => {
    if (i === current) return;

    setAnimDir(i > current ? "right" : "left");
    setExpanded(false);
    setAnimKey((k) => k + 1);
    setCurrent(i);
  };

  const exp = experiences[current];
  const animClass = animDir === "left" ? "anim-slide-left" : "anim-slide-right";

  return (
    <section>
      <div className="mb-8 animate-fade-up">
        <h2
          className="font-display section-title-line"
          style={{
            fontSize: "clamp(2rem, 6vw, 2.8rem)",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.02em",
          }}
        >
          Experience
        </h2>

        <p className="mt-3 text-sm" style={{ color: "#6b7280" }}>
          Transforming Ideas into Reality — 1+ Year of Hands-on Expertise!
        </p>
      </div>

      <div
        className="relative rounded-3xl overflow-hidden animate-scale-in delay-200"
        style={{
          border: `1px solid ${exp.color}30`,
          transition: "border-color .5s ease",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(145deg,#0c0c18 0%,#110c1c 60%,#0f0a14 100%)",
          }}
        />

        <div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle,${exp.color}22 0%,transparent 70%)`,
            filter: "blur(50px)",
          }}
        />

        <div
          className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle,${exp.color}12 0%,transparent 70%)`,
            filter: "blur(40px)",
          }}
        />

        <div className="relative z-10 p-5 sm:p-8">
          <div
            className="absolute top-4 right-5 sm:top-5 sm:right-6 font-mono text-xs"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(experiences.length).padStart(2, "0")}
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <NavBtn color={exp.color} onClick={() => go("prev")}>
              <polyline points="15 18 9 12 15 6" />
            </NavBtn>

            <div key={animKey} className={`flex-1 text-center ${animClass}`}>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
                style={{
                  background: `${exp.color}15`,
                  border: `1px solid ${exp.color}35`,
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: exp.color,
                  }}
                />

                <span
                  className="text-xs font-semibold tracking-widest uppercase font-mono"
                  style={{ color: exp.color }}
                >
                  {exp.type}
                </span>
              </div>

              <h3
                className="font-display font-black text-white mb-1.5"
                style={{
                  fontSize: "clamp(1rem, 3.5vw, 1.5rem)",
                }}
              >
                {exp.company}
              </h3>

              <p className="font-semibold mb-3" style={{ color: exp.color }}>
                {exp.role}
              </p>

              <div
                className="inline-block font-mono text-xs px-3 py-1.5 rounded-full mb-5"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#6b7280",
                }}
              >
                📅 {exp.period}
              </div>

              <p
                className="text-sm leading-7 max-w-lg mx-auto"
                style={{ color: "#9ca3af" }}
              >
                {exp.description}
              </p>

              {expanded && (
                <div
                  className="mt-4 mx-auto max-w-lg rounded-2xl p-4 text-left"
                  style={{
                    background: `${exp.color}08`,
                    border: `1px solid ${exp.color}18`,
                  }}
                >
                  <p className="text-sm leading-7" style={{ color: "#9ca3af" }}>
                    {exp.expanded}
                  </p>
                </div>
              )}

              <button
                onClick={() => setExpanded((v) => !v)}
                className="mt-4 inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase font-mono"
                style={{
                  color: exp.color,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {expanded ? "Read Less" : "Read More"}
              </button>
            </div>

            <NavBtn color={exp.color} onClick={() => go("next")}>
              <polyline points="9 18 15 12 9 6" />
            </NavBtn>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {experiences.map((_, i) => (
              <button
                key={i}
                onClick={() => jumpTo(i)}
                style={{
                  borderRadius: 999,
                  height: 7,
                  width: i === current ? 24 : 7,
                  border: "none",
                  cursor: "pointer",
                  background:
                    i === current ? exp.color : "rgba(255,255,255,0.12)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

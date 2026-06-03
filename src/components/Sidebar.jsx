import { useEffect, useState } from "react";
import { getSkills, getTools } from "../service/api";
import avatarImg from "./MuhammadAlyan.jpg";

/* ─── Constants ──────────────────────────────────────────────────── */
const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&family=Fira+Code:wght@400;500&display=swap');
  .font-display { font-family: 'Cormorant Garamond', Georgia, serif !important; }
  .font-body    { font-family: 'DM Sans', sans-serif !important; }
  .font-mono    { font-family: 'Fira Code', monospace !important; }
`;

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/muhammadalyan",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/ANB-GROUP467",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:muhammadalyan23455@gmail.com",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
];

/* ─── Helpers ────────────────────────────────────────────────────── */
function groupByCategory(items) {
  return items.reduce((acc, item) => {
    const cat = item.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item.name);
    return acc;
  }, {});
}

/* ─── Section skeleton ───────────────────────────────────────────── */
function SkeletonChips() {
  return (
    <div className="flex flex-wrap gap-1.5">
      {[60, 80, 50, 70, 55].map((w, i) => (
        <div
          key={i}
          className="h-6 rounded-full bg-white/[0.05] animate-pulse"
          style={{ width: w }}
        />
      ))}
    </div>
  );
}

/* ─── Avatar ─────────────────────────────────────────────────────── */
function Avatar() {
  const [err, setErr] = useState(false);
  return (
    <div
      className="relative flex-shrink-0 mb-5"
      style={{ width: 96, height: 96 }}
    >
      {/* Gold ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, #b8975c, #e8c97a, #7c5220, #b8975c)",
          padding: 2,
          borderRadius: "50%",
        }}
      >
        <div className="w-full h-full rounded-full bg-[#0a0a12] overflow-hidden flex items-center justify-center">
          {!err ? (
            <img
              src={avatarImg}
              alt="Muhammad Alyan"
              className="w-full h-full object-cover object-top"
              onError={() => setErr(true)}
            />
          ) : (
            <span className="font-display text-2xl font-semibold text-amber-400/80">
              MA
            </span>
          )}
        </div>
      </div>
      {/* Online dot */}
      <span
        className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0a0a12]"
        style={{ boxShadow: "0 0 6px #34d399" }}
      />
    </div>
  );
}

/* ─── Section header ─────────────────────────────────────────────── */
function SectionHeader({ label }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-mono text-[9.5px] tracking-[2.5px] uppercase text-white/25 whitespace-nowrap">
        {label}
      </span>
      <div
        className="flex-1 h-px"
        style={{
          background:
            "linear-gradient(90deg, rgba(184,151,92,0.3), transparent)",
        }}
      />
    </div>
  );
}

/* ─── Category group ─────────────────────────────────────────────── */
function CategoryGroup({ category, items, chipStyle }) {
  return (
    <div className="mb-4">
      <p className="font-mono text-[9px] tracking-[1.8px] uppercase text-white/20 mb-2">
        {category}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((name) => (
          <span
            key={name}
            className={`font-body text-[11.5px] font-medium px-3 py-1 rounded-full border transition-all duration-150 cursor-default ${chipStyle}`}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Main sidebar content ───────────────────────────────────────── */
function SidebarContent() {
  const [skills, setSkills] = useState([]);
  const [tools, setTools] = useState([]);
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [loadingTools, setLoadingTools] = useState(true);

  useEffect(() => {
    getSkills()
      .then((d) => setSkills(Array.isArray(d) ? d : []))
      .catch(console.error)
      .finally(() => setLoadingSkills(false));

    getTools()
      .then((d) => setTools(Array.isArray(d) ? d : []))
      .catch(console.error)
      .finally(() => setLoadingTools(false));
  }, []);

  const groupedSkills = groupByCategory(skills);
  const groupedTools = groupByCategory(tools);

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-thin">
      {/* ── Profile block ── */}
      <div className="flex flex-col items-center pt-9 pb-6 px-6">
        <Avatar />

        <h1 className="font-display text-[22px] font-semibold text-white/90 text-center leading-tight tracking-wide mb-0.5">
          Muhammad Alyan
        </h1>
        <p className="font-mono text-[10px] tracking-[2px] uppercase text-white/30 mb-3">
          MERN Stack Developer
        </p>

        {/* Experience badge */}
        <div className="font-mono text-[10.5px] font-medium px-4 py-1.5 rounded-full border border-amber-700/30 bg-amber-700/10 text-amber-400/80 mb-5">
          1 yr+ experience
        </div>

        {/* Social icons */}
        <div className="flex gap-2">
          {socialLinks.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              title={label}
              target={label !== "Email" ? "_blank" : undefined}
              rel="noreferrer"
              className="w-9 h-9 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-white/35 hover:text-amber-400/90 hover:border-amber-600/30 hover:bg-amber-600/10 hover:-translate-y-0.5 transition-all duration-200"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Gold divider */}
      <div
        className="mx-6 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(184,151,92,0.4) 40%, rgba(232,201,122,0.5) 60%, transparent)",
        }}
      />

      {/* ── Skills ── */}
      <div className="px-6 pt-5 pb-2">
        <SectionHeader label="Skills & Expertise" />

        {loadingSkills ? (
          <SkeletonChips />
        ) : skills.length === 0 ? (
          <p className="font-body text-[12px] text-white/20">
            No skills found.
          </p>
        ) : (
          Object.entries(groupedSkills).map(([cat, items]) => (
            <CategoryGroup
              key={cat}
              category={cat}
              items={items}
              chipStyle="border-violet-500/20 bg-violet-500/8 text-violet-300/80 hover:border-violet-400/40 hover:text-violet-200"
            />
          ))
        )}
      </div>

      {/* Subtle divider */}
      <div className="mx-6 my-1 h-px bg-white/[0.05]" />

      {/* ── Tools & Platforms ── */}
      <div className="px-6 pt-4 pb-8">
        <SectionHeader label="Tools & Platforms" />

        {loadingTools ? (
          <SkeletonChips />
        ) : tools.length === 0 ? (
          <p className="font-body text-[12px] text-white/20">No tools found.</p>
        ) : (
          Object.entries(groupedTools).map(([cat, items]) => (
            <CategoryGroup
              key={cat}
              category={cat}
              items={items}
              chipStyle="border-violet-500/20 bg-violet-500/8 text-violet-300/80 hover:border-violet-400/40 hover:text-violet-200"
            />
          ))
        )}
      </div>
    </div>
  );
}

/* ─── Sidebar export ─────────────────────────────────────────────── */
export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{FONTS}</style>

      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex fixed left-0 top-0 h-screen w-[280px] lg:w-[300px] flex-col z-30"
        style={{
          background: "#08080f",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute top-0 left-0 w-full h-48 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(184,151,92,0.07) 0%, transparent 70%)",
          }}
        />

        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <header
        className="md:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between px-4 h-14"
        style={{
          background: "rgba(8,8,15,0.95)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center gap-3">
          {/* Mini avatar */}
          <div
            className="relative w-8 h-8 rounded-full flex-shrink-0"
            style={{
              background:
                "conic-gradient(from 0deg, #b8975c, #e8c97a, #7c5220, #b8975c)",
              padding: 1.5,
              borderRadius: "50%",
            }}
          >
            <div className="w-full h-full rounded-full bg-[#0a0a12] overflow-hidden">
              <img
                src={avatarImg}
                alt="Muhammad Alyan"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
          <div>
            <p className="font-display text-[14px] font-semibold text-white/85 leading-tight">
              Muhammad Alyan
            </p>
            <p className="font-mono text-[9px] tracking-widest uppercase text-amber-400/60">
              MERN · 1yr+
            </p>
          </div>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(true)}
          className="w-9 h-9 rounded-xl border border-white/[0.08] bg-white/[0.03] flex flex-col items-center justify-center gap-[5px] text-white/40 hover:text-amber-400/80 hover:border-amber-600/30 transition-all"
        >
          <span className="w-4 h-px bg-current" />
          <span className="w-4 h-px bg-current" />
          <span className="w-3 h-px bg-current self-start ml-[4px]" />
        </button>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Drawer panel */}
          <aside
            className="relative z-10 w-[285px] h-full flex flex-col"
            style={{
              background: "#08080f",
              borderRight: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-lg border border-white/[0.08] text-white/30 hover:text-white/70 hover:bg-white/[0.05] transition-all text-sm font-body z-10"
            >
              ✕
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}

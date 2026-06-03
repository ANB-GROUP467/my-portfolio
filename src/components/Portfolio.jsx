import { useEffect, useState } from "react";
import { getProjects } from "../service/api";

// ─── Accent palette ────────────────────────────────────────────────────────────

const ACCENTS = [
  "#a855f7",
  "#ec4899",
  "#6366f1",
  "#f59e0b",
  "#14b8a6",
  "#d946ef",
];

const GRADIENTS = {
  "#a855f7": ["#1a0533", "#3b0764"],
  "#ec4899": ["#2d0318", "#6b1239"],
  "#6366f1": ["#0f0e2e", "#1e1b5e"],
  "#f59e0b": ["#231200", "#5c2d00"],
  "#14b8a6": ["#011a19", "#053d39"],
  "#d946ef": ["#25022a", "#5b0a64"],
};

// ─── Screenshot URL builder ────────────────────────────────────────────────────
// Uses a free screenshot API to generate a preview image from a live URL.
// microlink.io is free, reliable, and needs no API key.

function getScreenshotUrl(liveUrl) {
  if (!liveUrl || liveUrl === "#") return null;
  // microlink screenshot API — free tier, no key needed
  return `https://api.microlink.io/?url=${encodeURIComponent(liveUrl)}&screenshot=true&meta=false&embed=screenshot.url`;
}

// ─── Image Preview ─────────────────────────────────────────────────────────────

function ProjectPreview({ project, accent, colors, height, hovered }) {
  const [imgError, setImgError] = useState(false);

  const link = project.link || project.url || "#";

  // Priority: project.image field → live screenshot from link → fallback placeholder
  const manualSrc = project.image?.trim();
  const hasManualImage =
    manualSrc &&
    (manualSrc.startsWith("http") ||
      manualSrc.startsWith("/") ||
      manualSrc.match(/\.(png|jpe?g|gif|webp|svg|avif)$/i));

  const screenshotSrc = !hasManualImage ? getScreenshotUrl(link) : null;

  // Which src to actually render
  const activeSrc = hasManualImage ? manualSrc : screenshotSrc;
  const hasImage = activeSrc && !imgError;

  return (
    <div className="relative overflow-hidden" style={{ height }}>
      {hasImage ? (
        <img
          src={activeSrc}
          alt={project.title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-top"
          style={{ display: "block" }}
        />
      ) : (
        /* ── Stylised fallback ── */
        <div
          className="w-full h-full flex flex-col items-center justify-center gap-3 px-6 text-center select-none"
          style={{
            background: `linear-gradient(135deg,${colors[0]},${colors[1]})`,
          }}
        >
          {/* Decorative ring */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden
          >
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                border: `1px solid ${accent}30`,
                boxShadow: `0 0 60px ${accent}20`,
              }}
            />
          </div>

          {/* Initials badge */}
          <span
            className="relative z-10 flex items-center justify-center rounded-2xl font-black text-2xl"
            style={{
              width: 56,
              height: 56,
              background: `${accent}25`,
              border: `1px solid ${accent}50`,
              color: accent,
              letterSpacing: "-0.03em",
            }}
          >
            {project.title?.[0]?.toUpperCase() ?? "P"}
          </span>
          <p
            className="relative z-10 text-xs font-semibold tracking-widest uppercase"
            style={{ color: `${accent}90` }}
          >
            No Preview
          </p>
        </div>
      )}

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
        style={{
          background: `linear-gradient(to top,${colors[0]}f0,transparent)`,
        }}
      />

      {/* Hover overlay with CTA */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.72)",
          backdropFilter: "blur(2px)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          pointerEvents: hovered ? "auto" : "none",
        }}
      >
        {link !== "#" && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2 rounded-xl text-sm font-bold transition-transform active:scale-95"
            style={{
              background: accent,
              color: "#fff",
              boxShadow: `0 0 20px ${accent}60`,
            }}
          >
            Live Demo ↗
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({ project, large, index }) {
  const [hovered, setHovered] = useState(false);

  const accent = project.accent || ACCENTS[index % ACCENTS.length];
  const colors = GRADIENTS[accent] || ["#0f0f1a", "#1a1a2e"];
  const technologies = project.technologies || project.tags || [];

  const previewH = large
    ? "clamp(160px,28vw,240px)"
    : "clamp(130px,20vw,180px)";

  return (
    <article
      className="relative rounded-2xl overflow-hidden h-full flex flex-col"
      style={{
        background: `linear-gradient(145deg,${colors[0]},${colors[1]})`,
        border: hovered
          ? `1px solid ${accent}55`
          : "1px solid rgba(255,255,255,0.07)",
        transition:
          "border-color 0.28s ease, box-shadow 0.28s ease, transform 0.28s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 16px 48px ${accent}30, 0 0 0 1px ${accent}20`
          : "0 4px 16px rgba(0,0,0,0.25)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Featured badge */}
      {index === 0 && (
        <span
          className="absolute top-3 left-3 z-20 text-xs font-bold px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(15,5,30,0.85)",
            color: "#e879f9",
            border: "1px solid rgba(168,85,247,0.45)",
            backdropFilter: "blur(10px)",
          }}
        >
          ✦ Featured
        </span>
      )}

      {/* ── Image / Preview ── */}
      <ProjectPreview
        project={project}
        accent={accent}
        colors={colors}
        height={previewH}
        hovered={hovered}
      />

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-5 gap-2.5">
        <h3
          className="font-bold text-white leading-tight"
          style={{
            fontSize: "clamp(1rem,2.5vw,1.3rem)",
            letterSpacing: "-0.01em",
          }}
        >
          {project.title}
        </h3>

        {project.description && (
          <p
            className="text-sm leading-relaxed line-clamp-3 flex-1"
            style={{ color: "#9ca3af" }}
          >
            {project.description}
          </p>
        )}

        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {technologies.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-md font-semibold"
                style={{
                  background: `${accent}18`,
                  color: accent,
                  border: `1px solid ${accent}35`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────

function SkeletonCard({ large }) {
  return (
    <div
      className="rounded-2xl overflow-hidden animate-pulse"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.06)",
        height: large ? 360 : 280,
      }}
    >
      <div
        style={{
          height: large ? 220 : 160,
          background: "rgba(255,255,255,0.05)",
        }}
      />
      <div className="p-5 space-y-3">
        <div className="h-4 w-2/3 rounded-full bg-white/10" />
        <div className="h-3 w-full rounded-full bg-white/6" />
        <div className="h-3 w-5/6 rounded-full bg-white/6" />
      </div>
    </div>
  );
}

// ─── Portfolio Section ────────────────────────────────────────────────────────

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      {/* Heading */}
      <div className="mb-8 animate-fade-up">
        <h2
          className="font-display section-title-line"
          style={{
            fontSize: "clamp(2rem,6vw,2.8rem)",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.02em",
          }}
        >
          Portfolio
        </h2>
        <p className="mt-3 text-sm" style={{ color: "#6b7280" }}>
          Built many projects — here's a sneak peek of some!
        </p>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <div className="sm:col-span-2">
            <SkeletonCard large />
          </div>
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : projects.length === 0 ? (
        <div
          className="rounded-2xl flex flex-col items-center justify-center gap-3 py-20"
          style={{
            border: "1px dashed rgba(255,255,255,0.1)",
            color: "#4b5563",
          }}
        >
          <span className="text-4xl">📦</span>
          <p className="text-sm font-medium">No projects added yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {projects.map((p, i) => (
            <div
              key={p.id}
              className={`animate-fade-up ${i === 0 ? "sm:col-span-2" : ""}`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <ProjectCard project={p} large={i === 0} index={i} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

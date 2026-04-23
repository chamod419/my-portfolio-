import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import Reveal from "../components/Reveal";
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";
import projects from "../data/projects";

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

const categoryAccents = {
  "AI / Full Stack":   { gradient: "from-cyan-400 to-blue-500",    glow: "rgba(34,211,238,0.18)",   badge: "bg-cyan-400/15 border-cyan-400/25 text-cyan-300" },
  "Full Stack":        { gradient: "from-violet-400 to-fuchsia-500", glow: "rgba(167,139,250,0.18)", badge: "bg-violet-400/15 border-violet-400/25 text-violet-300" },
  "Business System":   { gradient: "from-emerald-400 to-cyan-500",  glow: "rgba(52,211,153,0.18)",  badge: "bg-emerald-400/15 border-emerald-400/25 text-emerald-300" },
  "Enterprise App":    { gradient: "from-orange-400 to-amber-500",  glow: "rgba(251,146,60,0.18)",  badge: "bg-orange-400/15 border-orange-400/25 text-orange-300" },
  "Web Application":   { gradient: "from-blue-400 to-indigo-500",   glow: "rgba(96,165,250,0.18)",  badge: "bg-blue-400/15 border-blue-400/25 text-blue-300" },
  "Machine Learning":  { gradient: "from-pink-400 to-rose-500",     glow: "rgba(244,114,182,0.18)", badge: "bg-pink-400/15 border-pink-400/25 text-pink-300" },
};

const fallback = {
  gradient: "from-cyan-400 to-blue-500",
  glow: "rgba(34,211,238,0.15)",
  badge: "bg-cyan-400/15 border-cyan-400/25 text-cyan-300",
};

function getAccent(category) {
  return categoryAccents[category] || fallback;
}

const hasValidLink = (link) => Boolean(link && link.trim() && !link.includes("PASTE_"));

// 3D Tilt Card
function ProjectCard({ project, isDark, index }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springX = useSpring(rx, { stiffness: 220, damping: 22 });
  const springY = useSpring(ry, { stiffness: 220, damping: 22 });
  const [hovered, setHovered] = useState(false);

  const accent = getAccent(project.category);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rx.set(-((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 8);
    ry.set(((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 8);
  };
  const onLeave = () => { rx.set(0); ry.set(0); setHovered(false); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={() => setHovered(true)}
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d", perspective: 900 }}
      whileHover={{ y: -12, z: 30 }}
      transition={{ duration: 0.28 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] shadow-xl transition-shadow duration-300 ${
        isDark
          ? "border border-white/8 bg-white/[0.03]"
          : "border border-slate-200 bg-white"
      }`}
      style={{
        boxShadow: hovered
          ? isDark
            ? `0 24px 60px rgba(0,0,0,0.55), 0 0 40px ${accent.glow}`
            : `0 24px 60px rgba(0,0,0,0.13), 0 0 30px ${accent.glow}`
          : isDark
          ? "0 8px 32px rgba(0,0,0,0.4)"
          : "0 8px 32px rgba(0,0,0,0.07)",
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Top accent gradient bar */}
      <div className={`absolute inset-x-0 top-0 z-10 h-0.5 bg-gradient-to-r ${accent.gradient} opacity-0 transition-opacity duration-400 group-hover:opacity-100`} />

      {/* Inner glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${accent.glow} 0%, transparent 55%)` }}
      />

      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: "210px" }}>
        <motion.img
          src={project.image}
          alt={project.title}
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full w-full object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

        {/* Category badge */}
        <div className="absolute left-4 top-4">
          <motion.span
            initial={{ opacity: 0, scale: 0.8, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className={`rounded-xl border px-3 py-1.5 text-xs font-bold backdrop-blur-md ${accent.badge}`}
          >
            {project.category}
          </motion.span>
        </div>

        {/* Hover overlay with links */}
        <AnimatePresence>
          {hovered && (hasValidLink(project.github) || hasValidLink(project.live)) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 backdrop-blur-sm"
            >
              {hasValidLink(project.github) && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ scale: 0.7, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-bold text-white backdrop-blur-md border border-white/20 hover:bg-white/25 transition"
                >
                  <FaGithub /> Code
                </motion.a>
              )}
              {hasValidLink(project.live) && (
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ scale: 0.7, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                  className={`flex items-center gap-2 rounded-xl bg-gradient-to-r ${accent.gradient} px-4 py-2.5 text-sm font-bold text-white shadow-lg transition hover:opacity-90`}
                >
                  <FaExternalLinkAlt /> Live
                </motion.a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className={`text-lg font-black leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>
            {project.title}
          </h3>
          <motion.div
            animate={{ x: hovered ? 4 : 0, y: hovered ? -4 : 0 }}
            transition={{ duration: 0.2 }}
            className={`shrink-0 mt-0.5 ${isDark ? "text-gray-600 group-hover:text-cyan-400" : "text-slate-300 group-hover:text-cyan-500"} transition-colors duration-300`}
          >
            <FaArrowRight className="text-sm" />
          </motion.div>
        </div>

        <p className={`mt-3 flex-1 text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-slate-500"}`}>
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((item, i) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.08, y: -2 }}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                isDark
                  ? "border border-white/8 bg-white/5 text-gray-300 hover:border-cyan-400/25 hover:bg-cyan-400/8 hover:text-cyan-300"
                  : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-600"
              }`}
            >
              {item}
            </motion.span>
          ))}
        </div>

        {/* Bottom links bar */}
        {(hasValidLink(project.github) || hasValidLink(project.live)) && (
          <div className={`mt-5 flex flex-wrap gap-2 border-t pt-5 ${isDark ? "border-white/6" : "border-slate-100"}`}>
            {hasValidLink(project.github) && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -2 }}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                  isDark
                    ? "border border-white/8 bg-white/5 text-gray-300 hover:border-white/15 hover:bg-white/10"
                    : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <FaGithub className="text-base" /> View Code
              </motion.a>
            )}
            {hasValidLink(project.live) && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -2, scale: 1.03 }}
                className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r ${accent.gradient} px-4 py-2 text-xs font-bold text-white shadow-md transition hover:opacity-90`}
              >
                <FaExternalLinkAlt className="text-xs" /> Live Demo
              </motion.a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function Projects({ theme }) {
  const isDark = theme === "dark";
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="relative overflow-hidden px-6 py-28 md:px-10">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.09, 0.04] }}
          transition={{ duration: 9, repeat: Infinity }}
          className="absolute -left-40 top-24 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 11, repeat: Infinity, delay: 3 }}
          className="absolute -right-40 bottom-20 h-[450px] w-[450px] rounded-full bg-fuchsia-500/10 blur-[100px]"
        />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(34,211,238,1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,1) 1px, transparent 1px)`,
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <SectionTitle title="Featured Projects" subtitle="My Work" theme={theme} />

        {/* Category filter */}
        <Reveal>
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const accent = cat === "All" ? null : getAccent(cat);
              return (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  whileHover={{ y: -2, scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={`relative overflow-hidden rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-250 ${
                    isActive
                      ? accent
                        ? `bg-gradient-to-r ${accent.gradient} text-white shadow-lg`
                        : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
                      : isDark
                      ? "border border-white/8 bg-white/5 text-gray-400 hover:border-white/15 hover:text-white"
                      : "border border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-800"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </motion.button>
              );
            })}
          </div>
        </Reveal>

        {/* Projects grid */}
        <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.88, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={project} isDark={isDark} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="py-24 text-center"
            >
              <p className={`text-lg font-semibold ${isDark ? "text-gray-500" : "text-slate-400"}`}>
                No projects in this category yet.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats bar */}
        <Reveal delay={0.2}>
          <motion.div
            className={`mt-14 flex flex-wrap items-center justify-center gap-6 rounded-[24px] border p-7 ${
              isDark ? "border-white/8 bg-white/[0.03]" : "border-slate-200 bg-white"
            }`}
            style={{
              boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)" : "0 8px 32px rgba(0,0,0,0.05)",
            }}
          >
            {[
              { value: `${projects.length}`, label: "Total Projects" },
              { value: Array.from(new Set(projects.flatMap((p) => p.tech))).length + "+", label: "Technologies Used" },
              { value: Array.from(new Set(projects.map((p) => p.category))).length + "", label: "Categories" },
              { value: projects.filter((p) => hasValidLink(p.live)).length + "", label: "Live Demos" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex flex-col items-center gap-1 px-6"
              >
                <span className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? "text-gray-500" : "text-slate-400"}`}>
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

export default Projects;
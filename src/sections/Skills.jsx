import { motion, useMotionValue, useSpring } from "framer-motion";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import { useRef } from "react";
import {
  FaReact, FaServer, FaDatabase, FaGitAlt,
  FaCode, FaJava, FaLaptopCode, FaPalette,
  FaCogs, FaArrowRight,
} from "react-icons/fa";

// 3D tilt on individual skill cards
function SkillCard3D({ children, isDark, card }) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const rx = useSpring(rotateX, { stiffness: 250, damping: 25 });
  const ry = useSpring(rotateY, { stiffness: 250, damping: 25 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotateX.set(-((e.clientY - cy) / (rect.height / 2)) * 7);
    rotateY.set(((e.clientX - cx) / (rect.width / 2)) * 7);
  };
  const onLeave = () => { rotateX.set(0); rotateY.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 800 }}
      whileHover={{ y: -8, z: 20 }}
      transition={{ duration: 0.25 }}
      className={`group relative overflow-hidden rounded-[30px] p-7 shadow-xl transition-all duration-300 ${
        isDark
          ? "border border-white/8 bg-white/[0.03] hover:border-white/15"
          : "border border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      {/* Top accent */}
      <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${card.accent}`} />

      {/* Hover inner glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[30px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(ellipse at 20% 20%, ${card.glow} 0%, transparent 55%)` }}
      />

      {children}
    </motion.div>
  );
}

function Skills({ theme }) {
  const isDark = theme === "dark";

  const marqueeItems = [
    "React", "JavaScript", "ASP.NET", "C#", "Java", "MongoDB",
    "MySQL", "PostgreSQL", "Git", "GitHub", "UI Design", "Responsive Design",
    "Tailwind CSS", "HTML", "CSS", "PHP",
  ];

  const skillCards = [
    {
      title: "Frontend Craft",
      icon: FaReact,
      description: "Modern responsive interfaces with strong focus on usability, clean structure, and polished interaction.",
      items: ["React", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
      accent: "from-cyan-400 to-blue-500",
      glow: "rgba(34,211,238,0.1)",
    },
    {
      title: "Backend Logic",
      icon: FaServer,
      description: "Practical backend workflows, system logic, and real-world development experience for useful applications.",
      items: ["ASP.NET", "C#", "PHP", "Python", "Node.js"],
      accent: "from-violet-400 to-fuchsia-500",
      glow: "rgba(167,139,250,0.1)",
    },
    {
      title: "Database Skills",
      icon: FaDatabase,
      description: "Working with structured data and database integration for scalable and practical project functionality.",
      items: ["MongoDB", "MySQL", "PostgreSQL", "SQL"],
      accent: "from-emerald-400 to-cyan-500",
      glow: "rgba(52,211,153,0.1)",
    },
    {
      title: "Tools & Workflow",
      icon: FaGitAlt,
      description: "Using professional tools and version control to build clean, manageable, and collaborative projects.",
      items: ["Git", "GitHub", "VS Code", "Apache Tomcat"],
      accent: "from-orange-400 to-red-500",
      glow: "rgba(251,146,60,0.1)",
    },
  ];

  const statCards = [
    { label: "Core Technologies", value: "12+", icon: FaLaptopCode, accent: "from-cyan-400 to-blue-500" },
    { label: "Project-Focused Stack", value: "Full Stack", icon: FaCogs, accent: "from-violet-400 to-fuchsia-500" },
    { label: "UI Mindset", value: "Clean & Modern", icon: FaPalette, accent: "from-emerald-400 to-cyan-500" },
    { label: "Java Experience", value: "Tomcat + MongoDB", icon: FaJava, accent: "from-orange-400 to-red-500" },
  ];

  const strengths = [
    { label: "Responsive UI Development", level: 90 },
    { label: "Clean Component Structure", level: 88 },
    { label: "Real-World Project Experience", level: 82 },
    { label: "Database Integration", level: 80 },
    { label: "Problem Solving", level: 85 },
    { label: "Modern Web Design", level: 87 },
  ];

  return (
    <section id="skills" className="relative overflow-hidden px-6 py-28 md:px-10">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute -right-40 top-36 h-[450px] w-[450px] rounded-full bg-fuchsia-500/10 blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.07, 0.03] }}
          transition={{ duration: 12, repeat: Infinity, delay: 4 }}
          className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[80px]"
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <SectionTitle title="Skills" subtitle="What I Work With" theme={theme} />

        {/* Marquee */}
        <Reveal>
          <div className="mb-10 overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="flex w-[200%] gap-3"
            >
              {[...marqueeItems, ...marqueeItems].map((item, index) => (
                <motion.div
                  key={`${item}-${index}`}
                  whileHover={{ y: -3, scale: 1.05 }}
                  className={`shrink-0 rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                    isDark
                      ? "border-white/8 bg-white/[0.03] text-gray-300 hover:border-cyan-400/30 hover:bg-cyan-400/8 hover:text-cyan-300"
                      : "border-slate-200 bg-white text-slate-600 hover:border-cyan-300 hover:text-cyan-600"
                  }`}
                >
                  {item}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Reveal>

        {/* Main grid */}
        <div className="grid gap-8 xl:grid-cols-[1fr_1.6fr]">
          {/* Left panel */}
          <Reveal>
            <motion.div
              whileHover={{ y: -4 }}
              className={`relative overflow-hidden rounded-[32px] p-8 md:p-10 shadow-xl ${
                isDark
                  ? "border border-white/8 bg-white/[0.03] backdrop-blur-xl"
                  : "border border-slate-200 bg-white"
              }`}
              style={{
                boxShadow: isDark
                  ? "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)"
                  : "0 20px 60px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="mb-6 inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/8 px-4 py-2 text-sm font-semibold text-cyan-400"
              >
                <FaCode className="text-xs" />
                Skill Overview
              </motion.div>

              <h3 className={`text-2xl font-black leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                Design thinking,{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  frontend polish
                </span>
                , backend structure & database work.
              </h3>

              <p className={`mt-4 text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                I focus on building software that is attractive, responsive,
                usable, and technically structured — turning ideas into complete working products.
              </p>

              {/* Stat cards */}
              <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                {statCards.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                      whileHover={{ x: 5 }}
                      className={`group flex items-center gap-4 rounded-2xl p-4 transition-all ${
                        isDark
                          ? "border border-white/6 bg-[#060d1f]/80 hover:border-white/12"
                          : "border border-slate-100 bg-slate-50 hover:border-slate-200"
                      }`}
                    >
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.accent}`}>
                        <Icon className="text-sm text-white" />
                      </div>
                      <div>
                        <p className={`text-xs font-medium ${isDark ? "text-gray-500" : "text-slate-400"}`}>{item.label}</p>
                        <h4 className={`mt-0.5 font-black ${isDark ? "text-white" : "text-slate-900"}`}>{item.value}</h4>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className={`mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/8 p-5`}>
                <p className={`text-sm leading-relaxed ${isDark ? "text-gray-300" : "text-slate-600"}`}>
                  My goal is not only to write code, but to build products that feel{" "}
                  <span className="font-semibold text-cyan-400">professional, smooth, and useful</span> to real users.
                </p>
              </div>
            </motion.div>
          </Reveal>

          {/* Right — skill cards grid */}
          <div className="grid gap-5 md:grid-cols-2">
            {skillCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.title} delay={index * 0.08}>
                  <SkillCard3D isDark={isDark} card={card}>
                    <div className="flex items-start justify-between gap-4">
                      <div className={`flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br ${card.accent} p-3 shadow-lg`}>
                        <Icon className="text-xl text-white" />
                      </div>
                      <motion.div whileHover={{ x: 4, y: -2 }} className="mt-1">
                        <FaArrowRight className="text-cyan-400 opacity-60" />
                      </motion.div>
                    </div>

                    <h3 className={`mt-5 text-xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                      {card.title}
                    </h3>

                    <p className={`mt-2 text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                      {card.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {card.items.map((item) => (
                        <motion.span
                          key={item}
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
                  </SkillCard3D>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Strengths with animated bars */}
        <Reveal delay={0.15}>
          <motion.div
            className={`mt-8 rounded-[30px] p-8 md:p-10 shadow-xl ${
              isDark
                ? "border border-white/8 bg-white/[0.03] backdrop-blur-xl"
                : "border border-slate-200 bg-white"
            }`}
            style={{
              boxShadow: isDark
                ? "0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)"
                : "0 20px 60px rgba(0,0,0,0.06)",
            }}
          >
            <div className="absolute inset-x-0 top-0 h-px rounded-t-[30px] bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />

            <h3 className={`text-2xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
              What I bring to projects
            </h3>

            <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {strengths.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  whileHover={{ scale: 1.02, y: -3 }}
                  className={`group relative overflow-hidden rounded-2xl p-5 transition-all ${
                    isDark
                      ? "border border-white/6 bg-[#060d1f]/80 hover:border-white/12"
                      : "border border-slate-100 bg-slate-50 hover:border-slate-200"
                  }`}
                >
                  <p className={`text-sm font-bold ${isDark ? "text-gray-200" : "text-slate-700"}`}>
                    {item.label}
                  </p>

                  {/* Animated progress bar */}
                  <div className={`mt-3 h-1.5 w-full overflow-hidden rounded-full ${isDark ? "bg-white/8" : "bg-slate-200"}`}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.08 + 0.3, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                    />
                  </div>
                  <p className="mt-1.5 text-right text-xs font-semibold text-cyan-400">{item.level}%</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

export default Skills;
import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import Reveal from "../components/Reveal";
import { FaBriefcase, FaMapMarkerAlt, FaCalendar } from "react-icons/fa";

function Experience({ theme }) {
  const isDark = theme === "dark";

  const experiences = [
    {
      role: "Junior Software Developer",
      company: "Nawaloka Hospital Negombo",
      period: "Mar 2026 – Present",
      type: "On-site",
      accent: "from-cyan-400 to-blue-500",
      glow: "rgba(34,211,238,0.12)",
      dotColor: "bg-cyan-400",
      shadowColor: "shadow-cyan-500/20",
      points: [
        "Contributing to software development tasks in a real-world healthcare environment.",
        "Working with technical solutions that support operational workflows.",
        "Continuing to strengthen practical development and problem-solving skills.",
      ],
    },
    {
      role: "Founder / Freelance Software Developer",
      company: "CMNexa",
      period: "2026 – Present",
      type: "Freelance / Remote",
      accent: "from-violet-400 to-fuchsia-500",
      glow: "rgba(167,139,250,0.12)",
      dotColor: "bg-violet-400",
      shadowColor: "shadow-violet-500/20",
      points: [
        "Building software solutions under my own brand, CMNexa.",
        "Working on freelance projects for clients based on their business needs.",
        "Designing and developing modern web applications with practical functionality and clean UI.",
        "Managing project communication, development workflow, and delivery independently.",
      ],
    },
    {
      role: "Software Engineer Intern",
      company: "Ascylla",
      period: "Jan 2026 – Present",
      type: "Remote",
      accent: "from-emerald-400 to-cyan-500",
      glow: "rgba(52,211,153,0.12)",
      dotColor: "bg-emerald-400",
      shadowColor: "shadow-emerald-500/20",
      points: [
        "Gained exposure to software engineering workflows in a remote work setting.",
        "Improved development knowledge through practical collaboration and engineering tasks.",
        "Strengthened understanding of professional software development practices.",
      ],
    },
    {
      role: "Information Technology Trainee",
      company: "Nawaloka Hospital",
      period: "Mar 2025 – Mar 2026",
      type: "Full-time",
      accent: "from-orange-400 to-pink-500",
      glow: "rgba(251,146,60,0.12)",
      dotColor: "bg-orange-400",
      shadowColor: "shadow-orange-500/20",
      points: [
        "Supported IT operations and troubleshooting in a professional environment.",
        "Assisted with technical issues, system support, and day-to-day IT tasks.",
        "Built a stronger foundation in communication, support workflows, and technical problem solving.",
      ],
    },
  ];

  return (
    <section id="experience" className="relative overflow-hidden px-6 py-28 md:px-10">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.09, 0.04] }}
          transition={{ duration: 9, repeat: Infinity }}
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[120px]"
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <SectionTitle title="Experience" subtitle="My Journey" theme={theme} />

        <div className="relative mx-auto max-w-4xl">
          {/* Timeline spine */}
          <div className="absolute left-6 top-8 hidden h-[calc(100%-60px)] w-px md:block">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full w-full origin-top bg-gradient-to-b from-cyan-400/60 via-violet-400/40 to-transparent"
            />
          </div>

          <div className="space-y-6">
            {experiences.map((item, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="relative md:pl-20">
                  {/* Timeline node */}
                  <div className="absolute left-0 top-8 hidden md:flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.2, type: "spring" }}
                      className={`relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} shadow-lg ${item.shadowColor}`}
                    >
                      <FaBriefcase className="text-sm text-white" />
                      {/* Pulse ring */}
                      <motion.div
                        animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.accent} opacity-40`}
                      />
                    </motion.div>
                  </div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -5, x: 3 }}
                    transition={{ duration: 0.25 }}
                    className={`group relative overflow-hidden rounded-[28px] p-7 transition-all duration-300 ${
                      isDark
                        ? "border border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.05]"
                        : "border border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg"
                    }`}
                    style={{
                      boxShadow: isDark
                        ? `0 8px 32px rgba(0,0,0,0.4), 0 0 0 0 ${item.glow}`
                        : `0 8px 32px rgba(0,0,0,0.07)`,
                    }}
                  >
                    {/* Top accent bar */}
                    <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${item.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                    {/* Inner glow on hover */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{ background: `radial-gradient(circle at 30% 30%, ${item.glow} 0%, transparent 60%)` }}
                    />

                    <div className="relative">
                      {/* Header */}
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className={`text-xl font-black leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                            {item.role}
                          </h3>
                          <p className={`mt-1 font-bold bg-gradient-to-r ${item.accent} bg-clip-text text-transparent`}>
                            {item.company}
                          </p>
                        </div>

                        <div className="flex flex-row gap-2 sm:flex-col sm:items-end sm:gap-1.5">
                          <span className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold ${
                            isDark ? "border border-white/10 bg-white/5 text-gray-300" : "border border-slate-200 bg-slate-50 text-slate-600"
                          }`}>
                            <FaCalendar className="opacity-60" />
                            {item.period}
                          </span>
                          <span className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold ${
                            isDark ? "border border-white/10 bg-white/5 text-gray-400" : "border border-slate-200 bg-slate-50 text-slate-500"
                          }`}>
                            <FaMapMarkerAlt className="opacity-60" />
                            {item.type}
                          </span>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className={`my-5 h-px ${isDark ? "bg-white/6" : "bg-slate-100"}`} />

                      {/* Points */}
                      <div className="space-y-3">
                        {item.points.map((point, pIndex) => (
                          <motion.div
                            key={pIndex}
                            initial={{ opacity: 0, x: -12 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: pIndex * 0.06 + 0.2 }}
                            className="flex items-start gap-3"
                          >
                            <div className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br ${item.accent}`} />
                            <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                              {point}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
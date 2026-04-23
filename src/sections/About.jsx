import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import Reveal from "../components/Reveal";
import { FaCode, FaRocket, FaHeart, FaGraduationCap } from "react-icons/fa";

function About({ theme }) {
  const isDark = theme === "dark";

  const highlights = [
    {
      icon: FaCode,
      title: "Junior Software Developer",
      desc: "Real-world experience in software development with hands-on project delivery.",
      accent: "from-cyan-400 to-blue-500",
      glow: "rgba(34,211,238,0.15)",
    },
    {
      icon: FaGraduationCap,
      title: "Software Engineering Undergraduate",
      desc: "Building strong academic foundations alongside practical industry experience.",
      accent: "from-violet-400 to-fuchsia-500",
      glow: "rgba(167,139,250,0.15)",
    },
    {
      icon: FaRocket,
      title: "React · ASP.NET · C# · JS · SQL",
      desc: "Focused stack for building full-featured, performant web applications end-to-end.",
      accent: "from-emerald-400 to-cyan-500",
      glow: "rgba(52,211,153,0.15)",
    },
    {
      icon: FaHeart,
      title: "Clean & User-Friendly Products",
      desc: "Passionate about polished UI, smooth interactions, and meaningful digital experiences.",
      accent: "from-orange-400 to-pink-500",
      glow: "rgba(251,146,60,0.15)",
    },
  ];

  return (
    <section id="about" className="relative overflow-hidden px-6 py-28 md:px-10">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute -left-40 bottom-20 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[100px]"
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <SectionTitle title="About Me" subtitle="Introduction" theme={theme} />

        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left — Bio card */}
          <Reveal>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className={`group relative overflow-hidden rounded-[32px] p-9 shadow-xl ${
                isDark
                  ? "border border-white/10 bg-white/[0.04] backdrop-blur-xl"
                  : "border border-slate-200 bg-white"
              }`}
              style={{
                boxShadow: isDark
                  ? "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)"
                  : "0 20px 60px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              {/* Top gradient line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-br from-cyan-400/0 to-blue-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-[0.04]" />

              <div className="relative">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mb-6 inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-400"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  Who I Am
                </motion.div>

                <h3 className={`text-2xl font-black leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                  Turning ideas into{" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    polished products
                  </span>
                </h3>

                <p className={`mt-5 text-base leading-relaxed ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                  I am Chamod Madhusanka, a motivated Software Engineering
                  undergraduate with practical experience in software development,
                  problem solving, and real-world technical environments.
                </p>

                <p className={`mt-4 text-base leading-relaxed ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                  I enjoy building modern web applications that are responsive,
                  clean, and user-friendly. My goal is to grow as a professional
                  software developer while contributing to meaningful products and
                  impactful teams.
                </p>

                {/* Decorative code block */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className={`mt-7 rounded-2xl p-5 font-mono text-sm ${
                    isDark ? "border border-white/8 bg-[#060d1f]" : "border border-slate-100 bg-slate-50"
                  }`}
                >
                  <p className={isDark ? "text-gray-500" : "text-slate-400"}>
                    <span className="text-violet-400">const</span>{" "}
                    <span className="text-cyan-400">chamod</span>{" "}
                    <span className={isDark ? "text-gray-400" : "text-slate-500"}>=</span>{" "}
                    <span className={isDark ? "text-gray-400" : "text-slate-500"}>{"{"}</span>
                  </p>
                  <p className={`ml-4 ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                    <span className="text-blue-400">role</span>:{" "}
                    <span className="text-emerald-400">"Junior Developer"</span>,
                  </p>
                  <p className={`ml-4 ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                    <span className="text-blue-400">passion</span>:{" "}
                    <span className="text-emerald-400">"Clean UI & Great UX"</span>,
                  </p>
                  <p className={`ml-4 ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                    <span className="text-blue-400">status</span>:{" "}
                    <span className="text-cyan-400">openToWork</span>
                  </p>
                  <p className={isDark ? "text-gray-400" : "text-slate-500"}>{"}"}</p>
                </motion.div>
              </div>
            </motion.div>
          </Reveal>

          {/* Right — Highlight cards */}
          <Reveal delay={0.15}>
            <div className="grid gap-4">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ x: 6, y: -2 }}
                    className={`group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 ${
                      isDark
                        ? "border border-white/8 bg-white/[0.03] hover:border-white/15"
                        : "border border-slate-200 bg-white hover:border-slate-300"
                    }`}
                    style={{
                      boxShadow: `0 4px 24px ${item.glow}`,
                    }}
                  >
                    <div className={`absolute inset-y-0 left-0 w-0.5 rounded-full bg-gradient-to-b ${item.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                    <div className="flex items-start gap-4">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} shadow-lg`}>
                        <Icon className="text-base text-white" />
                      </div>
                      <div>
                        <h4 className={`font-bold leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                          {item.title}
                        </h4>
                        <p className={`mt-1.5 text-sm leading-6 ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default About;
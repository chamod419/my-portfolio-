import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaArrowRight } from "react-icons/fa";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 35 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const roles = [
  "React Developer",
  "ASP.NET Developer",
  "Frontend Enthusiast",
  "Problem Solver",
];

function Hero({ theme }) {
  const isDark = theme === "dark";

  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting && text.length < currentRole.length) {
      timeout = setTimeout(() => {
        setText(currentRole.slice(0, text.length + 1));
      }, 90);
    } else if (!isDeleting && text.length === currentRole.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1200);
    } else if (isDeleting && text.length > 0) {
      timeout = setTimeout(() => {
        setText(currentRole.slice(0, text.length - 1));
      }, 45);
    } else if (isDeleting && text.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden px-6 pt-28 md:px-10"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-100px] top-28 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-[-80px] top-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-10 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-112px)] max-w-7xl items-center gap-14 md:grid-cols-2">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative z-10"
        >
          <motion.div
            variants={itemVariants}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300"
          >
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            Open to Opportunities
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-400"
          >
            Junior Software Developer
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className={`max-w-3xl text-5xl font-extrabold leading-tight md:text-7xl ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Hi, I’m Chamod Madhusanka
          </motion.h1>

          <motion.div variants={itemVariants} className="mt-5 h-10">
            <p className="text-xl font-semibold text-cyan-400 md:text-2xl">
              {text}
              <span className="ml-1 animate-pulse">|</span>
            </p>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className={`mt-4 max-w-2xl text-lg leading-9 ${
              isDark ? "text-gray-300" : "text-slate-600"
            }`}
          >
            Software Engineering undergraduate focused on building modern,
            responsive, and user-friendly web applications using React,
            ASP.NET, C#, JavaScript, and SQL.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-7 py-3.5 font-semibold text-white transition duration-300 hover:scale-105 hover:bg-cyan-400"
            >
              View Projects
              <FaArrowRight />
            </a>

            <a
              href="/Chamod-Madhusanka-CV.pdf"
              className={`rounded-full px-7 py-3.5 font-semibold transition duration-300 hover:scale-105 ${
                isDark
                  ? "border border-white/20 bg-white/5 text-white hover:bg-white/10"
                  : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-100"
              }`}
            >
              Download CV
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="https://github.com/chamod419"
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition duration-300 hover:-translate-y-1 ${
                isDark
                  ? "border border-white/10 bg-white/5 text-gray-200 hover:bg-white/10"
                  : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              <FaGithub />
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/chamod-madhusanka/"
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition duration-300 hover:-translate-y-1 ${
                isDark
                  ? "border border-white/10 bg-white/5 text-gray-200 hover:bg-white/10"
                  : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              <FaLinkedin />
              LinkedIn
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap gap-4"
          >
            <div
              className={`rounded-2xl px-5 py-4 ${
                isDark
                  ? "border border-white/10 bg-white/5"
                  : "border border-slate-300 bg-white"
              }`}
            >
              <p className="text-sm text-cyan-400">Experience</p>
              <h3
                className={`mt-1 text-2xl font-bold ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Real-World
              </h3>
            </div>

            <div
              className={`rounded-2xl px-5 py-4 ${
                isDark
                  ? "border border-white/10 bg-white/5"
                  : "border border-slate-300 bg-white"
              }`}
            >
              <p className="text-sm text-cyan-400">Projects</p>
              <h3
                className={`mt-1 text-2xl font-bold ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                15+
              </h3>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative z-10 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-sm"
          >
            <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-fuchsia-500/20 blur-2xl" />

            <div
              className={`relative rounded-[28px] p-7 shadow-2xl ${
                isDark
                  ? "border border-white/10 bg-white/5 backdrop-blur-xl"
                  : "border border-slate-300 bg-white/90"
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src="/profile.jpg"
                  alt="Chamod Madhusanka"
                  className="h-44 w-44 rounded-full border-4 border-cyan-400/40 object-cover shadow-lg"
                />

                <h3
                  className={`mt-6 text-3xl font-bold ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  Chamod Madhusanka
                </h3>

                <p
                  className={`mt-2 text-base ${
                    isDark ? "text-gray-400" : "text-slate-500"
                  }`}
                >
                  Software Engineering Undergraduate
                </p>

                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {["React", "ASP.NET", "C#", "JavaScript", "SQL"].map(
                    (skill) => (
                      <span
                        key={skill}
                        className={`rounded-full px-3 py-1.5 text-sm ${
                          isDark
                            ? "border border-white/10 bg-white/5 text-gray-200"
                            : "border border-slate-300 bg-slate-50 text-slate-700"
                        }`}
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>

                <div className="mt-6 w-full rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
                  <p
                    className={`text-sm leading-7 ${
                      isDark ? "text-gray-200" : "text-slate-700"
                    }`}
                  >
                    Focused on building clean, responsive, and user-friendly
                    software with strong UI and practical functionality.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 md:flex"
      >
        <div
          className={`flex h-14 w-9 items-start justify-center rounded-full border p-2 ${
            isDark ? "border-white/20" : "border-slate-400"
          }`}
        >
          <div className="h-3 w-3 rounded-full bg-cyan-400" />
        </div>
      </motion.a>
    </section>
  );
}

export default Hero;
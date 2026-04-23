import { motion } from "framer-motion";

function SectionTitle({ title, subtitle, theme }) {
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-16 flex flex-col items-center text-center"
    >
      {/* Subtitle pill */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/8 px-4 py-2"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400">
          {subtitle}
        </p>
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.18 }}
        className={`relative text-4xl font-black leading-tight md:text-5xl xl:text-6xl ${
          isDark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </motion.h2>

      {/* Decorative underline */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.32, ease: "easeOut" }}
        className="mt-5 flex items-center gap-2"
      >
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400" />
        <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
        <div className="h-px w-8 bg-gradient-to-r from-cyan-400 to-blue-500" />
        <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
        <div className="h-px w-16 bg-gradient-to-r from-blue-500 to-transparent" />
      </motion.div>
    </motion.div>
  );
}

export default SectionTitle;
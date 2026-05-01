import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaArrowUp, FaHeart } from "react-icons/fa";

const socials = [
  { icon: FaGithub, href: "https://github.com/chamod419", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/chamod-madhusanka/", label: "LinkedIn" },
  { icon: FaFacebook, href: "https://www.facebook.com/share/1LVhe3pV8y/?mibextid=wwXIfr", label: "Facebook" },
  { icon: FaInstagram, href: "https://www.instagram.com/cmn_exa?igsh=MXhnejJqZ2VoaGwzcQ%3D%3D&utm_source=qr", label: "Instagram" },
];

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function Footer({ theme }) {
  const isDark = theme === "dark";

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className={`relative overflow-hidden ${isDark ? "border-t border-white/8" : "border-t border-slate-200"}`}>
      {/* Top gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className={`absolute left-1/2 top-0 h-px w-full -translate-x-1/2 ${isDark ? "bg-white/5" : "bg-slate-50"}`} />
        <motion.div
          animate={{ opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute left-1/2 top-0 h-40 w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[80px]"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Main footer content */}
        <div className="grid gap-10 py-16 md:grid-cols-[1.2fr_1fr_auto]">
          {/* Brand */}
          <div>
            <motion.a
              href="#home"
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2.5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_16px_rgba(34,211,238,0.35)]">
                <span className="text-xs font-black text-white">CM</span>
              </div>
              <span className={`text-base font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                Chamod<span className="text-cyan-400">.</span>
              </span>
            </motion.a>

            <p className={`mt-4 max-w-xs text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-slate-500"}`}>
              Software Engineering Undergraduate & Junior Software Developer building clean, modern web applications.
            </p>

            <div className={`mt-4 inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/8 px-3 py-2 text-xs font-semibold text-cyan-400`}>
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
              </span>
              CMNexa · Freelance Software Solutions
            </div>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-2.5">
              {socials.map(({ icon: Icon, href, label }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -4, scale: 1.12 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={label}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-200 ${
                    isDark
                      ? "border-white/8 bg-white/5 text-gray-400 hover:border-cyan-400/30 hover:bg-cyan-400/8 hover:text-cyan-400"
                      : "border-slate-200 bg-white text-slate-500 hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-500"
                  }`}
                >
                  <Icon className="text-sm" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <p className={`mb-5 text-xs font-black uppercase tracking-widest ${isDark ? "text-gray-500" : "text-slate-400"}`}>
              Navigation
            </p>
            <div className="flex flex-col gap-2.5">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ x: 5 }}
                  className={`group flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                    isDark ? "text-gray-400 hover:text-cyan-400" : "text-slate-500 hover:text-cyan-500"
                  }`}
                >
                  <span className="h-px w-0 bg-cyan-400 transition-all duration-200 group-hover:w-4" />
                  {link.label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Back to top */}
          <div className="flex items-start md:items-end">
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -4, scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className={`group flex flex-col items-center gap-2 rounded-2xl border px-5 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                isDark
                  ? "border-white/8 bg-white/5 text-gray-400 hover:border-cyan-400/30 hover:bg-cyan-400/8 hover:text-cyan-400"
                  : "border-slate-200 bg-white text-slate-500 hover:border-cyan-300 hover:text-cyan-500"
              }`}
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              >
                <FaArrowUp className="text-base" />
              </motion.div>
              Top
            </motion.button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`flex flex-col items-center justify-between gap-3 border-t py-6 sm:flex-row ${isDark ? "border-white/6" : "border-slate-100"}`}>
          <p className={`text-xs font-medium ${isDark ? "text-gray-500" : "text-slate-400"}`}>
            © 2026 Chamod Madhusanka. All rights reserved.
          </p>
          {/* <p className={`flex items-center gap-1.5 text-xs font-medium ${isDark ? "text-gray-500" : "text-slate-400"}`}>
            Built with
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <FaHeart className="text-red-400" />
            </motion.span>
            using React & Tailwind
          </p> */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
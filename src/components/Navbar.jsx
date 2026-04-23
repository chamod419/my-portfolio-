import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function Navbar({ theme, toggleTheme }) {
  const isDark = theme === "dark";
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  const navOpacity = useTransform(scrollY, [0, 80], [0.7, 0.97]);
  const navBlur = useTransform(scrollY, [0, 80], [8, 24]);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (v) => setScrolled(v > 40));
    return unsubscribe;
  }, [scrollY]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.querySelector(item.href));
      const scrollPosition = window.scrollY + 140;
      sections.forEach((section) => {
        if (!section) return;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = (href) => {
    const isActive = activeSection === href.replace("#", "");
    if (isDark) {
      return isActive ? "text-cyan-400 font-semibold" : "text-gray-400 hover:text-white";
    }
    return isActive ? "text-cyan-600 font-semibold" : "text-slate-500 hover:text-slate-900";
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
          scrolled ? "py-2" : "py-0"
        }`}
      >
        {/* 3D perspective bar */}
        <div
          className={`relative mx-3 mt-3 rounded-2xl border transition-all duration-500 ${
            isDark
              ? scrolled
                ? "border-white/10 bg-[#050816]/90 shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-2xl"
                : "border-white/5 bg-[#050816]/60 backdrop-blur-xl"
              : scrolled
              ? "border-slate-200/80 bg-white/90 shadow-[0_8px_32px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.04)] backdrop-blur-2xl"
              : "border-slate-100/50 bg-white/60 backdrop-blur-xl"
          }`}
        >
          {/* Top shimmer line */}
          <div className={`absolute inset-x-0 top-0 h-[1px] rounded-t-2xl bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent`} />

          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
            {/* Logo */}
            <a href="#home" onClick={() => setMenuOpen(false)} className="group flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 180, scale: 1.15 }}
                transition={{ duration: 0.4 }}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_16px_rgba(34,211,238,0.4)]"
              >
                <span className="text-xs font-black text-white">CM</span>
              </motion.div>
              <span className={`text-sm font-bold tracking-tight transition ${isDark ? "text-white" : "text-slate-900"}`}>
                Chamod<span className="text-cyan-400">.</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <a key={item.label} href={item.href} className="relative px-4 py-2 rounded-xl group">
                    <span className={`relative z-10 text-sm font-medium transition-colors duration-200 ${navLinkClass(item.href)}`}>
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className={`absolute inset-0 rounded-xl ${isDark ? "bg-white/8" : "bg-slate-100"}`}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                    <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? "bg-white/5" : "bg-slate-50"}`} />
                  </a>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className={`flex h-9 w-9 items-center justify-center rounded-xl border transition ${
                  isDark
                    ? "border-white/10 bg-white/5 text-yellow-300 hover:bg-white/10"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isDark ? "sun" : "moon"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDark ? <FaSun size={13} /> : <FaMoon size={13} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="hidden md:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(34,211,238,0.3)] transition hover:shadow-[0_4px_28px_rgba(34,211,238,0.5)]"
              >
                Let's Talk
                <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <FaArrowRight className="text-[10px]" />
                </motion.span>
              </motion.a>

              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setMenuOpen((p) => !p)}
                className={`flex h-9 w-9 items-center justify-center rounded-xl border md:hidden ${
                  isDark ? "border-white/10 bg-white/5 text-white" : "border-slate-200 bg-white text-slate-900"
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={menuOpen ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    {menuOpen ? <FaTimes size={14} /> : <FaBars size={14} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className={`mx-3 mt-2 rounded-2xl border px-5 py-5 ${
                isDark
                  ? "border-white/10 bg-[#050816]/95 backdrop-blur-2xl"
                  : "border-slate-200 bg-white/95 backdrop-blur-2xl"
              }`}
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-xl px-4 py-3 text-base font-medium transition ${navLinkClass(item.href)} ${isDark ? "hover:bg-white/5" : "hover:bg-slate-50"}`}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  onClick={() => setMenuOpen(false)}
                  className="mt-3 inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(34,211,238,0.3)]"
                >
                  Let's Talk <FaArrowRight className="text-[10px]" />
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

export default Navbar;
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
} from "react-icons/fa";

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

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) =>
        document.querySelector(item.href)
      );

      const scrollPosition = window.scrollY + 140;

      sections.forEach((section) => {
        if (!section) return;

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
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
      return isActive
        ? "text-cyan-400 font-semibold"
        : "text-gray-300 hover:text-white";
    }

    return isActive
      ? "text-cyan-600 font-semibold"
      : "text-slate-600 hover:text-slate-900";
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 z-50 w-full border-b backdrop-blur-xl ${
        isDark
          ? "border-white/10 bg-[#050816]/80"
          : "border-slate-200 bg-white/80"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#home"
          className="text-lg font-bold"
          onClick={() => setMenuOpen(false)}
        >
          <span className={isDark ? "text-white" : "text-slate-900"}>
            Chamod Madhusanka
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm transition ${navLinkClass(item.href)}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
              isDark
                ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
                : "border-slate-300 bg-white text-slate-900 hover:bg-slate-100"
            }`}
          >
            {isDark ? <FaSun size={14} /> : <FaMoon size={14} />}
          </button>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-105"
          >
            Let's Talk
            <FaArrowRight className="text-xs" />
          </a>

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className={`flex h-10 w-10 items-center justify-center rounded-full border md:hidden ${
              isDark
                ? "border-white/10 bg-white/5 text-white"
                : "border-slate-300 bg-white text-slate-900"
            }`}
          >
            {menuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className={`border-t px-6 py-5 md:hidden ${
            isDark
              ? "border-white/10 bg-[#050816]"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`text-base transition ${navLinkClass(item.href)}`}
              >
                {item.label}
              </a>
            ))}

            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Let's Talk
              <FaArrowRight className="text-xs" />
            </a>
          </div>
        </div>
      )}
    </motion.header>
  );
}

export default Navbar;
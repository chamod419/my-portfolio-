function Footer({ theme }) {
  const isDark = theme === "dark";

  return (
    <footer
      className={`border-t px-6 py-8 text-center md:px-10 ${
        isDark ? "border-white/10" : "border-slate-300"
      }`}
    >
      <p className={isDark ? "text-gray-400" : "text-slate-500"}>
        © 2026 Chamod Madhusanka. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
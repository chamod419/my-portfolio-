function SectionTitle({ title, subtitle, theme }) {
  const isDark = theme === "dark";

  return (
    <div className="mb-12 text-center">
      <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">
        {subtitle}
      </p>
      <h2
        className={`text-3xl font-bold md:text-5xl ${
          isDark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}

export default SectionTitle;
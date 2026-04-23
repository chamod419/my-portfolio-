import SectionTitle from "../components/SectionTitle";
import Reveal from "../components/Reveal";

function Skills({ theme }) {
  const isDark = theme === "dark";

  const skillGroups = [
    {
      title: "Frontend",
      items: ["React", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
    },
    {
      title: "Backend",
      items: ["ASP.NET", "C#", "PHP", "Python"],
    },
    {
      title: "Database & Tools",
      items: ["SQL", "MySQL", "Git", "GitHub", "VS Code"],
    },
  ];

  return (
    <section id="skills" className="px-6 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title="Skills" subtitle="Tech Stack" theme={theme} />

        <div className="grid gap-6 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.1}>
              <div
                className={`rounded-[28px] p-7 transition duration-300 hover:-translate-y-2 ${
                  isDark
                    ? "border border-white/10 bg-white/5"
                    : "border border-slate-300 bg-white"
                }`}
              >
                <h3
                  className={`text-2xl font-bold ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  {group.title}
                </h3>

                <div className="mt-6 flex flex-wrap gap-3">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className={`rounded-full px-4 py-2 text-sm font-medium ${
                        isDark
                          ? "border border-white/10 bg-white/5 text-gray-200"
                          : "border border-slate-300 bg-slate-50 text-slate-700"
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
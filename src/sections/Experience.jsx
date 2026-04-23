import SectionTitle from "../components/SectionTitle";
import Reveal from "../components/Reveal";

function Experience({ theme }) {
  const isDark = theme === "dark";

  const experiences = [
    {
      role: "Junior Software Developer",
      company: "Nawaloka Hospital Negombo",
      period: "Mar 2026 - Present",
      type: "On-site",
      points: [
        "Contributing to software development tasks in a real-world healthcare environment.",
        "Working with technical solutions that support operational workflows.",
        "Continuing to strengthen practical development and problem-solving skills.",
      ],
    },
    {
      role: "Information Technology Trainee",
      company: "Nawaloka Hospital",
      period: "Mar 2025 - Mar 2026",
      type: "Full-time",
      points: [
        "Supported IT operations and troubleshooting in a professional environment.",
        "Assisted with technical issues, system support, and day-to-day IT tasks.",
        "Built a stronger foundation in communication, support workflows, and technical problem solving.",
      ],
    },
    {
      role: "Software Engineer Intern",
      company: "Ascylla",
      period: "Jan 2026 - Present",
      type: "Remote",
      points: [
        "Gained exposure to software engineering workflows in a remote work setting.",
        "Improved development knowledge through practical collaboration and engineering tasks.",
        "Strengthened understanding of professional software development practices.",
      ],
    },
  ];

  return (
    <section id="experience" className="px-6 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          title="Experience"
          subtitle="My Journey"
          theme={theme}
        />

        <div className="relative mx-auto max-w-5xl">
          <div
            className={`absolute left-4 top-0 hidden h-full w-[2px] md:block ${
              isDark ? "bg-white/10" : "bg-slate-300"
            }`}
          />

          <div className="space-y-8">
            {experiences.map((item, index) => (
              <Reveal key={index} delay={index * 0.12}>
                <div className="relative md:pl-16">
                  <div className="absolute left-0 top-6 hidden md:block">
                    <div className="h-8 w-8 rounded-full border-4 border-cyan-400 bg-cyan-500/20" />
                  </div>

                  <div
                    className={`rounded-[28px] p-7 transition duration-300 hover:-translate-y-1 ${
                      isDark
                        ? "border border-white/10 bg-white/5"
                        : "border border-slate-300 bg-white"
                    }`}
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3
                          className={`text-2xl font-bold ${
                            isDark ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {item.role}
                        </h3>
                        <p className="mt-1 text-lg font-medium text-cyan-400">
                          {item.company}
                        </p>
                      </div>

                      <div className="text-left md:text-right">
                        <p
                          className={`font-medium ${
                            isDark ? "text-gray-300" : "text-slate-700"
                          }`}
                        >
                          {item.period}
                        </p>
                        <p
                          className={`mt-1 text-sm ${
                            isDark ? "text-gray-400" : "text-slate-500"
                          }`}
                        >
                          {item.type}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      {item.points.map((point, pointIndex) => (
                        <div key={pointIndex} className="flex items-start gap-3">
                          <div className="mt-2 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                          <p
                            className={`leading-8 ${
                              isDark ? "text-gray-300" : "text-slate-600"
                            }`}
                          >
                            {point}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
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
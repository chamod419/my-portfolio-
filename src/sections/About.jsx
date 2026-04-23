import SectionTitle from "../components/SectionTitle";
import Reveal from "../components/Reveal";

function About({ theme }) {
  const isDark = theme === "dark";

  const highlights = [
    "Junior Software Developer with real-world experience",
    "Software Engineering undergraduate",
    "Focused on React, ASP.NET, C#, JavaScript, and SQL",
    "Interested in building clean and user-friendly products",
  ];

  return (
    <section id="about" className="px-6 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title="About Me" subtitle="Introduction" theme={theme} />

        <div className="grid items-start gap-8 lg:grid-cols-2">
          <Reveal>
            <div
              className={`rounded-[28px] p-8 md:p-10 ${
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
                Who I Am
              </h3>

              <p
                className={`mt-5 text-lg leading-8 ${
                  isDark ? "text-gray-300" : "text-slate-600"
                }`}
              >
                I am Chamod Madhusanka, a motivated Software Engineering
                undergraduate with practical experience in software development,
                problem solving, and real-world technical environments.
              </p>

              <p
                className={`mt-5 text-lg leading-8 ${
                  isDark ? "text-gray-300" : "text-slate-600"
                }`}
              >
                I enjoy building modern web applications that are responsive,
                clean, and user-friendly. My goal is to grow as a professional
                software developer while contributing to meaningful products and
                impactful teams.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid gap-4">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className={`rounded-[24px] p-6 transition duration-300 hover:-translate-y-1 ${
                    isDark
                      ? "border border-white/10 bg-white/5"
                      : "border border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 h-3 w-3 rounded-full bg-cyan-400" />
                    <p
                      className={`text-base leading-7 ${
                        isDark ? "text-gray-200" : "text-slate-700"
                      }`}
                    >
                      {item}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default About;
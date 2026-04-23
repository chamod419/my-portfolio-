import SectionTitle from "../components/SectionTitle";
import Reveal from "../components/Reveal";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import projects from "../data/projects";

function Projects({ theme }) {
  const isDark = theme === "dark";

  return (
    <section id="projects" className="px-6 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          title="Featured Projects"
          subtitle="My Work"
          theme={theme}
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.08}>
              <div
                className={`group h-full overflow-hidden rounded-[28px] transition duration-300 hover:-translate-y-2 ${
                  isDark
                    ? "border border-white/10 bg-white/5"
                    : "border border-slate-300 bg-white"
                }`}
              >
                <div className="overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-7">
                  <h3
                    className={`text-2xl font-bold ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {project.title}
                  </h3>

                  <p
                    className={`mt-4 leading-8 ${
                      isDark ? "text-gray-300" : "text-slate-600"
                    }`}
                  >
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((item) => (
                      <span
                        key={item}
                        className={`rounded-full px-3 py-1.5 text-sm ${
                          isDark
                            ? "border border-white/10 bg-white/5 text-gray-200"
                            : "border border-slate-300 bg-slate-50 text-slate-700"
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition hover:-translate-y-1 ${
                        isDark
                          ? "border border-white/10 bg-white/5 text-gray-200 hover:bg-white/10"
                          : "border border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <FaGithub />
                      View Code
                    </a>

                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-1 hover:bg-cyan-400"
                    >
                      <FaExternalLinkAlt />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
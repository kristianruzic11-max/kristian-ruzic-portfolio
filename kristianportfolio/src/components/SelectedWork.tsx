import { projects } from "../data/projects";
import { useLanguage } from "../i18n/LanguageContext";
import { Reveal } from "./Reveal";
import { ProjectCard } from "./ProjectCard";

export function SelectedWork() {
  const { t } = useLanguage();
  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="container-page">
        <div className="max-w-2xl">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              {t.selectedWork.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="balance mt-4 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
              {t.selectedWork.heading}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              {t.selectedWork.intro}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

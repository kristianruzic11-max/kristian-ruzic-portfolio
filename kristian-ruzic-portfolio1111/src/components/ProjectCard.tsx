import { type Project } from "../data/projects";
import { useLanguage } from "../i18n/LanguageContext";
import { ArrowUpRightIcon } from "./icons";
import { Reveal } from "./Reveal";

export function ProjectCard({
  project,
  delay = 0,
}: {
  project: Project;
  delay?: number;
}) {
  const { t } = useLanguage();
  const copy = t.projects[project.id];
  return (
    <Reveal delay={delay} className="h-full">
      <a
        href={project.href}
        target={project.href === "#" ? undefined : "_blank"}
        rel={project.href === "#" ? undefined : "noopener noreferrer"}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-25px_rgba(13,13,15,0.25)]"
      >
        <div
          className={`relative aspect-[16/11] w-full overflow-hidden bg-gradient-to-br ${project.gradient}`}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.name} preview`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            />
          ) : (
            <div
              aria-hidden="true"
              className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.5), transparent 45%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.08), transparent 50%)",
              }}
            />
          )}

          <span className="absolute right-4 top-4 rounded-full bg-ink-900/80 px-3 py-1 text-xs font-medium text-paper backdrop-blur-sm">
            {copy.category}
          </span>

          <div className="absolute inset-0 flex items-center justify-center bg-ink-900/0 opacity-0 transition-all duration-300 group-hover:bg-ink-900/10 group-hover:opacity-100">
            <span className="flex h-12 w-12 -translate-y-2 items-center justify-center rounded-full bg-white text-ink-900 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRightIcon className="h-5 w-5" />
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-lg font-semibold text-ink-900">
              {project.name}
            </h3>
          </div>
          <p className="text-sm font-medium uppercase tracking-wide text-accent-violet/90">
            {copy.role}
          </p>
          <p className="text-sm leading-relaxed text-muted">
            {copy.description}
          </p>
        </div>
      </a>
    </Reveal>
  );
}

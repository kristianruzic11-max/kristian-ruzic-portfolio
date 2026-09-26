import { useLanguage } from "../i18n/LanguageContext";
import { Reveal } from "./Reveal";

export function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container-page">
        <div className="max-w-2xl">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              {t.about.heading}
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="balance mt-4 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
              {t.about.title}
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 sm:mt-16">
          <Reveal variant="scale">
            <div className="relative overflow-hidden rounded-3xl bg-ink-900 p-8 text-paper sm:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br from-accent-violet/30 to-accent-blue/20 blur-3xl"
              />
              <div className="relative max-w-2xl space-y-5">
                {t.about.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-lg font-medium leading-relaxed text-paper sm:text-xl"
                  >
                    {p}
                  </p>
                ))}
              </div>

              <div className="relative mt-8 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-paper/10 text-lg font-semibold text-paper ring-1 ring-inset ring-white/15">
                  KR
                </div>
                <div>
                  <p className="text-sm font-medium text-paper">
                    {t.name}
                  </p>
                  <p className="text-xs text-paper/60">{t.role}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

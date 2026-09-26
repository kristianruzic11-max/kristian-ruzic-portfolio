import { useLanguage } from "../i18n/LanguageContext";
import { Reveal } from "./Reveal";

export function Process() {
  const { t } = useLanguage();
  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="container-page">
        <div className="max-w-2xl">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              {t.process.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="balance mt-4 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
              {t.process.heading}
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:mt-16 sm:grid-cols-3 sm:gap-6">
          {t.process.steps.map((item, i) => (
            <Reveal key={item.step} delay={i * 100} className="h-full">
              <div className="h-full rounded-3xl border border-line bg-white p-7 transition-colors hover:border-ink-900/20 sm:p-8">
                <span className="text-sm font-semibold text-accent-violet/90">
                  {item.step}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

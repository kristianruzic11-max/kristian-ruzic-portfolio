import { useLanguage } from "../i18n/LanguageContext";
import { Reveal } from "./Reveal";
import { ArrowUpRightIcon, CodeIcon, FigmaMark } from "./icons";

export function Hero() {
  const { t } = useLanguage();
  return (
    <section
      id="top"
      className="relative z-0 overflow-hidden bg-mist pb-20 pt-36 sm:pb-28 sm:pt-44"
    >
      {/* Flat, pale lavender-grey wash + fine grid, matching the airy reference hero */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Fine grid across the whole hero */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(13,13,15,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(13,13,15,0.05) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Soft lightening toward the top-center, like a gentle studio light */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(255,255,255,0.45), transparent 65%)",
          }}
        />

        {/* Fade the wash into the page background at the bottom of the hero */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-paper" />
      </div>

      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-4 py-1.5 text-xs font-medium text-muted shadow-sm backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-mint" />
                {t.hero.eyebrow}
              </span>
            </Reveal>

            {t.hero.preHeading ? (
              <Reveal delay={80}>
                <p className="mt-6 text-lg font-medium text-ink-900 sm:text-xl">
                  {t.hero.preHeading}
                </p>
              </Reveal>
            ) : null}

            <Reveal delay={140}>
              <h1
                className={`balance max-w-2xl text-[2.9rem] font-semibold leading-[1.06] tracking-tight text-ink-900 sm:text-6xl lg:text-[4rem] ${
                  t.hero.preHeading ? "mt-2" : "mt-6"
                }`}
              >
                {t.hero.heading.map((part, i) =>
                  part.accent ? (
                    <span
                      key={i}
                      className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent"
                    >
                      {part.text}
                    </span>
                  ) : (
                    <span key={i} className="text-muted">
                      {part.text}
                    </span>
                  )
                )}
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="balance mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
                {t.hero.intro}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href={t.hero.ctaHref}
                  className="group inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 text-sm font-medium text-paper transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink-900/10 active:translate-y-0"
                >
                  {t.hero.ctaLabel}
                  <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href={t.hero.secondaryCtaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-ink-800 underline decoration-line decoration-2 underline-offset-4 transition-colors hover:decoration-ink-900"
                >
                  {t.hero.secondaryCtaLabel}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Visual: floating design → development workflow card */}
          <Reveal variant="scale" delay={200} className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-violet-100 via-sky-50 to-emerald-50 shadow-[0_30px_60px_-25px_rgba(13,13,15,0.25)] sm:aspect-square lg:aspect-[4/5]">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 20%, rgba(167,139,250,0.5), transparent 45%), radial-gradient(circle at 75% 70%, rgba(125,211,252,0.5), transparent 45%)",
                }}
              />

              {/* Center workflow chip */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-8 text-center">
                <div className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/80 px-5 py-4 shadow-lg backdrop-blur-md">
                  <FigmaMark className="h-8 w-8" />
                  <span className="text-sm font-medium text-muted">{t.hero.workflowDesign}</span>
                </div>
                <div className="h-8 w-px bg-ink-900/15" />
                <div className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/80 px-5 py-4 shadow-lg backdrop-blur-md">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-900 text-paper">
                    <CodeIcon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium text-muted">{t.hero.workflowDevelopment}</span>
                </div>
              </div>

              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-left backdrop-blur-md">
                <p className="text-xs font-medium uppercase tracking-wide text-muted">
                  {t.hero.workflowLabel}
                </p>
                <p className="mt-0.5 text-sm font-medium text-ink-900">
                  {t.hero.workflowLine}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

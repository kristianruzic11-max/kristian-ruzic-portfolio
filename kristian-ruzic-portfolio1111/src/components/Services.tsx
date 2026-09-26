import { useLanguage } from "../i18n/LanguageContext";
import { Reveal } from "./Reveal";
import { PenToolIcon, LayoutIcon, CodeIcon, DevicesIcon } from "./icons";

const icons: Record<string, (props: { className?: string }) => JSX.Element> = {
  "ui-ux-design": PenToolIcon,
  "web-design": LayoutIcon,
  "web-development": CodeIcon,
  "responsive-design": DevicesIcon,
};

export function Services() {
  const { t } = useLanguage();
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="container-page">
        <div className="max-w-2xl">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              {t.services.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="balance mt-4 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
              {t.services.heading}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              {t.services.intro}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:mt-16 sm:grid-cols-2">
          {t.services.items.map((service, i) => {
            const Icon = icons[service.id] ?? PenToolIcon;
            return (
              <Reveal key={service.id} delay={i * 90} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-25px_rgba(13,13,15,0.2)] sm:p-9">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-accent-violet/20 via-accent-blue/20 to-transparent opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-paper text-ink-900 shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="relative mt-6 text-lg font-semibold text-ink-900">
                    {service.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

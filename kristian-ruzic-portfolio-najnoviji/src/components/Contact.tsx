import { useLanguage } from "../i18n/LanguageContext";
import { Reveal } from "./Reveal";
import { ArrowUpRightIcon, InstagramIcon, MailIcon } from "./icons";

const socialIcon: Record<string, (props: { className?: string }) => JSX.Element> = {
  Email: MailIcon,
  Instagram: InstagramIcon,
};

export function Contact() {
  const { t } = useLanguage();
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="container-page">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-ink-900 px-6 py-16 text-center sm:px-12 sm:py-24">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-accent-violet/30 via-accent-blue/25 to-accent-pink/25 blur-3xl"
            />

            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-paper/70">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-mint" />
                {t.contact.availableBadge}
              </span>

              <h2 className="balance mt-6 text-3xl font-semibold tracking-tight text-paper sm:text-5xl">
                {t.contact.heading}
              </h2>
              <p className="balance mx-auto mt-5 max-w-md text-base leading-relaxed text-paper/65 sm:text-lg">
                {t.contact.subheading}
              </p>

              <div className="mt-9 flex items-center justify-center">
                <a
                  href={t.contact.gmailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-paper px-7 py-3.5 text-sm font-medium text-ink-900 transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
                >
                  {t.contact.ctaLabel}
                  <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              <div className="mt-12 flex items-center justify-center gap-3">
                {t.social.map((s) => {
                  const Icon = socialIcon[s.label] ?? MailIcon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        s.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-paper/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:text-paper"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

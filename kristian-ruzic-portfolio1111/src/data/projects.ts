/**
 * Selected Work — project data.
 *
 * To add a new project, add another object to the `projects` array below.
 * That's the only place you need to touch — the layout, grid and cards
 * pick up new entries automatically.
 *
 * `image`: optional path to a real screenshot/preview (e.g. "projects/my-project.jpg").
 *          Put the file in the /public/projects folder and reference it as
 *          "projects/my-project.jpg" (no leading slash — keeps links working
 *          both on a normal domain and inside a hosted preview).
 *          If omitted, a generated gradient cover (using `gradient`) is
 *          shown instead — handy as a placeholder.
 *
 * `href`: link to the live website. Leave as "#" if there isn't one yet —
 *         the card will then no longer open a new tab.
 */

export type Project = {
  id: string;
  name: string;
  description: string;
  /** Industry / type of project, e.g. "Beauty & Wellness". */
  category: string;
  /** What you did on it, e.g. "UI/UX Design · Web Development". */
  role: string;
  href: string;
  /** Tailwind gradient classes used when no `image` is provided. */
  gradient: string;
  /** Optional path to a real image in /public. */
  image?: string;
};

export const projects: Project[] = [
  {
    id: "thermoflow",
    name: "ThermoFlow",
    description:
      "A plumbing, gas and heating services website — fast quote requests, service overview and a 24/7 emergency contact flow.",
    category: "Home Services",
    role: "UI/UX Design · Web Development",
    href: "projects/thermoflow/",
    gradient: "from-sky-200 via-blue-100 to-orange-100",
    image: "projects/thermoflow-cover.jpg",
  },
  {
    id: "tribe-tattoo",
    name: "Manta Ink",
    description:
      "A boutique tattoo & piercing studio site — meet the artists, browse the gallery, and book a session.",
    category: "Tattoo Studio",
    role: "UI/UX Design · Web Development",
    href: "projects/tribe-tattoo/",
    gradient: "from-neutral-800 via-neutral-700 to-neutral-900",
    image: "projects/tribe-tattoo-cover.jpg",
  },
  {
    id: "elora",
    name: "Elora Beauty Studio",
    description:
      "A beauty salon website — facial, body and relaxation treatments, presented with a calm, elegant design.",
    category: "Beauty & Wellness",
    role: "UI/UX Design · Web Development",
    href: "projects/elora/",
    gradient: "from-rose-200 via-pink-100 to-amber-100",
    image: "projects/elora-cover.jpg",
  },
];

/**
 * Site-wide personal/business information.
 * Edit this file to update your name, role, intro copy, contact info and social links.
 */

type HeroHeadingPart = { text: string; accent?: boolean };

const heroHeading: HeroHeadingPart[] = [
  { text: "I " },
  { text: "design & build", accent: true },
  { text: " websites." },
];

export const site = {
  name: "Kristian Ružić",
  firstName: "Kristian",
  role: "UI/UX Designer & Web Developer",
  location: "", // e.g. "Zagreb, Croatia" — leave empty to hide

  // Hero section copy
  hero: {
    eyebrow: "UI/UX Designer & Web Developer",
    heading: heroHeading,
    intro:
      "I create modern, responsive and user-focused websites — from the first idea and UI/UX design to the final functional website.",
    ctaLabel: "View my work",
    ctaHref: "#work",
    secondaryCtaLabel: "Get in touch",
    secondaryCtaHref:
      "https://mail.google.com/mail/?view=cm&fs=1&to=kristianruzic11@gmail.com&su=New%20project%20inquiry",
  },

  // About section copy
  about: {
    heading: "About me",
    paragraphs: [
      "I'm Kristian, a UI/UX designer and web developer focused on creating modern, clean and functional websites. I combine thoughtful design with responsive development to turn ideas into polished digital experiences.",
    ],
  },

  // Services / "What I do" section copy
  services: {
    eyebrow: "Services",
    heading: "What I do",
    intro: "The core services I offer, from first sketch to finished site.",
  },

  // Process section copy
  process: {
    eyebrow: "Process",
    heading: "From idea to website",
  },

  // Contact section copy
  contact: {
    heading: "Have a project in mind?",
    subheading: "Let's turn your idea into a website.",
    ctaLabel: "Get in touch",
    // Replace with your real contact details
    email: "kristianruzic11@gmail.com",
    gmailComposeUrl:
      "https://mail.google.com/mail/?view=cm&fs=1&to=kristianruzic11@gmail.com&su=New%20project%20inquiry",
  },

  social: [
    // Replace these placeholder links with your real profiles
    { label: "Email", href: "mailto:kristianruzic11@gmail.com" },
    { label: "LinkedIn", href: "#" },
    { label: "Dribbble", href: "#" },
    { label: "GitHub", href: "#" },
  ],

  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

/**
 * All site copy, in English and Croatian.
 *
 * To edit text, change it here (both languages) rather than in the
 * components — the components just read from this file via useLanguage().
 */

export type Lang = "en" | "hr";

type HeroHeadingPart = { text: string; accent?: boolean; size?: "sm" | "lg" };

type ServiceItem = { id: string; title: string; description: string };
type ProcessStep = { step: string; title: string; description: string };
type ProjectCopy = { category: string; role: string; description: string };

export type Content = {
  meta: {
    title: string;
    description: string;
  };
  skipLink: string;
  name: string;
  role: string;

  nav: { label: string; href: string }[];

  hero: {
    eyebrow: string;
    preHeading?: string;
    heading: HeroHeadingPart[];
    intro: string;
    ctaLabel: string;
    ctaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    workflowDesign: string;
    workflowDevelopment: string;
    workflowLabel: string;
    workflowLine: string;
  };

  selectedWork: {
    eyebrow: string;
    heading: string;
    intro: string;
  };

  /** Per-project copy, keyed by the project's `id` in data/projects.ts. */
  projects: Record<string, ProjectCopy>;

  about: {
    heading: string;
    title: string;
    paragraphs: string[];
  };

  services: {
    eyebrow: string;
    heading: string;
    intro: string;
    items: ServiceItem[];
  };

  process: {
    eyebrow: string;
    heading: string;
    steps: ProcessStep[];
  };

  contact: {
    heading: string;
    subheading: string;
    ctaLabel: string;
    email: string;
    gmailComposeUrl: string;
    availableBadge: string;
  };

  social: { label: string; href: string }[];

  footer: {
    rights: string;
  };

  langSwitcher: {
    label: string;
  };
};

const gmailComposeUrl =
  "https://mail.google.com/mail/?view=cm&fs=1&to=kristianruzic11@gmail.com&su=";

export const content: Record<Lang, Content> = {
  en: {
    meta: {
      title: "Kristian Ružić — UI/UX Designer & Web Developer",
      description:
        "Kristian Ružić — UI/UX Designer & Web Developer. Modern, responsive and user-focused websites, from first idea to finished site.",
    },
    skipLink: "Skip to content",
    name: "Kristian Ružić",
    role: "UI/UX Designer & Web Developer",

    nav: [
      { label: "Work", href: "#work" },
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Process", href: "#process" },
      { label: "Contact", href: "#contact" },
    ],

    hero: {
      eyebrow: "UI/UX Designer & Web Developer",
      preHeading: "Hi, I'm Kristian",
      heading: [
        { text: "A ", accent: true },
        { text: "UI/UX Designer & Web Developer", accent: true },
        { text: "." },
      ],
      intro:
        "I design and build digital experiences that are simple, engaging, and made to work.",
      ctaLabel: "View my work",
      ctaHref: "#work",
      secondaryCtaLabel: "Get in touch",
      secondaryCtaHref: gmailComposeUrl + "New%20project%20inquiry",
      workflowDesign: "Design",
      workflowDevelopment: "Development",
      workflowLabel: "Workflow",
      workflowLine: "Design and development",
    },

    selectedWork: {
      eyebrow: "Selected Work",
      heading: "Projects designed and built from scratch",
      intro:
        "A few projects carried from first idea to a live, working website — design, structure and code, all handled in one place.",
    },

    projects: {
      thermoflow: {
        category: "Home Services",
        role: "UI/UX Design · Web Development",
        description:
          "A plumbing, gas and heating services website — fast quote requests, service overview and a 24/7 emergency contact flow.",
      },
      "tribe-tattoo": {
        category: "Tattoo Studio",
        role: "UI/UX Design · Web Development",
        description:
          "A boutique tattoo & piercing studio site — meet the artists, browse the gallery, and book a session.",
      },
      elora: {
        category: "Beauty & Wellness",
        role: "UI/UX Design · Web Development",
        description:
          "A beauty salon website — facial, body and relaxation treatments, presented with a calm, elegant design.",
      },
    },

    about: {
      heading: "About me",
      title: "Design and development, from one person",
      paragraphs: [
        "I'm Kristian, a UI/UX designer and web developer focused on creating modern, clean and functional websites. I combine thoughtful design with responsive development to turn ideas into polished digital experiences.",
      ],
    },

    services: {
      eyebrow: "Services",
      heading: "What I do",
      intro: "The core services I offer, from first sketch to finished site.",
      items: [
        {
          id: "ui-ux-design",
          title: "UI/UX Design",
          description:
            "Creating clear, intuitive and visually engaging digital experiences.",
        },
        {
          id: "web-design",
          title: "Web Design",
          description:
            "Designing modern websites with a strong focus on visual identity, usability and detail.",
        },
        {
          id: "web-development",
          title: "Web Development",
          description:
            "Turning designs into responsive, functional and polished websites.",
        },
        {
          id: "responsive-design",
          title: "Responsive Design",
          description:
            "Making sure websites look and work properly across desktop, tablet and mobile devices.",
        },
      ],
    },

    process: {
      eyebrow: "Process",
      heading: "How it comes together",
      steps: [
        {
          step: "01",
          title: "Discover",
          description: "Understanding the idea, goals and audience.",
        },
        {
          step: "02",
          title: "Design",
          description:
            "Creating the visual direction, interface and user experience.",
        },
        {
          step: "03",
          title: "Build",
          description:
            "Turning the approved design into a responsive and functional website.",
        },
      ],
    },

    contact: {
      heading: "Have a project in mind?",
      subheading: "Let's turn your idea into a website.",
      ctaLabel: "Get in touch",
      email: "kristianruzic11@gmail.com",
      gmailComposeUrl: gmailComposeUrl + "New%20project%20inquiry",
      availableBadge: "Available for new projects",
    },

    social: [
      { label: "Email", href: "mailto:kristianruzic11@gmail.com" },
      { label: "Instagram", href: "https://www.instagram.com/ruzic.kristian/" },
    ],

    footer: {
      rights: "All rights reserved.",
    },

    langSwitcher: {
      label: "Language",
    },
  },

  hr: {
    meta: {
      title: "Kristian Ružić — UI/UX Dizajner i Web Developer",
      description:
        "Kristian Ružić — UI/UX dizajner i web developer. Moderne, responzivne web stranice usmjerene na korisnika, od prve ideje do gotove stranice.",
    },
    skipLink: "Preskoči na sadržaj",
    name: "Kristian Ružić",
    role: "UI/UX Dizajner i Web Developer",

    nav: [
      { label: "Radovi", href: "#work" },
      { label: "O meni", href: "#about" },
      { label: "Usluge", href: "#services" },
      { label: "Proces", href: "#process" },
      { label: "Kontakt", href: "#contact" },
    ],

    hero: {
      eyebrow: "UI/UX Dizajner i Web Developer",
      preHeading: "Bok, ja sam Kristian",
      heading: [
        { text: "UI/UX dizajner i web developer", accent: true },
        { text: "." },
      ],
      intro:
        "Dizajniram i izrađujem moderne web stranice koje spajaju dobar dizajn, jednostavno korisničko iskustvo i funkcionalnost.",
      ctaLabel: "Pogledaj radove",
      ctaHref: "#work",
      secondaryCtaLabel: "Kontaktiraj me",
      secondaryCtaHref: gmailComposeUrl + "Upit%20za%20novi%20projekt",
      workflowDesign: "Dizajn",
      workflowDevelopment: "Razvoj",
      workflowLabel: "Tijek rada",
      workflowLine: "Dizajn i razvoj",
    },

    selectedWork: {
      eyebrow: "Odabrani radovi",
      heading: "Web prilagođen vašem poslovanju",
      intro:
        "Različiti projekti, različite potrebe i pristupi — povezuje ih isti fokus: stvoriti digitalno iskustvo koje ima svrhu i karakter.",
    },

    projects: {
      thermoflow: {
        category: "Kućne usluge",
        role: "UI/UX dizajn · Web razvoj",
        description:
          "Web stranica za uslugu instalacija — elektro instalacije, vodoinstalacije, grijanje, klimatizacija.",
      },
      "tribe-tattoo": {
        category: "Studio za tetoviranje",
        role: "UI/UX dizajn · Web razvoj",
        description:
          "Stranica za tetoviranje i piercing — upoznaj umjetnike, pregledaj galeriju i rezerviraj termin.",
      },
      elora: {
        category: "Ljepota i njega",
        role: "UI/UX dizajn · Web razvoj",
        description:
          "Web stranica salona ljepote — tretmani lica, tijela i opuštanja, prikazani kroz smiren i elegantan dizajn.",
      },
    },

    about: {
      heading: "O meni",
      title: "Dizajn i razvoj, iz jednih ruku",
      paragraphs: [
        "Ja sam Kristian, UI/UX dizajner i web developer fokusiran na izradu modernih, urednih i funkcionalnih web stranica. Kombiniram promišljen dizajn s responzivnim razvojem kako bih ideje pretvorio u digitalna iskustva.",
      ],
    },

    services: {
      eyebrow: "Usluge",
      heading: "Čime se bavim",
      intro: "Osnovne usluge koje nudim, od prve skice do gotove stranice.",
      items: [
        {
          id: "ui-ux-design",
          title: "UI/UX dizajn",
          description:
            "Kreiranje jasnih, intuitivnih i vizualno privlačnih digitalnih iskustava.",
        },
        {
          id: "web-design",
          title: "Web dizajn",
          description:
            "Dizajniranje modernih web stranica s naglaskom na vizualni identitet, upotrebljivost i detalje.",
        },
        {
          id: "web-development",
          title: "Web razvoj",
          description:
            "Pretvaranje dizajna u responzivne i funkcionalne web stranice.",
        },
        {
          id: "responsive-design",
          title: "Responzivni dizajn",
          description:
            "Osiguravanje da stranice izgledaju i rade ispravno na računalima, tabletima i mobitelima.",
        },
      ],
    },

    process: {
      eyebrow: "Proces",
      heading: "Kako izgleda suradnja",
      steps: [
        {
          step: "01",
          title: "Istraživanje",
          description: "Razumijevanje ideje, ciljeva i ciljane publike.",
        },
        {
          step: "02",
          title: "Dizajn",
          description:
            "Kreiranje vizualnog smjera, sučelja i korisničkog iskustva.",
        },
        {
          step: "03",
          title: "Izrada",
          description:
            "Pretvaranje odobrenog dizajna u responzivnu i funkcionalnu web stranicu.",
        },
      ],
    },

    contact: {
      heading: "Imaš projekt na umu?",
      subheading: "Obrati mi se za izradu web stranice.",
      ctaLabel: "Kontaktiraj me",
      email: "kristianruzic11@gmail.com",
      gmailComposeUrl: gmailComposeUrl + "Upit%20za%20novi%20projekt",
      availableBadge: "Dostupan za nove projekte",
    },

    social: [
      { label: "Email", href: "mailto:kristianruzic11@gmail.com" },
      { label: "Instagram", href: "https://www.instagram.com/ruzic.kristian/" },
    ],

    footer: {
      rights: "Sva prava pridržana.",
    },

    langSwitcher: {
      label: "Jezik",
    },
  },
};

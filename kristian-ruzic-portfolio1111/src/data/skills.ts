/**
 * "What I do" (services) section data.
 * Add or edit a service by adding/editing an object in the array below.
 */

export type Service = {
  id: string;
  title: string;
  description: string;
};

export const services: Service[] = [
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
];

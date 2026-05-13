export type ComponentSample = {
  label: string;
  slug: string;
  href: string;
  designDoc: string;
  status: "Migrated" | "Pending";
};

export const componentSamples: ComponentSample[] = [
  {
    label: "Button",
    slug: "buttons",
    href: "/components/buttons",
    designDoc: "design/forms/button.md",
    status: "Migrated"
  },
  {
    label: "Dropdown",
    slug: "dropdown",
    href: "/components/dropdown",
    designDoc: "design/forms/dropdown.md",
    status: "Migrated"
  },
  {
    label: "Input",
    slug: "input",
    href: "/components/input",
    designDoc: "design/forms/input.md",
    status: "Migrated"
  },
  {
    label: "Select",
    slug: "select",
    href: "/components/select",
    designDoc: "design/forms/select.md",
    status: "Migrated"
  },
  {
    label: "Textarea",
    slug: "textarea",
    href: "/components/textarea",
    designDoc: "design/forms/textarea.md",
    status: "Migrated"
  }
];

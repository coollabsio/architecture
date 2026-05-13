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
  },
  {
    label: "Checkbox",
    slug: "checkbox",
    href: "/components/checkbox",
    designDoc: "design/forms/checkbox.md",
    status: "Migrated"
  },
  {
    label: "Copy Button",
    slug: "copy-button",
    href: "/components/copy-button",
    designDoc: "design/forms/copy-button.md",
    status: "Migrated"
  },
  {
    label: "Radio Group",
    slug: "radio-group",
    href: "/components/radio-group",
    designDoc: "design/forms/radio-group.md",
    status: "Migrated"
  },
  {
    label: "Switch",
    slug: "switch",
    href: "/components/switch",
    designDoc: "design/forms/switch.md",
    status: "Migrated"
  },
  {
    label: "Badge",
    slug: "badge",
    href: "/components/badge",
    designDoc: "design/status/badge.md",
    status: "Migrated"
  },
  {
    label: "Alert",
    slug: "alert",
    href: "/components/alert",
    designDoc: "design/overlays/alert.md",
    status: "Migrated"
  },
  {
    label: "Tabs",
    slug: "tabs",
    href: "/components/tabs",
    designDoc: "design/navigation/tabs.md",
    status: "Migrated"
  },
  {
    label: "Card",
    slug: "card",
    href: "/components/card",
    designDoc: "design/containers/card.md",
    status: "Migrated"
  }
];

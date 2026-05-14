export type ComponentSample = {
  label: string;
  slug: string;
  href: string;
  designDoc: string;
  status: "Migrated" | "Pending";
};

const allSamples: ComponentSample[] = [
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
    label: "Searchable Dropdown",
    slug: "searchable-dropdown",
    href: "/components/searchable-dropdown",
    designDoc: "design/forms/searchable-dropdown.md",
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
  },
  {
    label: "Status Indicator",
    slug: "status-indicator",
    href: "/components/status-indicator",
    designDoc: "design/status/status-indicator.md",
    status: "Migrated"
  },
  {
    label: "Tag",
    slug: "tag",
    href: "/components/tag",
    designDoc: "design/status/tag.md",
    status: "Migrated"
  },
  {
    label: "Deprecated Badge",
    slug: "deprecated-badge",
    href: "/components/deprecated-badge",
    designDoc: "design/status/deprecated-badge.md",
    status: "Migrated"
  },
  {
    label: "Dialog",
    slug: "dialog",
    href: "/components/dialog",
    designDoc: "design/overlays/modal.md",
    status: "Migrated"
  },
  {
    label: "Confirm Modal",
    slug: "confirm-modal",
    href: "/components/confirm-modal",
    designDoc: "design/overlays/confirm-modal.md",
    status: "Migrated"
  },
  {
    label: "Destructive Confirmation",
    slug: "destructive-confirmation",
    href: "/components/destructive-confirmation",
    designDoc: "design/overlays/modal-confirmation.md",
    status: "Migrated"
  },
  {
    label: "Toast",
    slug: "toast",
    href: "/components/toast",
    designDoc: "design/overlays/toast.md",
    status: "Migrated"
  },
  {
    label: "Loading Spinner",
    slug: "loading-spinner",
    href: "/components/loading-spinner",
    designDoc: "design/feedback/loading-spinner.md",
    status: "Migrated"
  },
  {
    label: "Loading On Button",
    slug: "loading-on-button",
    href: "/components/loading-on-button",
    designDoc: "design/feedback/loading-on-button.md",
    status: "Migrated"
  },
  {
    label: "Callout",
    slug: "callout",
    href: "/components/callout",
    designDoc: "design/overlays/callout.md",
    status: "Migrated"
  },
  {
    label: "Helper Tooltip",
    slug: "helper-tooltip",
    href: "/components/helper-tooltip",
    designDoc: "design/overlays/helper-tooltip.md",
    status: "Migrated"
  },
  {
    label: "Breadcrumbs",
    slug: "breadcrumbs",
    href: "/components/breadcrumbs",
    designDoc: "design/navigation/breadcrumbs.md",
    status: "Migrated"
  },
  {
    label: "External Link",
    slug: "external-link",
    href: "/components/external-link",
    designDoc: "design/navigation/external-link.md",
    status: "Migrated"
  },
  {
    label: "Internal Link",
    slug: "internal-link",
    href: "/components/internal-link",
    designDoc: "design/navigation/internal-link.md",
    status: "Migrated"
  },
  {
    label: "KBD",
    slug: "kbd",
    href: "/components/kbd",
    designDoc: "design/text/kbd.md",
    status: "Migrated"
  },
  {
    label: "Sidebar Navbar",
    slug: "sidebar-navbar",
    href: "/components/sidebar-navbar",
    designDoc: "design/navigation/sidebar-navbar.md",
    status: "Migrated"
  },
  {
    label: "Team Switcher",
    slug: "team-switcher",
    href: "/components/team-switcher",
    designDoc: "design/navigation/sidebar-navbar.md",
    status: "Migrated"
  },
  {
    label: "Theme Switcher",
    slug: "theme-switcher",
    href: "/components/theme-switcher",
    designDoc: "design/navigation/sidebar-navbar.md",
    status: "Migrated"
  },
  {
    label: "Subsidebar",
    slug: "subsidebar",
    href: "/components/subsidebar",
    designDoc: "design/navigation/subsidebar.md",
    status: "Migrated"
  },
  {
    label: "Table",
    slug: "table",
    href: "/components/table",
    designDoc: "design/data/table.md",
    status: "Migrated"
  },
  {
    label: "Slide-over",
    slug: "slide-over",
    href: "/components/slide-over",
    designDoc: "design/overlays/slide-over.md",
    status: "Migrated"
  },
  {
    label: "Popover / Popup",
    slug: "popover",
    href: "/components/popover",
    designDoc: "design/overlays/popup.md",
    status: "Migrated"
  },
  {
    label: "Page Loading",
    slug: "page-loading",
    href: "/components/page-loading",
    designDoc: "design/feedback/page-loading.md",
    status: "Migrated"
  },
  {
    label: "Banner",
    slug: "banner",
    href: "/components/banner",
    designDoc: "design/navigation/banner.md",
    status: "Migrated"
  },
  {
    label: "Scrollbar",
    slug: "scrollbar",
    href: "/components/scrollbar",
    designDoc: "design/utilities/scrollbar.md",
    status: "Migrated"
  },
  {
    label: "Highlighted Text",
    slug: "highlighted-text",
    href: "/components/highlighted-text",
    designDoc: "design/text/highlighted-text.md",
    status: "Migrated"
  },
  {
    label: "Command Palette",
    slug: "command-palette",
    href: "/components/command-palette",
    designDoc: "design/search/command-palette.md",
    status: "Migrated"
  },
  {
    label: "Tooltip Variants",
    slug: "tooltip",
    href: "/components/tooltip",
    designDoc: "design/overlays/tooltip.md",
    status: "Migrated"
  },
  {
    label: "Form Composition",
    slug: "form-composition",
    href: "/components/form-composition",
    designDoc: "design/forms/form-composition.md",
    status: "Migrated"
  },
  {
    label: "Form Success State",
    slug: "form-composition-success",
    href: "/components/form-composition-success",
    designDoc: "design/forms/form-composition.md",
    status: "Migrated"
  },
  {
    label: "Form Error State",
    slug: "form-composition-error",
    href: "/components/form-composition-error",
    designDoc: "design/forms/form-composition.md",
    status: "Migrated"
  },
  {
    label: "TOTP Challenge",
    slug: "totp-challenge",
    href: "/pages/totp-challenge",
    designDoc: "design/auth/totp-challenge.md",
    status: "Migrated"
  },
  {
    label: "Login Page",
    slug: "login-page",
    href: "/pages/login-page",
    designDoc: "design/auth/login-page.md",
    status: "Migrated"
  },
  {
    label: "Register Page",
    slug: "register-page",
    href: "/pages/register-page",
    designDoc: "design/auth/register-page.md",
    status: "Migrated"
  },
  {
    label: "Forgot Password Page",
    slug: "forgot-password-page",
    href: "/pages/forgot-password-page",
    designDoc: "design/auth/forgot-password-page.md",
    status: "Migrated"
  },
  {
    label: "Reset Password Page",
    slug: "reset-password-page",
    href: "/pages/reset-password-page",
    designDoc: "design/auth/reset-password-page.md",
    status: "Migrated"
  },
  {
    label: "Confirm Password Page",
    slug: "confirm-password-page",
    href: "/pages/confirm-password-page",
    designDoc: "design/auth/confirm-password-page.md",
    status: "Migrated"
  },
  {
    label: "Email Verification Page",
    slug: "email-verification-page",
    href: "/pages/email-verification-page",
    designDoc: "design/auth/email-verification-page.md",
    status: "Migrated"
  },
  {
    label: "Main View",
    slug: "main-view",
    href: "/pages/main-view",
    designDoc: "design/layouts/main-view.md",
    status: "Migrated"
  },
  {
    label: "Settings Page",
    slug: "settings-page",
    href: "/pages/settings-page",
    designDoc: "design/pages/settings-page.md",
    status: "Migrated"
  },
  {
    label: "Full Application Page",
    slug: "full-application-page",
    href: "/pages/full-application-page",
    designDoc: "design/pages/full-application-page.md",
    status: "Migrated"
  }
];

const pageSampleSlugs = new Set([
  "totp-challenge",
  "login-page",
  "register-page",
  "forgot-password-page",
  "reset-password-page",
  "confirm-password-page",
  "email-verification-page",
  "main-view",
  "settings-page",
  "full-application-page"
]);

export const pageSamples = allSamples.filter((sample) => pageSampleSlugs.has(sample.slug));
export const componentSamples = allSamples.filter((sample) => !pageSampleSlugs.has(sample.slug));
export const allComponentSamples = allSamples;

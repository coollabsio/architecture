# Prompt Test: Generate a Sample Layout from Design Markdown

You are an implementation agent testing whether the design-system Markdown files are clear enough to build from.

Your job is to read the local design docs and generate a sample Shadcn-Svelte mockup that demonstrates the documented design system without inventing undocumented styling.

## Inputs to read first

Read these files in order:

1. `DESIGN_V2.md`
2. Every component file marked `Migrated` in `DESIGN_V2.md`
Current migrated component docs:

- `design/forms/button.md`
- `design/forms/dropdown.md`
- `design/forms/input.md`
- `design/forms/form-field.md`
- `design/forms/select.md`
- `design/forms/textarea.md`
- `design/forms/checkbox.md`
- `design/forms/copy-button.md`
- `design/forms/radio-group.md`
- `design/forms/switch.md`
- `design/status/badge.md`
- `design/overlays/alert.md`
- `design/navigation/tabs.md`
- `design/containers/card.md`
- `design/status/status-indicator.md`
- `design/status/tag.md`
- `design/status/deprecated-badge.md`
- `design/overlays/toast.md`
- `design/feedback/loading-spinner.md`
- `design/feedback/loading-on-button.md`
- `design/overlays/callout.md`
- `design/overlays/helper-tooltip.md`
- `design/navigation/breadcrumbs.md`
- `design/navigation/external-link.md`
- `design/navigation/internal-link.md`
- `design/text/kbd.md`
- `design/navigation/sidebar-navbar.md`

## Goal

Create a small sample application screen that shows how an upcoming Shadcn-Svelte project should look if it follows the V2 design docs.

The sample should be a realistic operator/dashboard UI, not a generic component gallery.

Use this scenario:

> A self-hosted app dashboard for managing services, deployments, and environment settings.

## Required screen content

Generate one coherent page containing:

- App shell with a left navigation area or sidebar-like column.
- Main content area with page title and short description.
- At least two cards or surface sections.
- A service/deployment status area.
- A settings/action area.
- A footer or secondary action row.

## Required Button demonstrations

Because `button.md` is migrated, the screen must demonstrate the Button spec clearly:

- Default button.
- Highlighted/primary/promoted button using `variant="highlighted"`.
- Destructive button using `variant="destructive"`.
- Loading button with spinner inside the button.
- Icon-only button with an accessible name.
- Link styled as a button or anchor using `buttonVariants(...)`.
- Disabled button that remains readable in light mode.


## Required Dropdown demonstrations

Because `dropdown.md` is migrated, the screen must demonstrate the Dropdown Menu spec clearly:

- Shadcn-Svelte-style `Dropdown Menu` primitive or local wrapper.
- Trigger using the V2 Button component.
- Content with compact bordered `p-1` surface.
- Default menu items.
- Touch-sized menu item.
- Disabled item.
- Danger/destructive item.
- Light hover/focus and dark purple hover/focus behavior.

## Required Input demonstrations

Because `input.md` is migrated, the screen must demonstrate the Input spec clearly:

- Shadcn-Svelte-style `Input` primitive or local wrapper.
- Default input.
- Focus/dirty visual state using `data-dirty="true"` or a `dirty` prop.
- Disabled input with no inset shadow.
- Readonly input with no inset shadow.
- Password input hiding value by default, with eye/eye-off toggle behavior, reserving `pr-[2.4rem]`.
- Form label with required marker and circled info helper icon using Tooltip behavior.
- Sticky input variant with thinner 1px simulated border.

## Required Select demonstrations

Because `select.md` is migrated, the screen must demonstrate the Select spec clearly:

- Native select wrapper or Shadcn-Svelte Select trigger styled according to `design/forms/select.md`, and `design/forms/textarea.md`, and `design/forms/checkbox.md`, and `design/forms/copy-button.md`, `design/forms/radio-group.md`, `design/forms/switch.md`, `design/status/badge.md`, `design/overlays/alert.md`, `design/navigation/tabs.md`, and `design/containers/card.md`.
- Default select.
- Dirty select using `data-dirty="true"` or a `dirty` prop.
- Disabled select with no inset shadow.
- Stacked up/down chevron, black in light mode and white in dark mode.
- Form Field label/helper composition around at least one select.

## Required Textarea demonstrations

Because `textarea.md` is migrated, the screen must demonstrate the Textarea spec clearly:

- Shadcn-Svelte-style `Textarea` primitive or local wrapper.
- Default mono textarea.
- Dirty textarea using `data-dirty="true"` or a `dirty` prop.
- Disabled and readonly textareas with no inset shadow.
- Optional `allowTab` textarea that inserts two spaces on Tab.
- Form Field label/helper composition around at least one textarea.

## Required Checkbox demonstrations

Because `checkbox.md` is migrated, the screen must demonstrate the Checkbox spec clearly:

- Shadcn-Svelte-style `Checkbox` primitive or local wrapper.
- Checked, unchecked, and disabled states.
- Focus-visible ring behavior.
- Row composition with label text on the left and checkbox on the right.
- Long label wrapping without shrinking the checkbox.

## Required Copy Button demonstrations

Because `copy-button.md` is migrated, the screen must demonstrate the Copy Button spec clearly:

- Readonly Input plus absolute-positioned copy icon button.
- Secure-context clipboard check before rendering or activating copy.
- Copy icon default state.
- Green check copied state for 1 second.
- Input right padding so value text does not sit under the icon.
- Accessible `aria-label` and `title`.

## Required Radio Group demonstrations

Because `radio-group.md` is migrated, the screen must demonstrate compact single-choice rows with circular `size-4` controls, inner-dot selected state, disabled option, and long-label wrapping.

## Required Switch demonstrations

Because `switch.md` is migrated, the screen must demonstrate compact immediate on/off rows, `w-8 h-4` track, `size-3` thumb, checked/unchecked/disabled states, and accessible labels.

## Required Badge demonstrations

Because `badge.md` is migrated, the screen must demonstrate default, success, warning, error, outline, and accent badge variants with `h-5`, `text-xs`, `rounded-sm` density.

## Required Alert demonstrations

Because `alert.md` is migrated, the screen must demonstrate default/info, success, warning, and destructive inline alerts with compact bordered surfaces and `role="alert"` for urgent errors.

## Required Tabs demonstrations

Because `tabs.md` is migrated, the screen must demonstrate compact `h-8 px-2` tab triggers, active/inactive states, and panel content without large pill styling.

## Required Card demonstrations

Because `card.md` is migrated, the screen must demonstrate compact `rounded-sm border p-4` operational surfaces with header/content/footer composition.

## Implementation rules

- Use Shadcn-Svelte primitives as the base.
- For Button, use the local Shadcn-Svelte `Button` primitive and extend `buttonVariants(...)` according to `design/forms/button.md`.
- For Dropdown, use the local Shadcn-Svelte `Dropdown Menu` primitive and extend its content/item classes according to `design/forms/dropdown.md`.
- For Input, use the local Shadcn-Svelte `Input` primitive and extend its inset shadow/dirty-state classes according to `design/forms/input.md`, and `design/forms/form-field.md`, and `design/forms/select.md`, and `design/forms/textarea.md`, and `design/forms/checkbox.md`, and `design/forms/copy-button.md`, `design/forms/radio-group.md`, `design/forms/switch.md`, `design/status/badge.md`, `design/overlays/alert.md`, `design/navigation/tabs.md`, and `design/containers/card.md`.
- For form labels/helper icons, compose Label + Tooltip according to `design/forms/form-field.md`; do not bake helper behavior into raw Input.
- For Select, use a native select wrapper for simple forms or Shadcn-Svelte Select for complex cases; style it according to `design/forms/select.md`, and `design/forms/textarea.md`, and `design/forms/checkbox.md`, and `design/forms/copy-button.md`, `design/forms/radio-group.md`, `design/forms/switch.md`, `design/status/badge.md`, `design/overlays/alert.md`, `design/navigation/tabs.md`, and `design/containers/card.md`.
- For Textarea, use Shadcn-Svelte `Textarea` with mono typography and the same inset shadow/dirty-state system according to `design/forms/textarea.md`, and `design/forms/checkbox.md`, and `design/forms/copy-button.md`, `design/forms/radio-group.md`, `design/forms/switch.md`, `design/status/badge.md`, `design/overlays/alert.md`, `design/navigation/tabs.md`, and `design/containers/card.md`.
- For Checkbox, use Shadcn-Svelte `Checkbox` with right-aligned row composition according to `design/forms/checkbox.md`, and `design/forms/copy-button.md`, `design/forms/radio-group.md`, `design/forms/switch.md`, `design/status/badge.md`, `design/overlays/alert.md`, `design/navigation/tabs.md`, and `design/containers/card.md`.
- For Copy Button, compose readonly Input plus icon Button according to `design/forms/copy-button.md`.
- Do not use Laravel, Blade, Livewire, Alpine, PHP, or unrelated project-specific implementation details.
- Do not use raw boolean attributes like `isHighlighted` or `isError`.
- Do not invent new component specs for pending components.
- For pending components, create simple local markup only as needed; keep the focus on testing migrated Button, Dropdown, Input, Form Field, Select, Textarea, Checkbox, Copy Button, Radio Group, Switch, Badge, Status Indicator, Tag, Deprecated Badge, Alert, Toast, Loading Spinner, Loading On Button, Callout, Helper Tooltip, Breadcrumbs, External Link, Internal Link, KBD, Sidebar Navbar, Tabs, and Card components and do not invent detailed specs.
- Use Tailwind utilities and Shadcn-Svelte conventions.
- Keep the design dense, dark-first, sharp, and utilitarian.
- Use 4px radius by default (`rounded-sm`).
- Use purple accent in light mode and yellow accent in dark mode.
- Do not use gradients, soft rounded cards, large shadows, or decorative effects.

## Visual constraints

Follow these visual decisions from the docs:

- Default density: compact controls, `h-8` buttons, `px-2`, `gap-2`, `text-sm`.
- Default radius: `rounded-sm`.
- Default button dark surface: `dark:bg-coolgray-100`.
- Default button dark hover: `dark:hover:bg-coolgray-200`.
- Focus ring: `ring-coollabs` in light mode and `dark:ring-warning` in dark mode.
- Highlighted button may use purple fill/hover in dark mode because it is a documented exception.
- Destructive button uses red/error styling.
- Loading spinner inside a text button comes after the label (`Saving <Spinner />`), inherits light-mode text color, and uses `dark:text-warning` in dark mode. Disabled/loading buttons must remain clearly visible in light mode.
- Dropdown content uses `border-neutral-300 bg-white p-1 shadow-sm dark:border-coolgray-300 dark:bg-coolgray-200`.
- Dropdown items use `text-xs py-1 pl-2 pr-4 gap-2`; touch items use `min-h-10 px-3 py-2 text-sm`.
- Inputs use inset `box-shadow` rather than borders, with a 4px focus/dirty bar and no shadow when disabled/readonly.
- Selects use the same inset shadow system as Input and the stacked up/down chevron; do not use a single down chevron.
- Textareas use mono typography and the same inset shadow/dirty-bar system as Input.
- Checkboxes are size-4, rounded-sm, purple checked fill, and use purple/yellow focus rings.
- Copy Buttons compose readonly Input plus absolute icon; copied state uses a green check for 1 second.
- Radio Groups use circular size-4 controls with inner-dot selected state.
- Switches use compact w-8 h-4 tracks and size-3 thumbs.
- Badges are h-5, text-xs, rounded-sm semantic labels.
- Alerts are compact bordered p-3 inline surfaces.
- Tabs use h-8 px-2 rounded-sm triggers with clear active state.
- Cards use rounded-sm border p-4 and no heavy shadow.
- Status Indicators use size-2 semantic dots with text.
- Tags and Deprecated Badges build on Badge density.
- Toasts are compact bordered rounded-sm Sonner-style surfaces.
- Loading states use size-4 Spinner and Button + label-then-spinner composition with aria-busy.
- Callouts are non-urgent compact help blocks, distinct from Alerts.
- Helper Tooltips use visible info icons and fit-to-content tooltip sizing.
- Breadcrumbs use ordered navigation with aria-current.
- External/Internal Links preserve anchor semantics; external links include icon/new-tab attrs.
- KBD uses semantic kbd elements with h-5 mono styling.
- Sidebar Navbar uses Shadcn-Svelte Sidebar semantics, dense nav rows, collapsed icon-only mode, yellow dark active state, and border-separated app shell.

## Deliverables

Produce code for a minimal local Shadcn-Svelte implementation. Use Bun for the mockup sandbox commands and lockfile.

Preferred output format:

1. Brief plan, maximum 5 bullets.
2. File tree.
3. Code blocks for each changed/created file.
4. Short explanation of how the output follows `DESIGN_V2.md`, `design/forms/button.md`, `design/forms/dropdown.md`, and `design/forms/input.md`, and `design/forms/form-field.md`, and `design/forms/select.md`, and `design/forms/textarea.md`, and `design/forms/checkbox.md`, and `design/forms/copy-button.md`, `design/forms/radio-group.md`, `design/forms/switch.md`, `design/status/badge.md`, `design/overlays/alert.md`, `design/navigation/tabs.md`, and `design/containers/card.md`.
5. Short self-review checklist showing which Button requirements are satisfied.

If you are working inside a real repo, create or update files directly instead of only printing code.

## Suggested file structure

If no app exists yet, create a small mockup sandbox under:

```txt
mockups/shadcn-svelte-sample/
  README.md
  package.json
  bun.lock
  src/routes/+page.svelte
  src/lib/components/ui/button/index.ts
  src/lib/components/ui/button/button.svelte
  src/lib/components/ui/spinner/index.ts
  src/lib/components/ui/spinner/spinner.svelte
  src/lib/components/ui/dropdown-menu/index.ts
  src/lib/components/ui/dropdown-menu/dropdown-menu.svelte
  src/lib/components/ui/input/index.ts
  src/lib/components/ui/input/input.svelte
  src/lib/components/ui/input/password-input.svelte
  src/lib/components/ui/form-field/index.ts
  src/lib/components/ui/form-field/form-field.svelte
  src/lib/components/ui/select/index.ts
  src/lib/components/ui/select/native-select.svelte
  src/lib/components/ui/textarea/index.ts
  src/lib/components/ui/textarea/textarea.svelte
  src/lib/components/ui/checkbox/index.ts
  src/lib/components/ui/checkbox/checkbox.svelte
  src/lib/components/ui/checkbox/checkbox-row.svelte
  src/lib/components/ui/copy-button/index.ts
  src/lib/components/ui/copy-button/copy-button.svelte
  src/lib/utils.ts
```

The exact structure may vary if the existing project already has a SvelteKit/Shadcn-Svelte layout.

## Acceptance criteria

The generated result is successful if:

- It can be inspected as a realistic dashboard screen.
- It uses Shadcn-Svelte-style Button primitives/variants.
- It demonstrates all required Button states/variants.
- It demonstrates all required Dropdown content/item states.
- It demonstrates all required Input states, including dirty, disabled, readonly, password show/hide, password spacing, and sticky.
- It demonstrates form label composition with required marker and helper icon tooltip.
- It demonstrates Select default, dirty, disabled, and stacked-chevron states.
- It demonstrates Textarea default, dirty, disabled, readonly, mono typography, and allowTab behavior.
- It demonstrates Checkbox checked, unchecked, disabled, focus ring, and row composition.
- It demonstrates Copy Button readonly field, secure clipboard behavior, accessible icon button, and copied state.
- It avoids Livewire/Blade/Laravel-specific implementation details.
- It does not introduce undocumented visual language such as gradients, large radius, or heavy shadows.
- The screen feels compact, dark-first, utilitarian, and operational.

## Failure signals

The generated result should be considered a design-doc failure if the AI:

- Ignores `DESIGN_V2.md` or `button.md`.
- Uses `isHighlighted` / `isError` instead of Shadcn-style variants.
- Builds a generic Shadcn default UI without Coolify density/colors.
- Makes the button height/radius inconsistent with the spec.
- Makes disabled or loading buttons too faint to read in light mode.
- Builds a generic dropdown that misses compact `p-1`, `text-xs`, bordered content, or dark purple item hover/focus.
- Builds a generic bordered/ringed input instead of the inset box-shadow + dirty-bar input.
- Shows password values by default or omits the eye/eye-off visibility toggle.
- Uses a generic select with normal borders or a single down chevron instead of the V2 select styling.
- Uses a generic sans textarea or normal borders instead of mono + inset shadow styling.
- Uses checkbox styling that looks like a switch, has wrong focus ring colors, or lets labels shrink the checkbox.
- Renders Copy Button in insecure contexts, lacks copied-state feedback, or lets text overlap the copy icon.
- Uses an eye icon for helper information instead of a circled info icon.
- Uses purple as the general dark-mode accent outside documented exceptions.
- Adds gradients, large rounded corners, large shadows, or decorative marketing UI.
- Introduces Livewire, Blade, Laravel, or PHP concepts.

## Reviewer notes

When reviewing the output, evaluate the Markdown docs, not only the generated UI.

If the output is wrong, ask:

- Was the prompt unclear?
- Was `DESIGN_V2.md` unclear?
- Was `design/forms/button.md` too implementation-heavy or too vague?
- Was `design/forms/dropdown.md` too implementation-heavy or too vague?
- Was `design/forms/input.md` too implementation-heavy or too vague?
- Was `design/forms/form-field.md` too implementation-heavy or too vague?
- Was `design/forms/select.md` too implementation-heavy or too vague?
- Was `design/forms/textarea.md` too implementation-heavy or too vague?
- Was `design/forms/checkbox.md` too implementation-heavy or too vague?
- Was `design/forms/copy-button.md` too implementation-heavy or too vague?
- Did the Button doc leave missing variant/size details?
- Should pending components get temporary guidance before full migration?

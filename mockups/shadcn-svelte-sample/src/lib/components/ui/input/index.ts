import Input from "./input.svelte";
import PasswordInput from "./password-input.svelte";

export const inputBaseClass =
  "block w-full rounded-sm border-0 bg-white px-3 py-1.5 text-sm text-black placeholder:text-neutral-300 focus-visible:outline-none disabled:bg-neutral-200 disabled:text-neutral-700 read-only:bg-neutral-200 read-only:text-neutral-700 dark:bg-coolgray-100 dark:text-white dark:placeholder:text-neutral-700 dark:disabled:bg-coolgray-100/40 dark:read-only:bg-coolgray-100/40 dark:read-only:text-neutral-500";

export const inputShadowClass =
  "[box-shadow:inset_4px_0_0_transparent,inset_0_0_0_2px_#e5e5e5] dark:[box-shadow:inset_4px_0_0_transparent,inset_0_0_0_2px_#242424] focus-visible:[box-shadow:inset_4px_0_0_#6b16ed,inset_0_0_0_2px_#e5e5e5] dark:focus-visible:[box-shadow:inset_4px_0_0_#fcd452,inset_0_0_0_2px_#242424] data-[dirty=true]:[box-shadow:inset_4px_0_0_#6b16ed,inset_0_0_0_2px_#e5e5e5] dark:data-[dirty=true]:[box-shadow:inset_4px_0_0_#fcd452,inset_0_0_0_2px_#242424] disabled:[box-shadow:none] read-only:[box-shadow:none]";

export const inputStickyShadowClass =
  "[box-shadow:inset_4px_0_0_transparent,inset_0_0_0_1px_#e5e5e5] dark:[box-shadow:inset_4px_0_0_transparent,inset_0_0_0_1px_#242424] focus-visible:[box-shadow:inset_4px_0_0_#6b16ed,inset_0_0_0_1px_#e5e5e5] dark:focus-visible:[box-shadow:inset_4px_0_0_#fcd452,inset_0_0_0_1px_#242424] data-[dirty=true]:[box-shadow:inset_4px_0_0_#6b16ed,inset_0_0_0_1px_#e5e5e5] dark:data-[dirty=true]:[box-shadow:inset_4px_0_0_#fcd452,inset_0_0_0_1px_#242424] disabled:[box-shadow:none] read-only:[box-shadow:none]";

export const inputGhostClass =
  "!border-0 !bg-transparent !shadow-none ![box-shadow:none] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-coollabs focus-visible:![box-shadow:none] data-[dirty=true]:![box-shadow:none] disabled:!bg-transparent read-only:!bg-transparent dark:!bg-transparent dark:focus-visible:outline-warning dark:disabled:!bg-transparent dark:read-only:!bg-transparent";

export { Input, PasswordInput };

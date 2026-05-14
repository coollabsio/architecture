<script lang="ts">
  import type { HTMLTextareaAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  import { textareaBaseClass, textareaGhostClass, textareaShadowClass } from "./index.js";

  type $$Props = HTMLTextareaAttributes & {
    dirty?: boolean;
    allowTab?: boolean;
    ghost?: boolean;
  };

  export let dirty: boolean = false;
  export let allowTab: boolean = false;
  export let ghost: boolean = false;
  let className: $$Props["class"] = undefined;
  export { className as class };

  function handleKeydown(event: KeyboardEvent) {
    if (!allowTab || event.key !== "Tab") {
      return;
    }

    const textarea = event.currentTarget as HTMLTextAreaElement;
    event.preventDefault();
    textarea.setRangeText("  ", textarea.selectionStart, textarea.selectionEnd, "end");
  }
</script>

<textarea
  data-dirty={dirty ? "true" : undefined}
  data-ghost={ghost ? "true" : undefined}
  class={cn(textareaBaseClass, ghost ? textareaGhostClass : textareaShadowClass, className)}
  onkeydown={handleKeydown}
  {...$$restProps}
>
  <slot />
</textarea>

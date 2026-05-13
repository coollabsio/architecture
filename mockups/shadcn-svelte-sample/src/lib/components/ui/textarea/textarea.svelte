<script lang="ts">
  import type { HTMLTextareaAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  import { textareaBaseClass, textareaShadowClass } from "./index.js";

  type $$Props = HTMLTextareaAttributes & {
    dirty?: boolean;
    allowTab?: boolean;
  };

  export let dirty: boolean = false;
  export let allowTab: boolean = false;
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
  class={cn(textareaBaseClass, textareaShadowClass, className)}
  onkeydown={handleKeydown}
  {...$$restProps}
>
  <slot />
</textarea>

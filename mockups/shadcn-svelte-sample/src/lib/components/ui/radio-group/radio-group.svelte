<script lang="ts">
  import type { RadioOption } from "./index.js";
  import RadioRow from "./radio-row.svelte";

  export let name = "radio-group";
  export let value = "";
  export let options: RadioOption[] = [];
</script>

<div class="space-y-1" role="radiogroup">
  {#each options as option}
    <RadioRow {name} bind:value optionValue={option.value} label={option.label} description={option.description} disabled={option.disabled} />
  {/each}
</div>

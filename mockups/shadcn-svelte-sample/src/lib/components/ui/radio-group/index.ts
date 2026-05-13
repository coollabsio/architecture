import RadioGroup from "./radio-group.svelte";
import RadioRow from "./radio-row.svelte";

export { RadioGroup, RadioRow };

export type RadioOption = {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
};

// Not all macroConditions are in a position where {{ @glint-expect-error }} can be placed.
// Using these globals, we can hide the errors in the templates, but we must be mindful to import
// the functions when used in a script file.
declare global {
  function macroCondition(condition: boolean): boolean;
  function macroGetOwnConfig(key: string): boolean;
}

export interface EmberBootstrapMacrosConfig {
  isBS4: boolean;
  version: string;
}

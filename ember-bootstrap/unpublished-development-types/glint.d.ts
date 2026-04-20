import '@glint/environment-ember-loose';

import type { EmbroiderMacrosRegistry } from '@embroider/macros';
import type { EmbroiderUtilRegistry } from '@embroider/util';
import type EmberElementHelperRegistry from 'ember-element-helper/template-registry';
import type EmberFocusTrapRegistry from 'ember-focus-trap/template-registry';
// We should avoid `@ember/render-modifiers` as it is an outdated pattern. But as long
// as we haven't had the time refactoring away from it, we need the types.
//
// eslint-disable-next-line ember/no-at-ember-render-modifiers
import type RenderModifiersRegistry from '@ember/render-modifiers/template-registry';
import type RenderHelpersRegistry from 'ember-render-helpers/template-registry';
import type EmberStyleModifierRegistry from 'ember-style-modifier/template-registry';

import type { HelperLike } from '@glint/template';
import { EmberBootstrapMacrosConfig } from '../src/macros-config.ts';

type macroGetOwnConfig = HelperLike<{
  Args: {
    Positional: [keyof EmberBootstrapMacrosConfig];
  };
  Return: boolean;
}>;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends EmberElementHelperRegistry,
      EmberFocusTrapRegistry,
      EmberStyleModifierRegistry,
      EmbroiderUtilRegistry,
      RenderModifiersRegistry,
      RenderHelpersRegistry {
    macroGetOwnConfig: macroGetOwnConfig;
    macroCondition: EmbroiderMacrosRegistry['macroCondition'];
  }
}

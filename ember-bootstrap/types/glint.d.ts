import '@glint/environment-ember-loose';

import type EmberBootstrapRegistry from 'ember-bootstrap/template-registry';
import type { EmbroiderMacrosRegistry } from '@embroider/macros';
import type RenderModifiersRegistry from '@ember/render-modifiers/template-registry';
import type EmberStyleModifierRegistry from 'ember-style-modifier/template-registry';
import type sizeClassHelper from 'ember-bootstrap/helpers/bs-size-class';
import type typeClassHelper from 'ember-bootstrap/helpers/bs-type-class';
import type defaultHelper from 'ember-bootstrap/helpers/bs-default';

import type { HelperLike } from '@glint/template';
import type { EmberBootstrapMacrosConfig } from './macros-config';
import type { EmbroiderUtilRegistry } from '@embroider/util';

type macroGetOwnConfig = HelperLike<{
  Args: {
    Positional: [keyof EmberBootstrapMacrosConfig];
  };
  Return: boolean;
}>;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends EmberBootstrapRegistry,
      EmberStyleModifierRegistry,
      RenderModifiersRegistry,
      EmbroiderUtilRegistry {
    'bs-size-class': typeof sizeClassHelper;
    'bs-type-class': typeof typeClassHelper;
    'bs-default': typeof defaultHelper;

    'did-insert': HelperLike<{
      Args: { Positional: [() => void] };
      Return: undefined;
    }>;
    'did-update': HelperLike<{
      Args: { Positional: [() => void, unknown] };
      Return: undefined;
    }>;

    macroGetOwnConfig: macroGetOwnConfig;
    macroCondition: EmbroiderMacrosRegistry['macroCondition'];
  }
}

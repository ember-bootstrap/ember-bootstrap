import '@glint/environment-ember-loose';

import type EmberBootstrapRegistry from 'ember-bootstrap/template-registry';
import type { EmbroiderMacrosRegistry } from '@embroider/macros';
import type { EmbroiderUtilRegistry } from '@embroider/util';
import type RenderModifiersRegistry from '@ember/render-modifiers/template-registry';
import type EmberElementHelperRegistry from 'ember-element-helper/template-registry';
import type EmberPopperModifierRegistry from 'ember-popper-modifier/template-registry';
import type EmberStyleModifierRegistry from 'ember-style-modifier/template-registry';
import type BsLinkToComponent from 'ember-bootstrap/components/bs-link-to';
import type bsDefaultHelper from 'ember-bootstrap/helpers/bs-default';
import type sizeClassHelper from 'ember-bootstrap/helpers/bs-size-class';
import type typeClassHelper from 'ember-bootstrap/helpers/bs-type-class';
import type BsConditionalAttribute from 'ember-bootstrap/modifiers/bs-conditional-attribute';

import type { HelperLike } from '@glint/template';
import type { EmberBootstrapMacrosConfig } from './macros-config';

type macroGetOwnConfig = HelperLike<{
  Args: {
    Positional: [keyof EmberBootstrapMacrosConfig];
  };
  Return: boolean;
}>;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends EmberBootstrapRegistry,
      EmberElementHelperRegistry,
      EmberPopperModifierRegistry,
      EmberStyleModifierRegistry,
      EmbroiderUtilRegistry,
      RenderModifiersRegistry {
    'bs-default': typeof bsDefaultHelper;
    'bs-link-to': typeof BsLinkToComponent;
    'bs-size-class': typeof sizeClassHelper;
    'bs-type-class': typeof typeClassHelper;
    'bs-conditional-attribute': typeof BsConditionalAttribute;

    macroGetOwnConfig: macroGetOwnConfig;
    macroCondition: EmbroiderMacrosRegistry['macroCondition'];
  }
}

import '@glint/environment-ember-loose';

import type EmberBootstrapRegistry from 'ember-bootstrap/template-registry';
import type { EmbroiderMacrosRegistry } from '@embroider/macros';
import type { EmbroiderUtilRegistry } from '@embroider/util';
import type EmberElementHelperRegistry from 'ember-element-helper/template-registry';
import type EmberPopperModifierRegistry from 'ember-popper-modifier/template-registry';
import type RenderModifiersRegistry from '@ember/render-modifiers/template-registry';
import type RenderHelpersRegistry from 'ember-render-helpers/template-registry';
import type EmberStyleModifierRegistry from 'ember-style-modifier/template-registry';
import type defaultHelper from 'ember-bootstrap/helpers/bs-default';
import type eqHelper from 'ember-bootstrap/helpers/bs-eq';
import type noopHelper from 'ember-bootstrap/helpers/bs-noop';
import type sizeClassHelper from 'ember-bootstrap/helpers/bs-size-class';
import type typeClassHelper from 'ember-bootstrap/helpers/bs-type-class';
import type BsConditionalAttribute from 'ember-bootstrap/modifiers/bs-conditional-attribute';

import type { HelperLike } from '@glint/template';
import type { EmberBootstrapMacrosConfig } from './macros-config';
import type BsAccordionItem from 'ember-bootstrap/components/bs-accordion/item';
import type BsAccordionItemBody from 'ember-bootstrap/components/bs-accordion/item/body';
import type BsAccordionItemTitle from 'ember-bootstrap/components/bs-accordion/item/title';
import type BsButton from 'ember-bootstrap/components/bs-button';
import type BsModalHeaderClose from 'ember-bootstrap/components/bs-modal/header/close';
import type BsModalHeaderTitle from 'ember-bootstrap/components/bs-modal/header/title';
import type BsModalHeader from 'ember-bootstrap/components/bs-modal/header';
import type BsModalBody from 'ember-bootstrap/components/bs-modal/body';
import type BsModalFooter from 'ember-bootstrap/components/bs-modal/footer';
import type BsModalDialog from 'ember-bootstrap/components/bs-modal/footer';
import type BsProgressBar from 'ember-bootstrap/components/bs-progress/bar';

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
      RenderModifiersRegistry,
      RenderHelpersRegistry {
    'bs-default': typeof defaultHelper;
    'bs-eq': typeof eqHelper;
    'bs-noop': typeof noopHelper;
    'bs-size-class': typeof sizeClassHelper;
    'bs-type-class': typeof typeClassHelper;
    'bs-conditional-attribute': typeof BsConditionalAttribute;
    'bs-accordion/item': typeof BsAccordionItem;
    'bs-accordion/item/body': typeof BsAccordionItemBody;
    'bs-accordion/item/title': typeof BsAccordionItemTitle;
    'bs-button': typeof BsButton;
    'bs-modal/header/close': typeof BsModalHeaderClose;
    'bs-modal/header/title': typeof BsModalHeaderTitle;
    'bs-modal/header': typeof BsModalHeader;
    'bs-modal/body': typeof BsModalBody;
    'bs-modal/footer': typeof BsModalFooter;
    'bs-modal/dialog': typeof BsModalDialog;
    'bs-progress/bar': typeof BsProgressBar;

    macroGetOwnConfig: macroGetOwnConfig;
    macroCondition: EmbroiderMacrosRegistry['macroCondition'];
  }
}

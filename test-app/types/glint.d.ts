import '@glint/environment-ember-loose';

import type EmberBootstrapRegistry from 'ember-bootstrap/template-registry';
import type BsConditionalAttribute from 'ember-bootstrap/modifiers/bs-conditional-attribute';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends EmberBootstrapRegistry {
    'bs-conditional-attribute': typeof BsConditionalAttribute;
  }
}

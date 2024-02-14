import '@glint/environment-ember-loose';

import type EmberBootstrapRegistry from 'ember-bootstrap/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends EmberBootstrapRegistry {}
}

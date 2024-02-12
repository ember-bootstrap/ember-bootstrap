import 'ember-source/types';
import 'ember-source/types/stable';
import '@glint/environment-ember-loose';

import EmberBootstrapRegistry from 'ember-bootstrap/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends EmberBootstrapRegistry {}
}

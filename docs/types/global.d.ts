import '@glint/environment-ember-loose';

import EmberBootstrapRegistry from '../../addon/template-registry';
import { ComponentLike } from '@glint/template';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends EmberBootstrapRegistry {
    CodeSnippet: ComponentLike<{
      Args: {
        name?: string;
        dynamicProperties?: Array<unknown>;
      };
    }>;
  }
}

// Types for compiled templates
declare module 'ember-bootstrap-docs/templates/*' {
  import { TemplateFactory } from 'ember-cli-htmlbars';

  const tmpl: TemplateFactory;
  export default tmpl;
}

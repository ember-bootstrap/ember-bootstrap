import '@glint/environment-ember-loose';
import EmberBootstrapRegistry from '../addon/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends EmberBootstrapRegistry {}
}

// Types for compiled templates
declare module 'ember-bootstrap/templates/*' {
  // import { TemplateFactory } from 'ember-cli-htmlbars';
  interface TemplateFactory {
    __htmlbars_inline_precompile_template_factory: any;
  }

  const tmpl: TemplateFactory;
  export default tmpl;
}

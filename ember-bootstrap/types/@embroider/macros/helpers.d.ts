import type { HelperLike } from '@glint/template';
import type { EmberBootstrapMacrosConfig } from 'ember-bootstrap/macros-config';

const macroGetOwnConfig: HelperLike<{
  Args: {
    Positional: [keyof EmberBootstrapMacrosConfig];
  };
  Return: boolean;
}>;

export { macroGetOwnConfig };

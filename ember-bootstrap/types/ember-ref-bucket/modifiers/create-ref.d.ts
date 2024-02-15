import { ModifierLike } from '@glint/template';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'create-ref': ModifierLike<{
      Args: {
        Positional: [string];
      };
    }>;
  }
}

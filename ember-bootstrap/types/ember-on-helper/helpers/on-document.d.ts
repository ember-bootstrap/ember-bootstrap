import { HelperLike } from '@glint/template';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'on-document': HelperLike<{
      Args: {
        Positional: [
          string,
          (event: Event) => void,
          { capture?: boolean }?,
        ];
      };
      Return: void;
    }>;
  }
}

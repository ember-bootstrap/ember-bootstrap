import { HelperLike } from '@glint/template';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'on-window': HelperLike<{
      Args: {
        Positional: [event: keyof WindowEventMap, listener: () => void];
      };
      Return: string;
    }>;
  }
}

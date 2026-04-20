import { HelperLike } from '@glint/template';

export default HelperLike<{
  Args: {
    Positional: [event: keyof WindowEventMap, listener: () => void];
  };
  Return: string;
}>;

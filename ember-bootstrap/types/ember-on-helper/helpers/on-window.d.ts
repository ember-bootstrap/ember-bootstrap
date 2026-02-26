import { HelperLike } from '@glint/template';

const onWindow: HelperLike<{
  Args: {
    Positional: [event: keyof WindowEventMap, listener: () => void];
  };
  Return: string;
}>;

export default onWindow;

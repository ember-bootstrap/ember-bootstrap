import { ModifierLike } from '@glint/template';

const createRef: ModifierLike<{
  Args: {
    Positional: [string];
  };
}>;

export default createRef;
